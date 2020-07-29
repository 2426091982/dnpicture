<template>
  <view class="home_category">
    <navigator :url="`/pages/imgCategory/index?id=${item.id}`" class="cate_item" v-for="item in category" :key="item.id">
      <image mode="aspectFill" :src="item.cover"></image>
      <view class="cate_name">{{item.name}}</view>
    </navigator>
  </view>
</template>


<script>
export default {
  data() {
    return {
      // 分类数组
      category:[],
    }
  },
  mounted(){
    // 修改页面的标题
    uni.setNavigationBarTitle({title:'分类'});
    this.getList();
  },
  methods: {
      getList(){
        this.request({
          url: "https://service.picasso.adesk.com/v1/vertical/category"
        }).then(res1 => {
          let res = res1.res;
          this.category = res.category;
          console.log(this.category);
        })
      }
  }
}
</script>


<style lang="scss" scoped>
 .home_category {
   display: flex;
   flex-wrap: wrap;
  .cate_item {
    width: 33.33%;
    position: relative;
    border: 5rpx solid #fff;
    image {
      height: 240rpx;
    }

    .cate_name {
      position: absolute;
      width: 100%;
      height: 50rpx;
      left: 0;
      bottom: 0;
      color: #fff;
      // css3渐变
      background-image: linear-gradient(to right top, rgba(0,0,0, .2),rgba(0,0,0,0));
      font-size: 40rpx;
      display: flex;
      align-items: center;
      padding-left: 20rpx;
    }
  }
}
</style>