<template>
	<div class="img-cropper">
		<el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
	        <vue-cropper ref='cropper' :src="cropImg" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
	        <span slot="footer" class="dialog-footer">
	            <el-button @click="cancelCrop">取 消</el-button>
	            <el-button type="primary" @click="sureCrop">确 定</el-button>
	        </span>
	    </el-dialog>
	    <el-button class="file-btn" type="text">修改头像
            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
        </el-button>
	</div>
</template>
<script>
	import './img-cropper.less';
	import VueCropper from 'vue-cropperjs';
	import $api from '../../tools/api';
	export default {
		name:'img-cropper',
		props:{
			imgSrc:{
				type:String,
				default:'https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg'
			}
		},
		data (){
			return {
				dialogVisible:false,
				cropImg:this.imgSrc
			}
		},
		created(){
			console.log('created')
		},
		methods:{
			setImage(e){
				const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.cropImg = event.target.result;
                    console.log(event)
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
			},
			cropImage(){
				this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
			},
			cancelCrop(){
				this.dialogVisible = false;
                this.cropImg = this.imgSrc;
			},
			//确定
			sureCrop(){
				this.dialogVisible = false;
				$api.post('/users/upload',{
					data:'img',
					image:this.cropImg
				}).then(res =>{
					if(res.status == '1'){
						this.$emit("callBack",res.data);
					}
				})
			}
		}
	}
</script>