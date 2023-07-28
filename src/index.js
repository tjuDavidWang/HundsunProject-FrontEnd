import Vue from 'vue'
import hCore, { store } from "@hsui/core";
import "./reset.css";

import h_ui from 'h_ui'
import "h_ui/dist/h_ui.min.css"

import routes from './.hui/router'  // 引入我们创建的 routes

Vue.use(h_ui)

const app = hCore({
  extraModelOptions: {
    store,
  },
});

app.initRouter(routes, { base: '/', mode: 'history' });  // 使用 initRouter 初始化路由

app.start();
