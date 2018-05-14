export default {
  name: "Position",
  data() {
    return {
      pos: {},
      currentPath: "",
      scroller:{}
    }

  },
  activated() {
    if(this.cacheComponents.length == 0){return false;}
    var self = this;
    for(var key in this.cacheComponents){
    	var cc = this.cacheComponents[key];
    	if(key == "cScroll"){
    		cc.forEach(function(item, index){
    			self.scroller[item] =  self.$refs[item].$el.children[0]
    		});
    	}else if(key == "rScroll"){
    		cc.forEach(function(item, index){
    			self.scroller[item] = self.$refs[item];
    		});
    	}
    }
   
   
    const pos = this.$store.state.pagePosition;
    if(pos){
    	 const name = this.$route.fullPath;
	    this.currentPath = name;
	    for(var key in this.scroller){
	    	this.scroller[key].scrollTop = (pos[name] && pos[name][key]) || 0;
	    }
    }else{
    	console.log("===no store==")
    }
    // console.log("==activated.pagePosition==@", pos);
   
   
  },
  deactivated() {
    const name = this.currentPath;
    const self = this;
    // console.log("==deactivated.scroller.top==@", name, "@", self.pos);
    this.$store.commit('setPosition', {
      name: name,
      pos: self.pos
    });
  },
  methods: {
    handleScrollList(key){
    	this.pos[key] =  (this.scroller[key] && this.scroller[key].scrollTop) || 0;
    	// console.log("==key==",this.pos[key]);
    }
  }
}
