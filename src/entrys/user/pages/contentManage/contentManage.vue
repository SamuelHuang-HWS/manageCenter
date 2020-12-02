<template>
  <div class="content-manage">
    <div class="content-manage-header">
      <el-select v-model="value" placeholder="请选择" size="mini" class="content-manage-header-type" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择" size="mini" class="content-manage-header-status">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button size="mini" class="content-manage-header-button">重置</el-button>
    </div>
    <div class="content-manage-list">
      <div class="content-manage-list-table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="文章ID"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="文章标题"
            >
          </el-table-column>
          <el-table-column
            prop="province"
            label="文章类型"
            >
          </el-table-column>
          <el-table-column
            prop="province"
            label="状态"
           >
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">预览</el-button>
              <span class="border"></span>
              <el-button type="text" size="small">修改</el-button>
              <span class="border"></span>
              <el-button type="text" size="small" class="delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content-manage-list-page">
        <el-pagination
          background
          layout="total,sizes ,prev, pager, next, jumper"
          :page-count="pageCount"
          :page-size="pageSize"
          :page-sizes="[10, 20, 40]"
          :total="total"
          v-show="tableData.length"
          @current-change="currentChange"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          class="fr page">
        </el-pagination>
      </div>
<!--      <el-dialog-->
<!--        title="预览"-->
<!--        class="model-dialog"-->
<!--        :visible.sync="dialogPreVisible"-->
<!--        width="480px">-->
<!--        <p class="dialog-title">移动端链接</p>-->
<!--        <div class="flexs middle-a dialog-btns middle-a">-->
<!--          <el-input class="dialog-input" v-model="mUrl" placeholder="请输入移动端链接"></el-input>-->
<!--          <a :href="mUrl" target="_blank" class="dialog-open">打开</a>-->
<!--          <span class="dialog-copy" @click="copyUrl(mUrl)">复制</span>-->
<!--        </div>-->
<!--        <p class="dislog-sub-title">*预览页面不可用于商业用途，链接有效时间5分钟，超时过期请重新打开预览弹窗！</p>-->
<!--        <div class="qrCode">-->
<!--          <img :src="qrCode" alt="二维码图片">-->
<!--        </div>-->
<!--        <p class="img-des">扫描二维码手机查看</p>-->
<!--      </el-dialog>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "contentCreate",
    data() {
      return {
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
        value: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
        pageCount:0,
        pageSize:10,
        total:1,
        currentPage:1
      }
    },
    methods:{
      currentChange(){

      },
      handleClick(){},
      handleSizeChange(){},
    }
  }
</script>

<style scoped lang="scss">
  .content-manage{
    width: 100%;
    &-header{
      background-color: white;
      height: 60px;
      /*line-height: 60px;*/
      padding:0 15px 0;
      border-radius: 3px;
      display: flex;
      align-items: center;
      &-type,&-status{
        width: 250px;
        height: 32px;
        float: left;
        /deep/ el-input__inner el-input--mini{
          height: 32px;
          line-height: 32px;
        }
      }
      &-status{
        margin-left: 15px;
      }
      &-button{
        width: 88px;
        height: 32px;
        background-color: #F8FAFC;
        margin-left:auto;
        color: #9CA8B9;
      }
    }
    &-list{
      background-color: white;
      padding: 20px;
      margin-top: 15px;
      border-radius: 3px;
      &-table{
        border: solid 1px #E7EFF8;
        border-bottom: none;
        /deep/ .el-table thead th{
          height: 54px;
          font-size: 14px;
          padding: 0px 10px 0px 10px;
          color: #5D6072;
          font-weight: bold;
          background: #FAFBFD !important;
        }
        /deep/ .el-table__body td,.el-table__body th{
          height: 48px;
          padding: 0px 10px 0px 10px;
          color: #757575;
          font-size: 12px;
        }
        .border{
          margin:0 5px 0;
          display: inline-block;
          height: 6px;
          width: 1px;
          /*background-color: black;*/
          border: 0.9px solid #266CEE;
        }
        .delete{
          color: #F62458;
        }
      }
      &-page{
        margin-top: 20px;
        text-align: right;
        /deep/ el-pagination__total{
          color: #768597;
        }
        .page{
          margin-top: 20px;
          /deep/ &.is-background .el-pager li:not(.disabled).active {
            background: #266CEE;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FFFFFF;
          }

        }
      }
    }
  }
</style>
