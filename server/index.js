const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const history = require('connect-history-api-fallback');
let app = express();
app.use(history());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8066');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};
app.use(allowCrossDomain);
let port = 12345;
let url = "mongodb://localhost:27017/";

const db = monk('mongodb://localhost:27017/bizeff');

const urlencodedParser = bodyParser.urlencoded({
	extended: false
});


app.get('/search', function(req, res) {
	console.dir(req.query)
	var collection = db.get('site');
	let whereStr = null;
	let keyArray = ['name', 'age'];
	if (req.query.name || req.query.age) {
		whereStr = {};
		keyArray.map(item => {
			req.query[item] ? whereStr[item] = req.query[item] : '';
		});
	}
	collection.find({}, function(e, docs) {
		console.dir(docs);
		res.send({
			code: 200,
			data: docs,
			msg: 'success'
		});
		db.close();
	});
});
app.get('*', function(req, res) {
	res.sendFile(path.resolve('../html/index.html'))
})
app.post('/add', urlencodedParser, function(req, res) {
	var collection = db.get('site');
	let myobj = {
		name: req.body.name,
		href: req.body.href,
		time: req.body.time
	};
	// console.dir(myobj)
	if (!myobj.name) {
		res.send({
			code: 100,
			data: null,
			msg: '参数不能为空'
		});
		return false;
	}
	collection.insert(myobj, function(err, obj) {
		if (err) throw err;
		res.send({
			code: 200,
			data: 'success',
			msg: '添加成功'
		});
		db.close();
	});
});
app.listen(port, (error) => {
	if (error) {
		console.error(error)
	} else {

		console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
	}
});