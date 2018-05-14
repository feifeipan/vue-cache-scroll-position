export default {
  name: "Cache",
  data() {
    return {
      pos: 0,
      currentPath: "",
      type:
    }

  },
  computed{

  }, 
  activated() {
    if (this.$refs.scrollpage) {
      this.scroller = this.$refs.scrollpage;
    }else if(this.$refs.ivewscroll){
      this.scroller = this.$refs.ivewscroll.$el.children[0]
    }

    const pos = this.$store.state.pagePosition;
    console.log("==activated.pagePosition==@", pos);
   
    const name = this.$route.fullPath;
    this.currentPath = name;
    console.log("==activated.scroller.top==@", name, "@" + (pos[name] || 0));
    if (this.scroller) {
      this.scroller.scrollTop = pos[name];
    } else {
      window.scrollTo(0, pos[name]);
    }
  },
  mounted() {

  },
  deactivated() {
    const name = this.currentPath;
    const self = this;
    console.log("==deactivated.scroller.top==@", name, "@", self.pos);
    // debugger;
    this.$store.commit('setPosition', {
      name: name,
      pos: self.pos || window.scrollY
    })
    this.pos = 0;
  },
  methods: {
    handleScrollList(){
    	this.pos = this.scroller.scrollTop;
    	console.log(this.scroller.scrollTop);
    }
  }
}
