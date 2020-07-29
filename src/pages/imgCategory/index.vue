<template>
  <view class="cartgory_tab">
    <!-- tab 标签 -->
    <view class="cartgory_tab_title">
      <view class="title_inner">
        <uni-segmented-control
          :current="current"
          :values="items.map((v) => v.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#d4237a"
        ></uni-segmented-control>
      </view>
      <view class="iconfont icon-search"></view>
    </view>
    <scroll-view @scrolltolower="handleScrolltolower" enable-flex scroll-y class="category_tab_content">
      <view class="cate_item" v-for="item in vertical" :key="item.id">
        <image :src="item.thumb" mode="widthFix"></image>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
      items: [
        { title: "最新" , order: 'new'},
        { title: "热门" , order: 'hot'},
      ],
      current: 0,
      params:{
        limit: 30,
        skip: 0,
        order: 'new'
      },
      // 图片数据
      vertical:[],
      // 是否还有下一页数据
      hasMore: true
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.getList();
  },
  components: {
    uniSegmentedControl,
  },
  methods: {
    // 点击改变tab
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }else{
        // 点击相同的标题
        return;
      }
      // 修改ordder
      this.params.order = this.items[e.currentIndex].order;
      // 重置 skip  vertical
      this.params.skip = 0;
      this.vertical = [];
      this.getList();
    },
    // 获取数据
    getList(){
      this.request({
        url: `https://service.picasso.adesk.com/v1/vertical/category/${this.id}/vertical`,
        data: this.params
      }).then(res => {
        if(res.res.vertical.length === 0) {
          this.hasMore = false;
          return;
        }
        this.vertical = [...this.vertical,...res.res.vertical];

      })
    },
    // 滚动条触底
    handleScrolltolower(){
      if(this.hasMore){
        this.params.skip += this.params.limit;
        this.getList();
      }else {
        uni.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cartgory_tab_title {
  position: relative;
  .title_inner {
    width: 60%;
    margin: 0 auto;
  }
  .icon-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5%;
  }
}
.category_tab_content{
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);
  .cate_item{
    width: 33.33%;
    border: 5rpx solid #fff;
  }
}
</style>
