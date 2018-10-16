/**
 * Created by chunting on 2018/10/15.
 */
module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')({browsers: ['last 2 versions', 'iOS 7']})
    ]
}
