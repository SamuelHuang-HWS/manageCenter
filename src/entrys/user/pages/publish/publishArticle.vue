<template>
  <div class="publish-article">
    <div class="title">
      发布文章
    </div>

    <div class="content-item-header rejectReason" v-if='form.rejectReason'>
      <h3>待修改原因:</h3>
      <p>{{form.rejectReason}}</p>
    </div>

    <div class="publish-content-wrap">
      <p class="tips flexs middle-a" @click="articleTips=true"><img src="~_img/lamp.png" class="icon-lamp" /><span>如何写出好文章</span></p>
      <div class="content">
        <div class="content-item flexs flex-column">
          <div class="content-item-header">
            <span class="item-title">标题</span>
            <span class="item-sub-title">*建议输入门诊时患者的常见问题；标题明确具体，患者一眼能看懂</span>
          </div>
          <el-input show-word-limit maxlength="50" class="item-input" v-model="form.title" placeholder="请输入内容"></el-input>
        </div>
        <div class="content-item flexs flex-column">
          <div class="content-item-header">
            <span class="item-title">正文</span>
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
            <el-radio :label="1||0">本文我的原创</el-radio>
            <el-radio :label="2">本文是转载</el-radio>
          </el-radio-group>
          <el-input v-if="form.articleSource==2" class="item-input" placeholder="请输入转载作者出处。。。" v-model="form.reprintedFrom"></el-input>
        </div>
        <div class="content-item article-tabs flexs flex-column">
          <div class="content-item-header">
            <span class="item-title">相关疾病</span>
            <span class="item-sub-title">(选填)</span>
            <p class="tips flexs middle-a" @click="deseaseTips=true"><img src="~_img/lamp.png" class="icon-lamp" /><span>为什么要打疾病标签</span></p>
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
          <span @click="addOrUpdateArticle(2)" >发布文章</span>
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
  </div>
</template>

<script>
  import publish from '../../mixin/publish'
  import {queryArticleById,addOrUpdateArticle,previewArticle} from '@/api/index.js'
  export default {
    name: "publishAricle",
    mixins:[publish],
    data(){
      return{

      }
    },
    components: {

    },
    created(){

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
        //(type:  4：疾病)
        this.queryLabels(4);
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
          this.form = res;
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


        for(let i=0;i<this.authorOptions.length;i++){
          if(this.authorOptions[i].originalAuthorId==this.selectOriginalAuthorId){
            this.form.originalAuthor=this.authorOptions[i];
            break;
          }
        }

        val&&(this.form.articleStatus=val);

        this.form.userAgent=2;

        this.form.channelId= process.env.CHANNELID;

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
                this.$router.push({
                  path:'/success'
                })
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
    }
  }
</script>
