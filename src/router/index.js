import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Detail from '@/components/Detail'
import ScrollList from '@/components/ScrollList'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
      children: [{
        path: 'detail/:gid',
        name: 'Detail',
        component: Detail
      }]
    },
    {
    	path:"/scroll",
    	name:"ScrollList",
    	component: ScrollList
    }
  ]
})
