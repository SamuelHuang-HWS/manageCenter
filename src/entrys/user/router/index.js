import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import contentCreate from '../pages/contentCreate'
import article from '../pages/publish/article'
import contentManage from "../pages/contentManage/contentManage"
import personalCenter from '../pages/personalCenter/personalCenter'
import personalCenterDetail from '../pages/personalCenter/detail'
import personalCenterUpdate from '../pages/personalCenter/update'


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
      redirect: "/create"
    },
    {
      path: "/:code/user",
      name: "index",
      component: index,
      meta: {
        title: "首页",
      },
    }, {
      path: "/create",
      name: "contentCreate",
      component: contentCreate,
      meta: {
        title: "内容创作",
      },
      children:[]
    },{
      path: "/manage",
      name: "contentManage",
      component: contentManage,
      meta: {
        title: "内容管理",
      },
    }, {
      path: "/personalCenter",
      name: "personalCenter",
      component: personalCenter,
      redirect: "/personalCenter/detail",
      meta: {
        title: "个人中心",
      },
      children:[{
        path:'detail',
        name:'personalCenterDetail',
        component:personalCenterDetail,
        meta: {
          title: "个人中心",
        },
      },{
        path:'update',
        name:'personalCenterUpdate',
        component:personalCenterUpdate,
        meta: {
          title: "个人中心",
        },
      },
      ]},
    {
      path: '/article',
      name: 'article',
      component: article,
      meta:{
        title:'发布图文问诊',
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
