<template>
  <div class="publish-article article-center-wrap">
    <div class="title">
      发布视频
    </div>

    <div class="content-item-header rejectReason" v-if='form.rejectReason'>
      <h3>待修改原因:</h3>
      <p>{{form.rejectReason}}</p>
    </div>

    <div class="publish-content-wrap">
      <div class="content">
        <div class="content-item flexs flex-column">
          <div class="content-item-header">
            <span class="item-title">视频标题</span>
          </div>
          <el-input show-word-limit maxlength="50" class="item-input" v-model="form.title" placeholder="请输入标题..."></el-input>
        </div>
        <div class="content-item summary flexs flex-column">
          <div class="content-item-header">
            <span class="item-title">视频</span>
            <span class="item-sub-title">*注：只支持MP4格式，最大500M，上传时长约3-4分钟</span>
          </div>
          <div class="item-video-wrap">
            <input type="file" name="file" @change="onVideoChange" class="item-conver-input" accept="audio/mp4, video/mp4" title="" ref="input">
            <div class="item-conver flexs flex-column flex-center middle-a">
              <template v-if="!sucessVideo&&!isShowProgress">
                <img src="~_img/upload.png" alt="图片上传">
                <span>上传视频</span>
              </template>
              <div class="video-uploading" v-if="isShowProgress">
                <el-progress class="progress" type="circle" :percentage="progessPersen"></el-progress>
                <span class="cancelVideo" @click.stop="cancelUploadedVod">取消上传</span>
              </div>
              <div class="video-success" v-if="sucessVideo" @click.self="handleSuccessVideo">
                <i class="el-icon-circle-check"></i>
                <span class="successText">上传成功</span>
                <span class="removeVideo" @click.stop="deleteUploadedVod">删除视频</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item flexs flex-column" :class="{'loaded':uploadSuccess}">
          <div class="content-item-header">
            <span class="item-title">封面图</span>
            <span class="item-tips">*注：必填，支持JPG、PNG格式，图片不超过5M，尺寸为220*150</span>
          </div>
          <el-upload
            action="/imageUpload.action"
            :auto-upload="false"
            list-type="picture-card"
            :on-remove="onImgRemove"
            :on-preview="onImgPreview"
            :http-request="httpRequest"
            :on-change='onImgChange'
            :limit="1"
            :file-list="titlePicUrl"
            accept="image/png, image/jpeg,image/gif"
            ref="fileUpload"
          >
            <div class="item-conver flexs flex-column flex-center middle-a">
              <img src="~_img/upload.png" alt="图片上传">
              <span>上传图片</span>
            </div>
          </el-upload>
          <!-- 图片预览 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="content-item flexs flex-column">
          <div class="content-item-header">
            <span class="item-title">视频简介</span>
          </div>
          <editor
            tinymce-script-src="/tinymce/tinymce.min.js"
            api-key="xvxeqiza7t8csrer05xqky7ysu6z651e0xcwves8q8h5vgi2"
            class="item-editor"
            :init="initEditor"
            @onInit="onReady"
          />
          <el-upload
            class="upload-demo"
            action="/imageUpload.action"
            :show-file-list=false
            :http-request="httpRequestEditor"
            accept="image/png, image/jpeg,image/gif"
            style="display: none">
            <el-button size="small" type="primary" ref="uploadImage">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div class="content-item author flexs flex-column" v-if="isShowAuthor">
          <div class="content-item-header">
            <span class="item-title">原始作者</span>
            <span class="item-sub-title">(选填)</span>
          </div>
          <div class="flexs middle-a search">
            <span>姓名</span>
            <el-select
              class="item-select"
              v-model="selectOriginalAuthorId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in authorOptions"
                :key="item.originalAuthorId"
                :label="item.originalAuthorName+' '+item.originalAuthorTitle+' '+item.originalAuthorUnit+' '+item.originalAuthorUnit"
                :value="item.originalAuthorId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="content-item is-original flexs flex-column">
          <div class="content-item-header">
            <span class="item-title">是否原创</span>
            <p class="tips flexs middle-a" @click="originalTips=true"><img src="~_img/lamp.png" class="icon-lamp" /><span>什么是原创文章</span></p>
          </div>
          <el-radio-group v-model="form.articleSource" class="item-radio-group mar-bom10">
            <el-radio :label="1">本文我的原创</el-radio>
            <el-radio :label="2">本文是转载</el-radio>
            <el-radio :label="0">前台不展示</el-radio>
          </el-radio-group>
          <el-input v-if="form.articleSource==2" class="item-input" placeholder="请输入转载作者出处。。。" v-model="form.reprintedFrom"></el-input>
        </div>
        <div v-if="articleLabels&&articleLabels.length">
          <div class="content-item flexs flex-column" v-for="(item,index) in articleLabels" :key="index">
            <div class="content-item-header mar-bom20">
              <span class="item-title">{{item.name}}</span>
              <span class="item-sub-title-max mar-bom20">(选填)</span>
            </div>
            <div class="review-tabs" v-if="item.childList">
              <div class="tab-list">
                <span class="tab" :class="{'checked':ischeckedArticleLabel(label.id)}" v-for="(label,labelIndex) in item.childList" :key="labelIndex" @click="checkArticleLabel(label,ischeckedDiseaseLabel(item.diseaseId,label.id))">{{label.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item article-tabs flexs flex-column">
          <div class="content-item-header">
            <span class="item-title">相关疾病</span>
            <span class="item-sub-title-max">(选填)</span>
          </div>
          <div class="desease-list">
            <div class="disease-tab-list">
              <span class="disease-tab checked" v-for="(item,index) in form.diseaseLabels" :key="index">
                {{item.diseaseName}}
                <img src="~_img/off.png" alt="del" @click="delDisease(index)">
              </span>
              <span class="disease-tab disease-tab-add" @click="openDeseaseDialog">
                添加疾病
              </span>
            </div>
          </div>
        </div>
        <div class="content-item buttons flexs">
          <span @click="previewArticle">预览</span>
          <span @click="addOrUpdateArticle(1)">保存草稿</span>
          <span @click="addOrUpdateArticle(2)" >发布视频</span>
        </div>
      </div>
    </div>
    <el-dialog
      title="预览"
      class="model-dialog"
      :visible.sync="dialogPreVisible"
      width="480px">
      <p class="dialog-title">移动端链接</p>
      <div class="flexs middle-a dialog-btns middle-a">
        <el-input class="dialog-input" v-model="mUrl" placeholder="请输入移动端链接"></el-input>
        <a :href="mUrl" target="_blank" class="dialog-open">打开</a>
        <span class="dialog-copy" @click="copyUrl(mUrl)">复制</span>
      </div>
      <p class="dislog-sub-title">*预览页面不可用于商业用途，链接有效时间5分钟，超时过期请重新打开预览弹窗！</p>
      <div class="qrCode">
        <img :src="qrCode" alt="二维码图片">
      </div>
      <p class="img-des">扫描二维码手机查看</p>
    </el-dialog>
    <el-dialog
      class="model-dialog clearfix"
      title="搜索疾病"
      :visible.sync="dialogDeseaseVisible"
      width="480px">
      <el-input placeholder="请输入内容" v-model="searchDiseaseName" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="queryDiseases">搜索</el-button>
      </el-input>
      <div class="search-desease-body">
        <div class="search-data">
          <el-checkbox-group v-model="searchDiseaseChecked" v-if="searchDiseaseList.length&&!isShowSearchNoData" @change="searchDiseaseChange">
            <el-checkbox :label="item.diseaseId" v-for="(item,index) in searchDiseaseList" :key="index">{{item.diseaseName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="noData flexs flex-column middle-a flex-center" v-if="isShowSearchNoData">
          <img src="~_img/search-noData.png" alt="没有数据">
          <p>很抱歉，暂未收录相关疾病</p>
        </div>
      </div>
      <div class="search-desease-btn fr">
        <span @click="dialogDeseaseVisible=false">取消</span>
        <span @click="addDesease">确认</span>
      </div>
    </el-dialog>
    <el-dialog
      class="tips-dialog"
      title="原创说明"
      :show-close=false
      :visible.sync="originalTips"
      width="480px">
      <p>原创是指自己写的或团队自制、独立完成的作品，并对该内容有合法版权。抄袭或剽窃他人作品，汇总再编辑的文章，营销推广的内容，非独家授权或代理的作品，都不算原创内容。</p>
      <p>作者对内容的真实性、准确性负责，拥有内容中展示照片的合法版权。产生的后果作者需全部自行承担。</p>
      <div class="btns">
        <el-button @click="originalTips=false">我知道了</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="tips-dialog"
      title="为什么要打疾病标签"
      :show-close=false
      :visible.sync="deseaseTips"
      width="480px">
      <p>给文章打上相关的疾病，可以帮您更好的展示文章</p>
      <div class="btns">
        <el-button @click="deseaseTips=false">我知道了</el-button>
      </div>
    </el-dialog>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog class="cropper-dialog" title="图片剪裁" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialogCropperVisible">
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="cropperImg"
            :outputSize="0.8"
            outputType="jpeg"
            :info=true
            :full=false
            :canScale=true
            :canMoveBox=true
            :original=false
            :autoCrop=true
            :fixed=true
            :fixedNumber=[22,15]
            :centerBox=true
            :infoTrue=false
            :fixedBox=false
            :autoCropWidth=220
            :autoCropHeight=150
            mode="cover"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="finish">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import publish from '../../mixin/publish'
  import {queryArticleById,addOrUpdateArticle,previewArticle,getVodUploadUrl,deleteUploadedVod} from '@/api/index.js'
  import {uploadFile} from '@/utils/auditAxios'
  import axios from 'axios'
  const CancelToken = axios.CancelToken;
  export default {
    name: "publishAricle",
    mixins:[publish],
    data(){
      return{
        uploadSuccess: false,
        titlePicUrl:[],
        videoUrl:[],
        dialogVisible: false,
        dialogImageUrl: '',
        // 裁剪组件的基础配置option
        dialogCropperVisible:false,
        cropperImg:'',
        imgHost:'//img10.360buyimg.com/da/',
        videoFlag:false,
        isShowProgress:false,
        sucessVideo:false,
        vid:'',
        progessPersen:0,
        cancelUploadedVodMethod:''
      }
    },
    components: {

    },
    created(){
      sessionStorage.setItem("channelId",this.$route.query.channelId)
    },
    mounted() {
      this.init();
    },
    activated: function() {
      this.articleStatus=this.$route.query.articleStatus;
      this.init();
    },
    methods: {
      //初始化获取文章标签和疾病标签
      init(){
        //(type: 1：文章标签 4：疾病)
        //(type:  4：疾病)
        this.queryLabels(4);
        this.queryLabels(1);
      },
      async previewArticle(){
        let res= await this.addOrUpdateArticle(this.$route.query.articleStatus,'preview');

        if(res){
          previewArticle({
            channelId:res.channelId,
            articleType:res.articleType,
            articleId:res.id
          }).then(res=>{
            this.mUrl=res.mUrl;
            this.getQRCode(res.mUrl)
          }).catch(err=>{
            if(err&&err.msg){
              this.$message.error(err.msg)
            }
          })
        }
      },
      queryArticleById(){
        queryArticleById({id:this.$route.query.id}).then(res=>{
          //赋值封面图
          let arr=[];
          if(res && res.titlePicUrl) {
            this.uploadSuccess=true
            let imageUrl = this.imgHost+res.titlePicUrl;
            arr.push({"url":imageUrl})
          }
          this.titlePicUrl=arr;
          this.form=res;

          //插入编辑器内容
          this.editor.setContent(this.form.content);
          //返显示视频
          if(res.articleVideoInfos&&res.articleVideoInfos.length){
            this.vid=res.articleVideoInfos[0].vid;
            this.videoFlag=false;
            this.isShowProgress=false;
            this.sucessVideo=true;
          }

          //返显示原作者
          if(res.originalAuthor){
            this.selectOriginalAuthorId=res.originalAuthor.originalAuthorName+' '+res.originalAuthor.originalAuthorTitle+' '+res.originalAuthor.originalAuthorUnit+' '+res.originalAuthor.originalAuthorUnit;
          }

          //返显示已选中的疾病标签
          if(this.form.diseaseLabels){
            for(let i=0;i<this.form.diseaseLabels.length;i++){
              this.searchDiseaseChecked.push(this.form.diseaseLabels[i].diseaseId)
            }
          }
        }).catch(err=>{
          this.form = {};
          this.editor.insertContent('');
          // this.$message.error(err.msg)
        })
      },
      async addOrUpdateArticle(val,type){
        //保存草稿articleStatus=1
        //发布文章articleStatus=2
        //保存文章状态不变
        if(!this.form.title){
          this.$message.error('文章标题不能为空')
          return
        }

        this.form.content=this.editor.getContent();
        if( this.titlePicUrl&&this.titlePicUrl.length){
          let url=this.titlePicUrl[0].url
          this.form.titlePicUrl=url.replace(this.imgHost,'')
        }

        if(val != 1){

          if(!this.vid){
            this.$message.error('请上传视频文件')
            return
          }

          if(this.form.titlePicUrl== '' || !this.form.titlePicUrl){
            this.$message.error('请上传文章封面')
            return
          }

          if(val==2&&!this.form.content){
            this.$message.error('视频简介不能为空')
            return
          }

          if(this.form.articleSource==2&&!this.form.reprintedFrom){
            this.$message.error('请输入转载作者出处')
            return
          }

          // if(this.form.content.length > 30000){
          //   this.$message.error('文章内容过长，超出限制'+ (this.form.content.length-30000) + '个字符')
          //   return
          // }

        }

        val&&(this.form.articleStatus=val);


        for(let i=0;i<this.authorOptions.length;i++){
          if(this.authorOptions[i].originalAuthorId==this.selectOriginalAuthorId){
            this.form.originalAuthor=this.authorOptions[i];
            break;
          }
        }


        this.form.userAgent=2;

        this.form.channelId= this.$route.query.channelId;

        this.form.articleType=7

        //视频信息
        this.form.articleVideoInfos=[{
          vid:this.vid
        }]

        try{
          if(this.flag){
            this.flag=false;
            let res=await addOrUpdateArticle(this.form);
            if(res){
              //保存草稿
              if(res.articleStatus==1){
                this.form=res;
                this.$message.success('文章保存成功');
                this.flag=true;
                return res
              }
              //发布
              if(type!='preview'){
                this.flag=true;
                sessionStorage.setItem('publishAritcleRefreshStatus',1)
                window.close()
                // this.$router.push({
                //   path:'/success'
                // })
                // this.$message.success('文章保存成功');
              }

              this.flag=true;
              return res
            }
          }
        }catch (e) {
          this.flag=true;
          this.$message.error(e.msg)
        }
      },
      onImgRemove(file, fileList){
        this.titlePicUrl = fileList
        this.uploadSuccess = false
      },
      onImgChange(file, fileList){
        // this.form.titlePicUrl= fileList
        this.cropperImg = file.url
        this.dialogCropperVisible = true
      },
      onImgPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      httpRequest(request){
        let file=this.file;
        this.uploadFile(file,(msg)=>{
          this.titlePicUrl=[{
            "url":this.imgHost+msg
          }]
        });
      },
      uploadFile(file,callback){
        uploadFile(file, event => {
          let percent = parseInt((event.loaded / event.total) * 100 + "");
          if (percent > 99) {
            percent = 99;
          }
          file.progress = percent;
          file.status = "pending";
          // this.setStoragePropertyByName(storageProperty, uploadImageList);
        })
          .then(res => {
            const id = res.data[0]["id"];
            if (id === "1") {
              const url = res.data[0]["msg"];
              callback&&callback(url);
              file.status = "resolve"; // 是否上传成功，根据是否有url来判断
              this.uploadSuccess = true;
            } else if (id === "0") {
              this.$message.error('图片上传失败');
            }
          })
          .catch(error => {
            file.status = "reject";
            this.$message.error('图片上传失败');
          });
      },
      // 点击裁剪，这一步是可以拿到处理后的地址
      finish() {
        this.dialogCropperVisible=false;
        this.$refs.cropper.getCropBlob((data) => {
          this.file=data
          this.$refs.fileUpload.submit();
        })
      },
      cancel(){
        this.dialogCropperVisible = false;
        this.titlePicUrl=[];
      },
      //文章标签是否选中
      ischeckedArticleLabel(labelId){
        let arr=this.form.labels||[]
        for(var i=0;i<arr.length;i++){
          if(arr[i].id==labelId){
            return true
          }
        }
        return false;
      },
      //疾病标签是否选中
      ischeckedDiseaseLabel(diseaseId,labelId){
        let arr=this.form.diseaseLabels||[]
        for(var i=0;i<arr.length;i++){
          if(arr[i].diseaseId!=diseaseId){
            continue;
          }
          var labels = arr[i].diseaseEntry||[];
          for(var j=0;j<labels.length;j++){
            if(labelId == labels[j].id){
              return true;
            }
          }
        }
        return false;
      },
      //选中文章标签
      checkArticleLabel(label){
        (!this.form.labels)&&(this.form.labels=[])
        let arr=this.form.labels
        for(let i=0;i<arr.length;i++){
          if(arr[i].id==label.id){
            this.form.labels.splice(i,1)
            return false
          }
        }
        this.form.labels.push(label)
      },
      async onVideoChange(){
        let file=this.$refs.input.files[0]
        let isSize500=file.size/1024/1024<=500

        if(!this.videoFlag){
          this.videoFlag=true;
          this.progessPersen=0;

          if(!isSize500){
            this.$message.error('视频文件不得超过500M')
            this.$refs.input.value=''
            return
          }

          // 调取后端接口，获取上传视频
          let res= await getVodUploadUrl({
            videoName:file.name,
            fileSize:file.size,
          })

          let uploadUrl=window.location.protocol=='http:'?res.uploadUrl:res.uploadUrlHttps

          if(uploadUrl){
            await this.uploadVideo(file,uploadUrl)
          }
          this.vid=res.videoId||''
          this.$refs.input.value=''
        }
      },
      uploadVideo(file,baseUrl){
        this.isShowProgress=true;
        var formData = new FormData();
        formData.append("file", file);//这是获取上传的文件
        axios({
          method: "POST",
          url:baseUrl,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress:(progressEvent)=>{ //原生获取上传进度的事件
            if(progressEvent.lengthComputable){
              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              var complete=(progressEvent.loaded/progressEvent.total*100|0)
              this.progessPersen=complete;
            }
          },
          data:formData,
          cancelToken: new CancelToken(c=> {
            this.cancelUploadedVodMethod = c;
          })
        }).then(res => {
          if(this.progessPersen==100){
            this.videoFlag=false;
            this.isShowProgress=false;
            this.sucessVideo=true;
          }
        }).catch(error => {
          this.videoFlag=false;
          this.isShowProgress=false;
          this.$refs.input.value='';
        });
      },
      handleSuccessVideo(){
        this.$message.error('只能上传一个视频')
      },
      deleteUploadedVod(){
        deleteUploadedVod({
          vid:this.vid
        }).then(res=>{
          this.sucessVideo=false;
        }).catch(error=>{

        })
      },
      cancelUploadedVod(){
        this.cancelUploadedVodMethod()
      }
    }
  }
</script>


