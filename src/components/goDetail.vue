<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>


<script>
export default {
  data() {
    return {

    }
  },
  props:{
    list: Array,
    i: Number
  },
  mounted(){
    
  },
  methods:{
    handleClick() {
      // 1.将数据缓存下来
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = this.i;
      // 2.再实现点击跳转页面
      uni.navigateTo({
        url: '/pages/imgDetail/index'
      })
    }
  }
}
</script>


<style scoped>
 
</style>