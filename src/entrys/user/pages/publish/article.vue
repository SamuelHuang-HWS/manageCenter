<template>
  <div class="article">
    <bread-crumb></bread-crumb>
    <div class="wrap">
      <div class="c-title-wrap">
        <p class="c-title">基本内容</p>
      </div>
      <div class="content-item flex">
        <p><span class="red">*</span>标题</p>
        <el-input show-word-limit maxlength="50" v-model="form.title" placeholder="请输入内容"></el-input>
      </div>
      <p class="tips">建议输入门诊时患者的常见问题；标题明确具体，患者一眼能看懂</p>
      <div class="content-item flex">
        <p>摘要</p>
        <el-input type="textarea" show-word-limit :rows="6" resize="none" maxlength="120" class="item-input" v-model="form.summary" placeholder="请输入内容"></el-input>
      </div>
      <div class="content-item flex align-items-center" :class="{'loaded':uploadSuccess}">
        <p><span class="red">*</span>封面图</p>
        <el-upload
          action="/imageUpload.action"
          :auto-upload="false"
          list-type="picture-card"
          :on-remove="onImgRemove"
          :on-preview="onImgPreview"
          :http-request="httpRequest"
          :on-change='onImgChange'
          :before-upload="checkFile"
          :limit="1"
          :file-list="titlePicUrl"
          accept="image/png, image/jpeg,image/gif"
          ref="fileUpload"
        >
          <div class="item-conver flex align-items-center justify-content-center flex-direction-column">
            <img src="~_img/upload.png" alt="图片上传">
            <span>上传图片</span>
          </div>
        </el-upload>
        <!-- 图片预览 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <p class="tips">支持JPG、PNG格式，图片不超过5M，尺寸为220*150</p>
      <div class="content-item flex">
        <p>正文</p>
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
      <div class="c-title-wrap mar-top-40">
        <p class="c-title">标签信息</p>
      </div>
      <div class="content-item flex">
        <p><span class="red">*</span>敏感词</p>
        <el-input :rows="2" resize="none" disabled="" type="textarea" class="item-input" placeholder="暂无" v-model="form.sensitiveWords"></el-input>
      </div>
      <div class="content-item flex">
        <p><span class="red">*</span>是否原创</p>
        <el-radio-group v-model="form.articleSource" class="flex align-items-center">
          <el-radio :label="1">本文我的原创</el-radio>
          <el-radio :label="2">本文是转载</el-radio>
          <el-radio :label="0">前台不展示</el-radio>
        </el-radio-group>
      </div>
      <div class="content-item flex" v-if="form.articleSource==2">
        <p></p>
        <el-input class="item-input" placeholder="请输入转载作者出处。。。" v-model="form.reprintedFrom"></el-input>
      </div>
      <div class="content-item flex">
        <p><span class="red">*</span>文章级别</p>
        <el-radio-group v-model="form.articleLevel" class="flex align-items-center">
          <el-radio :label="1">医生主页</el-radio>
          <el-radio :label="2">对外推广</el-radio>
        </el-radio-group>
      </div>
      <div v-if="articleLabels&&articleLabels.length">
        <div class="content-item flex" v-for="(item,index) in articleLabels" :key="index">
          <p>{{item.name}}</p>
          <div class="tab-list" v-if="item.childList">
            <span class="tab" :class="{'checked':ischeckedArticleLabel(label.id)}" v-for="(label,labelIndex) in item.childList" :key="labelIndex" @click="checkArticleLabel(label,ischeckedDiseaseLabel(item.diseaseId,label.id))">{{label.name}}</span>
          </div>
        </div>
      </div>
      <div class="content-item flex">
        <p><span class="red">*</span>疾病标签</p>
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
      <div class="c-title-wrap mar-top-40">
        <p class="c-title">原始作者</p>
      </div>
      <div class="content-item item-width flex">
        <p><span class="red">*</span>角色</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="content-item item-width flex">
        <p><span class="red">*</span>姓名</p>
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
      <div class="c-title-wrap mar-top-40">
        <p class="c-title">展示类目</p>
      </div>
      <p class="category-title">APP业务</p>
      <div class="content-item flex">
        <p>栏目一</p>
        <div>
          <p></p>
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
        :show-close=false
        title="如何写出好文章"
        :visible.sync="articleTips"
        width="480px">
        <p><strong>对患者有帮助：</strong>能具体解决患者某个病程阶段或某个场景下的顾虑和担心（可参考门诊时患者常问的问题）</p>
        <p><strong>主题明确：</strong>标题，患者一看就知道要讲什么；内容，阐述完整，并和标题强相关</p>
        <p><strong>易于理解：</strong>段落清晰，表达通俗易懂，请避免搜索引擎百科式、或纯粹医学专业教科书式的科普内容</p>
        <div class="btns">
          <el-button @click="articleTips=false">我知道了</el-button>
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
  </div>


</template>

<script>
  import breadCrumb from "../../../../components/breadCrumb";

  import publish from '../../mixin/publish'
  import {queryArticleById,addOrUpdateArticle,previewArticle} from '@/api/index.js'
  import {uploadFile} from '@/utils/auditAxios'
  export default {
    name: "publishAricle",
    mixins:[publish],
    data(){
      return{
        uploadSuccess: false,
        titlePicUrl:[],
        dialogVisible: false,
        dialogImageUrl: '',
        // 裁剪组件的基础配置option
        dialogCropperVisible:false,
        cropperImg:'',
        imgHost:'//img10.360buyimg.com/da/',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    components: {
      breadCrumb
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

        if(this.form.titlePicUrl== '' || !this.form.titlePicUrl){
          this.$message.error('请上传文章封面')
          return
        }

        if(val != 1){
          if(val==2&&!this.form.content){
            this.$message.error('文章内容不能为空')
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
              if(type!='preview'){
                this.flag=true;
                window.close();
                sessionStorage.setItem('publishAritcleRefreshStatus',1)
                // this.$router.push({
                //   path:'/success'
                // })
              }
              //如果是预览
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
      checkFile(file) {
        const isJPG = /image\/(jpeg|png)/.test(file.type)
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传图片只能是jpg、png格式！');
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        let data = window.URL.createObjectURL(new Blob([file]))
        this.fileName = file.name

        return isJPG && isLt5M;
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
    }
  }
</script>


