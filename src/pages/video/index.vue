<template>
  <view class="video_tab">
    <!-- tab 标签 -->
    <view class="video_tab_title">
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
      <view v-if="current < 4">
        <video-main
          :urlObj="{ url: items[current].url, params: items[current].params }"
        ></video-main>
      </view>
      <view v-if="current === 4">
        <video-category></video-category>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import videoMain from "./video-main/index.vue";
import videoCategory from "./video-category/index.vue";
export default {
  data() {
    return {
      items: [
        {
          title: "推荐",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
          params: { limit: 30, skip: 0, order: "hot" },
        },
        {
          title: "娱乐",
          url:
            "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
          params: { limit: 30, skip: 0, order: "new" },
        },
        {
          title: "最新",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
          params: { limit: 30, skip: 0, order: "new" },
        },
        {
          title: "热门",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
          params: { limit: 30, skip: 0, order: "hot" },
        },
        {
          title: "分类",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
          params: {},
        },
      ],
      current: 0,
    };
  },
  components: {
    uniSegmentedControl,
    videoMain,
    videoCategory,
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
.video_tab_title {
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
