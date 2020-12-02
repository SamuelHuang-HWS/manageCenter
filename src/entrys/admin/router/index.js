import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import tenantManage from "../pages/tenantManagement/index";
import menuManagement from "../pages/menuManagement/menuManagement";
import tenantManagement from "../pages/tenantManagement/tenantManagement";
import tenantAdministrator from "../pages/tenantManagement/tenantAdministrator"

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
      redirect: "/admin"
    },
    {
      path: "/admin",
      name: "index",
      component: index,
      meta: {
        title: "首页",
      },
    }, {
      path: "/menu",
      name: "menuManagement",
      component: menuManagement,
      meta: {
        title: "菜单管理",
      },
    },
    {
      path: "/tenant",
      name: "tenantManage",
      component: tenantManage,
      redirect:'/tenant/management',
      meta: {
        title: "租户管理",
      },
      children:[
        {
          path: "management",
          name: "management",
          component: tenantManagement,
          meta: {
            title: "租户管理",
          }
        },
        {
          path: "admin",
          name: "admin",
          component: tenantAdministrator,
          meta: {
            title: "租户管理员",
          },
        }
      ]
    },
  ]
});

window.dsRouter = router;

export default router
