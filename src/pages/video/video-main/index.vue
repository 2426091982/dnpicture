<template>
  <scroll-view @scrolltolower="handleScrolltolower" scroll-y enable-flex class="video_main">
    <view @click="handleGoVideo(item)" class="video_item" v-for="item in videowp" :key="item.id">
      <image mode="widthFix" :src="item.img"></image>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      // 图片数组
      videowp:[],
      hasMore: true
    };
  },
  props:{
    urlObj:Object
  },
  watch:{
    urlObj(){
      // 清空图片数组
      this.videowp = [];
      this.getList();
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    //获取数据
    getList(){
      this.request({
        url: this.urlObj.url,
        data: this.urlObj.params
      }).then(res1 => {
        // 判断是否还有数据
        if(res1.res.videowp.length === 0){
          this.hasMore = false;
          return;
        }
        // 数组拼接
        this.videowp = [...this.videowp,...res1.res.videowp];
      })
    },
    // 下拉触底事件
    handleScrolltolower(){
      if(this.hasMore){
        this.urlObj.params.skip += this.urlObj.params.limit;
        this.getList();
      }else {
        uni.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
      }
    },
    // 图片点击事件
    handleGoVideo(item){
      // 1.将数据存到全局共享中
      getApp().globalData.video = item;
      // 2.页面跳转
      uni.navigateTo({
        url: '/pages/videoPlay/index'
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .video_main {
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
  .video_item {
    width: 33.33%;
    border: 5rpx solid #fff;
    image {

    }
  }
}
</style>
