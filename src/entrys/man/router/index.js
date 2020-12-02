import Vue from 'vue'
import Router from 'vue-router'
import manAudit from '../pages/accountAudit/manAudit'
import userAudit from '../pages/accountAudit/userAudit'

import authorityApply from '../pages/authorityApply/authorityApply'
import businessManage from '../pages/businessConfig/businessManage'
import categoryManage from "../pages/businessConfig/categoryManage"
import contentAudit from '../pages/contentManage/contentAudit'
import commonLabel from '../pages/labelManage/commonLabel'
import customLabel from '../pages/labelManage/customLabel'
import roleManage from '../pages/roleManage/roleManage'


Vue.use(Router)

let router = new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      redirect: "/contentAudit"
    },
    {
      path: "/contentAudit",
      name: "contentAudit",
      component: contentAudit,
      meta: {
        title: "内容审核与上下线",
      },
    }, {
      path: "/commonLabel",
      name: "commonLabel",
      component: commonLabel,
      meta: {
        title: "通用标签",
      },
      children:[]
    },{
      path: "/customLabel",
      name: "customLabel",
      component: customLabel,
      meta: {
        title: "业务自定义标签",
      },
    }, {
      path: "/businessManage",
      name: "businessManage",
      component: businessManage,
      redirect: "/businessManage",
      meta: {
        title: "业务管理",
      },
    },
    {
      path: '/categoryManage',
      name: 'categoryManage',
      component: categoryManage,
      meta:{
        title:'栏目管理',
        keepAlive: false // 不需要缓存
      },
    },{
      path: '/userAudit',
      name: 'userAudit',
      component: userAudit,
      meta:{
        title:'创作者审核',
        keepAlive: false // 不需要缓存
      },
    },{
      path: '/manAudit',
      name: 'manAudit',
      component: manAudit,
      meta:{
        title:'业务账号审核',
        keepAlive: false // 不需要缓存
      },
    },{
      path: '/roleManage',
      name: 'roleManage',
      component: roleManage,
      meta:{
        title:'角色管理',
        keepAlive: false // 不需要缓存
      },
    },{
      path: '/authorityApply',
      name: 'authorityApply',
      component: authorityApply,
      meta:{
        title:'权限申请',
        keepAlive: false // 不需要缓存
      },
    }
    // {
    //   path: "*",
    //   redirect: "/error",
    // }, //路由按顺序从上到下，依次匹配。最后一个*能匹配全部，然后重定向到主页面
  ],
});

window.dsRouter = router;

export default router
