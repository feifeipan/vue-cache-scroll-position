<template>
  <div id="app">
    <p>keep-alive根据权重保留N条缓存（最早未使用的优先删除)</p>
    <p>通过dev-tool可以查看到Detail的条数和内容，demo演示默认3条</p>
    <li v-for="(item,index) in listData">
      <span>{{item.id}}</span>
      <span>{{item.name}}</span>
      <a href="#" @click="handleClick(item.id)">see detail</a>
    </li>
    <keep-alive>
      <router-view 
      	:key="$route.fullPath" 
      	v-on:refreshCache="refreshCache"
      	v-on:saveCurrentState="saveCurrentState"
      ></router-view>
    </keep-alive>
  </div>
</template>
<script>
const utilObjectLength = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

import Detail from "./Detail"

export default {
  name: "List",
  props: {
    maxCache: {
      type: Number,
      default: 3
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     console.log('route switched')
  //   }
  // },
  components: {
    Detail
  },
  data() {
    return {
      listData: [
        { id: 0, name: "aaa0" },
        { id: 1, name: "aaa1" },
        { id: 2, name: "aaa2" },
        { id: 3, name: "aaa3" },
        { id: 4, name: "aaa4" },
        { id: 5, name: "aaa5" },
        { id: 6, name: "aaa6" },
        { id: 7, name: "aaa7" },
        { id: 8, name: "aaa8" },
        { id: 9, name: "aaa9" },
      ],
      hotList: {},
      detailState:{}
    }
  },
  methods: {
    handleClick(index) {
      this.$router.push({ name: 'Detail', params: { gid: index } });
    },

    updateHotList(index, item) {
      if (index in this.hotList) {
        this.hotList[index]["ts"] = new Date();
      } else {
        this.hotList[index] = {
          vnode: item,
          ts: new Date()
        }
      }


      //如果超过了设定的max值, 就删除掉最老的一个cache
      if (utilObjectLength(this.hotList) > this.maxCache) {
        var oldestCacheIndex = this.getOldestCacheIndex();
        console.log("==oldestCacheIndex==", oldestCacheIndex);
        this.hotList[oldestCacheIndex]["vnode"].componentInstance.$destroy();
        delete this.hotList[oldestCacheIndex];
      }
      // console.log("==hotList==@", this.hotList);
    },
    getOldestCacheIndex() {
      var t = 0;
      var max = 0;
      for (var key in this.hotList) {
        var gap = new Date() - this.hotList[key]["ts"];
        if (gap > t) {
          t = gap;
          max = key;
        }
      }

      // console.log("==old==@", max);
      return max;
    },

    refreshCache(gid, item) {
    	return false;
      // console.log("==called by detail components==", item);
      // console.log("==gid==", gid);
      this.updateHotList(gid, item);
      // console.log("==hotList==", this.hotList);
      // item.componentInstance.$destroy()
    },
    /***
    this.detailState = {
	"0":{
		"scroll":{x:0,y:1},
		"tab":"1"
	}
    }
    ***/
    saveCurrentState(gid, componentId, value){
    	if(!(gid in this.detailState)){
    		this.detailState = Object.create(null);
    	}
    	this.detailState[componentId] = value;
    }
  },

}

</script>
