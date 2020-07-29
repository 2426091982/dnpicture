<template>
  <view class="home_tab">
    <!-- tab 标签 -->
    <view class="home_tab_title">
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
    <!-- tab 内容 -->
    <view class="home_tab_content">
      <view v-if="current === 0">
        <home-Recommend></home-Recommend>
      </view>
      <view v-if="current === 1">
        <home-Category></home-Category>
      </view>
      <view v-if="current === 2">
        <home-New></home-New>
      </view>
      <view v-if="current === 3">
        <home-album></home-album>
      </view>
    </view>
  </view>
</template>

<script>
import homeAlbum from "./home-album/index.vue";
import homeCategory from "./home-category/index.vue";
import homeNew from "./home-new/index.vue";
import homeRecommend from "./home-recommend/index.vue";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      current: 1,
    };
  },
  components: {
    homeAlbum,
    homeCategory,
    homeNew,
    homeRecommend,
    uniSegmentedControl,
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home_tab_title {
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
</style>
