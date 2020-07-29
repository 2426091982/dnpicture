<template>
  <scroll-view
    @scrolltolower="handleToLower"
    class="recommend_view"
    scroll-y
    v-if="recommends.length > 0"
  >
    <!-- 推荐开始 -->
    <view class="recommend_wrap">
      <navigator
        :url="`/pages/album/index?id=${item.target}`"
        v-for="item in recommends"
        :key="item.id"
        class="recommend_item"
      >
        <image mode="widthFix" :src="item.thumb" alt="" />
      </navigator>
    </view>
    <!-- 推荐结束 -->
    <!-- 月份开始 -->
    <view class="monthes_wrap">
      <view class="monthes_title">
        <view class="monthes_title_info">
          <view class="monthes_info">
            <text> {{ monthes.DD }}/</text>
            {{ monthes.MM }} 月
          </view>
          <view class="monthes_text">{{ monthes.title }}</view>
        </view>
        <view class="monthes_title_more">更多 > </view>
      </view>
      <view class="monthes_content">
        <view class="monthes_item" v-for="(item,i) in monthes.items" :key="item.id">
          <go-detail :list="monthes.items" :i="i">
            <image
              mode="aspectFill"
              :src="item.thumb + item.rule.replace('$<Height>', 360)"
            ></image>
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 月份结束 -->
    <!-- 热门开始 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hot_item" v-for="(item,i) in hots" :key="item.id">
          <go-detail :list="hots" :i="i">
            <image mode="widthFix" :src="item.thumb"></image>
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
import goDetail from "@/components/goDetail.vue";
export default {
  components: {
    goDetail,
  },
  data() {
    return {
      // 推荐列表
      recommends: [],
      // 月份模块
      monthes: [],
      // 热门模块
      hots: [],
      // 请求的参数
      params: {
        // 要获取几条数据
        limit: 30,
        // 关键字
        order: "hot",
        // 要跳过几条
        skip: 0,
      },
      // 是否还有下一页数据
      hasMore: true,
    };
  },
  mounted() {
    // 获取列表
    this.getList();
    // 修改页面的标题
    uni.setNavigationBarTitle({ title: "首页" });
  },
  methods: {
    //  滚动条触底时间
    handleToLower() {
      if (this.hasMore) {
        // 修改 跳过的数据  skip += limit
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
    // 获取接口数据
    getList() {
      this.request({
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        data: this.params,
      }).then((res1) => {
        // 判断还有没有下一页数据
        if (res1.res.vertical.length === 0) {
          // 修改为 false,表示没有数据了
          this.hasMore = false;
          uni.showToast({
            title: "没有数据了",
            icon: "none",
          });
          return;
        }

        if (this.recommends.length === 0) {
          // 第一次发请求
          // 推荐模块
          this.recommends = res1.res.homepage[1].items;
          // 月份模块
          this.monthes = res1.res.homepage[2];
          // 将时间戳 改成 18号/月格式 monent.js
          this.monthes.MM = moment(this.monthes.stime).format("MM");
          this.monthes.DD = moment(this.monthes.stime).format("DD");
        }

        // 热门模块
        // es6 数组拼接
        this.hots = [...this.hots, ...res1.res.vertical];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend_view {
  // height: 屏幕的高度 - 头部标题的高度
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}

.monthes_wrap {
  .monthes_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .monthes_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .monthes_info {
        text {
          font-size: 36rpx;
        }
      }

      .monthes_text {
        margin-left: 30rpx;
        font-size: 34rpx;
        color: #666;
      }
    }

    .monthes_title_more {
      font-size: 24rpx;
      color: $color;
    }
  }

  .monthes_content {
    display: flex;
    flex-wrap: wrap;
    .monthes_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}

.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      padding-left: 20rpx;
      border-left: 20rpx solid $color;
      font-size: 30rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>
