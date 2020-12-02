import {queryDiseases,queryLabels,queryOriginalAuthor} from '@/api/index.js'
import {uploadFile} from '@/utils/axios'
import Editor from '@tinymce/tinymce-vue'
import QRCode from 'qrcode'
import {mapState} from 'vuex'
export default {
  name: "publishAricle",
  data(){
    return {
      form:{
        articleChannelLabels: [],
        articleLevel: '',
        articleSource: 1,
        articleStatus: 1,
        articleType: 1,
        browsecount: '',
        businessId: '',
        channelId: '',
        content: "",
        created: '',
        creator: "",
        diseaseLabels: [],
        labels: [],
        originalAuthor: {},
        rejectReason: '',
        reprintedFrom: '',
        sensitiveWords: "",
        submitTime: '',
        summary: '',
        title: "",
        titlePicUrl: '',
        updator: "",
        viceTitle: '',
        withContent: '',
      },
      selectOriginalAuthorId:'',
      initEditor:{
        width:902,
        min_height: 360,
        menubar: false,
        statusbar:false,
        plugins: [
          'image lists imageUpload autoresize paste link table wordcount ax_wordlimit'
        ],
        toolbar:['imageUpload',
          'undo redo | bold forecolor styleselect italic underline alignleft aligncenter alignright bullist numlist | table blockquote  link removeformat'],
        style_formats: [
          { title: 'Heading 1', format: 'h2' },
          { title: 'Heading 2', format: 'h3' },
          { title: '正文', format: 'p' },
        ],
        icons:'content-platform',
        icons_url: '/tinymce/icons/content-platform/icons.js',
        language: 'zh_CN',
        language_url: '/tinymce/langs/zh_CN.js',
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        // powerpaste_word_import: 'clean', // 是否保留word粘贴样式  clean | merge
        paste_data_images: true,// 设置为“true”将允许粘贴图像，而将其设置为“false”将不允许粘贴图像。
        paste_preprocess:async (plugin, args) =>{
          let htmlstr=args.content;
          args.content='';
          var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim
          let arr=reg.exec(htmlstr)[2]

          let blob=await fetch(arr).then(r=>r.blob())
          const file=new window.File([blob],'file',{type:blob.type})

          this.uploadFileEditor(file,(msg)=>{
            let url = `//img10.360buyimg.com/da/`+msg;
            let html = '<img style="max-width:100%" src="'+url+'" />';
            this.editor.insertContent(html);
          });
        },
        paste_as_text:true,
        toolbar_sticky:true,
        autoresize_bottom_margin: 0,
        ax_wordlimit_num:30000,
        ax_wordlimit_callback: (editor,txt,num)=>{
          let textContent=editor.getBody().textContent;
          document.querySelector(".wordCount")&&(document.querySelector(".wordCount").style.color='#f92a2a');
          document.querySelector(".wordCount")&&(document.querySelector(".wordCount").innerHTML='字数超出最大允许值，服务器可能拒绝保存！');
          // editor.setContent();
          // editor.execCommand('mceSetContent', false,textContent.substring(0,num));
          // editor.focus(true)
        },
        ax_wordlimit_editor:(editor,txt,num)=>{
          document.querySelector(".wordCount")&&(document.querySelector(".wordCount").style.color='#A4A9B3');
          document.querySelector(".wordCount")&&(document.querySelector(".wordCount").innerHTML=txt.length+'/'+num);
        },
        clickImage : (editor) => {
          this.$refs.uploadImage.$el.click(editor)
        },
        setup : function(editor) {
          // console.log(editor)
          // editor.ui.registry.addButton('customInsertButton', {
          //   text: 'My Button',
          //   onAction: function (_) {
          //     editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;');
          //   }
          // });

        },
        // init_instance_callback: editor => {
        //   editor.on('paste', (evt) => {
        //     // 监听粘贴事件
        //     this.onPaste(evt)
        //   })
        // },
      },
      num:'',
      total:'',
      searchDiseaseName:'',
      searchDiseaseList:[],
      isShowSearchNoData:false,
      searchDiseaseChecked:[],
      qrCode:'',
      mUrl:'',
      articleStatus:'',
      editor:'',
      imgUrlList:[],//图片上传
      dialogPreVisible:false,//预览弹窗
      dialogDeseaseVisible:false,//添加疾病弹窗
      articleTips:false,
      originalTips:false,
      deseaseTips:false,
      authorOptions: [],
      loading: false,
      isShowAuthor:false,
      searchDiseaseListHistory:[],
      flag:true,
      articleLabels:[],
      deseaseLabels:[],
    }
  },
  components: {
    Editor
  },
  created(){
    this.articleStatus=this.$route.query.articleStatus;
    this.isShowAuthor=this.isShowOriginalAuthor
  },
  computed: {
    // 计算属性的 getter
    ...mapState([
      "isShowOriginalAuthor"
    ])
  },
  watch:{
    isShowOriginalAuthor(newVal){
      this.isShowAuthor=newVal
    }
  },
  mounted() {

  },
  methods:{
    onReady (e) {
      this.editor = e.target
      let editorContent=document.querySelector('.tox-editor-container');
      let div=document.createElement("div"); //创建一个li
      div.setAttribute("class",'wordCount')
      div.innerHTML='0/30000'
      editorContent.appendChild(div)

      if(this.$route.query.id){
        this.queryArticleById();
      }
    },
    //生成二维码
    getQRCode(val) {
      var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        rendererOpts: {
          quality: 0.3
        }
      }

      QRCode.toDataURL(val, opts,  (err, url)=>{
        if (err) throw err
        this.qrCode=url;
        this.dialogPreVisible=true
      })
    },
    //查询标签
    queryLabels(type){
      queryLabels({
        channelId:this.$route.query.channelId,
        type:type,
        articleType:this.$route.query.articleType
      }).then(res=>{
        type==1 &&(this.articleLabels=res||[]);
        type==4 &&(this.deseaseLabels=res||[]);
        return res
      }).catch(()=>{

      })
    },
    //查询疾病
    queryDiseases(){
      queryDiseases({
        diseaseName:this.searchDiseaseName
      }).then(res=>{
        if(res&&res.length){
          this.isShowSearchNoData=false
          this.searchDiseaseList=res;
          res.map(item=>{
            this.searchDiseaseListHistory.push(item)
          })
        }else{

          this.isShowSearchNoData=true
        }
      }).catch(()=>{

      })
    },
    //打开疾病标签弹窗
    openDeseaseDialog(){
      this.dialogDeseaseVisible=true;
      this.isShowSearchNoData=false;
      this.searchDiseaseList=[];
      this.searchDiseaseName='';
    },
    searchDiseaseChange(){
      if(this.searchDiseaseChecked&&this.searchDiseaseChecked.length>3){
        this.$message.error('疾病标签最多选3个~')
        this.searchDiseaseChecked.pop();
      }
    },
    getSearchDiseaseListData(){
      let array= this.searchDiseaseListHistory.filter(item =>{
        return this.searchDiseaseChecked.some(i =>{
          return i == item.diseaseId
        })
      })
      let _map = []
      return array.filter((item)=>{
        if(!_map.includes(item.diseaseId)){
          _map.push(item.diseaseId)
          return true
        }else{
          return false
        }
      })
    },
    //添加疾病
    addDesease(){

      if(this.searchDiseaseChecked.length > 3){
        return
      }

      let dataList = this.getSearchDiseaseListData();

      this.form.diseaseLabels = this.form.diseaseLabels || [];
      this.form.diseaseLabels.splice(0,this.form.diseaseLabels.length,...dataList)

      this.dialogDeseaseVisible=false
    },
    delDisease(index){
      this.form.diseaseLabels.splice(index,1);
      this.searchDiseaseChecked.splice(index,1);
    },
    httpRequestEditor(request){
      this.uploadFileEditor(request.file,(msg)=>{
        let url = `//img10.360buyimg.com/da/`+msg;
        let html = '<img style="max-width:100%" src="'+url+'" />';
        this.editor.insertContent(html);
      });
    },
    uploadFileEditor(file,callback){
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
          } else if (id === "0") {
            this.$message.error('图片上传失败');
          }
        })
        .catch(error => {
          file.status = "reject";
          this.$message.error('图片上传失败');
        });
    },
    copyUrl(content){
      /**
       * 复制内容到粘贴板
       * content : 需要复制的内容
       * message : 复制完后的提示，不传则默认提示"复制成功"
       */
      var aux = document.createElement("input");
      aux.setAttribute("value", content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$message.success('复制成功')
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.queryOriginalAuthor(query);
      } else {
        this.options = [];
      }
    },
    queryOriginalAuthor(query){
      queryOriginalAuthor({
        name:query
      }).then(res=>{
        this.authorOptions = res;
        this.loading = false;
      }).catch(err=>{
        this.authorOptions = [];
        this.loading = false;
      })
    }
  }
}
