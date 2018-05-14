<template>
  <div id="app">
    gid is {{gid}}
 <cScroll 
        :on-reach-bottom="handleReachBottom"
        :on-scroll-list="()=>handleScrollList('ivewscroll')"
        ref="ivewscroll"
    >
        <Card dis-hover v-for="(item, index) in list1" :key="index" style="margin: 32px 0">
            Content {{ item }}
        </Card>
    </cScroll>
   
   <input type="text" name="" />

      <div style="width:200px;height:100px;overflow:auto;" 
         ref="scroll2"
        v-on:scroll="handleScrollList('scroll2')">
      11111111111111111
      22222222222222222
      33333333333333333
     44444444444444444
      5555555555555555
      6666666666666666
      777777777777777
      888888888888888
      99999999999999

      00000000000000000
      aaaaaaaaaaaaaaaa
   </div>

  </div>
</template>
<script>
import Position from './Position.js';
import cScroll from "./cScroll/index.js"

export default {
  name: "Detail",
  props: {
  },
  mixins: [Position],
  components:{cScroll},
  data() {
    return {
      gid: this.$route.params.gid,
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      savePos:true,
      //定义需要被缓存的对象
      /**
       cScroll: iview的scroll组件升级版，可以记录滚动条位置
       rScroll：原生的div滚动条
      **/
      cacheComponents:{
        "cScroll":["ivewscroll"],
        "rScroll":["scroll2"]
      }
    }
  },
  computed: {

  },
  create() {
    // console.log("==create detail==", this.gid);
  },
  mounted() {
    // console.log("==mounted detail==", this.gid);
  },
  activated() {

  },
  deactivated() {
    // console.log("==deactivated==", this.gid);
    // console.log("==scrollTop==", this.pos);
    // this.$emit("saveCurrentState", this.gid, "scroll", {})
  },

  methods: {
     handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const last = this.list1[this.list1.length - 1];
                        for (let i = 1; i < 11; i++) {
                            this.list1.push(last + i);
                        }
                        resolve();
                    }, 2000);
                });
            }
  },
  
}

</script>
