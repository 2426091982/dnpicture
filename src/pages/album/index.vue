<template>
  <view class="box">
    <!-- 专辑背景 开始 -->
    <view class="album_bg">
      <image mode="widthFix" :src="album.cover" />
      <view class="album_info">
        <view class="album_name">{{ album.name }}</view>
        <view class="album_btn">关注专辑</view>
      </view>
    </view>
    <!-- 专辑背景 结束 -->

    <!-- 专辑作者 开始 -->
    <view class="album_author">
      <view class="album_author_info">
        <!-- 头像 -->
        <image mode="widthFix" :src="album.user.avatar"></image>
        <!-- 姓名 -->
        <view class="author_name">{{ album.user.name }}</view>
      </view>
      <!-- 介绍 -->
      <view class="album_author_desc">
        <text>{{ album.desc }}</text>
      </view>
    </view>
    <!-- 专辑作者 结束 -->

    <!-- 列表开始 -->
    <view class="album_list">
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item">
        <image
          mode="widthFix"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595671489800&di=8417046795de80edbf9c1eb0b544ff0c&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-23%2F140024125.jpg"
        ></image>
      </view>
      <view class="album_item" v-for="(item,i) in wallpaper" :key="item.id">
        <go-detail :list="wallpaper" :i="i">
          <image
            mode="widthFix"
            :src="item.thumb + item.rule.replace('$<Height>,360')"
          ></image>
        </go-detail>
      </view>
    </view>
    <!-- 列表结束 -->
  </view>
</template>

<script>
import goDetail from "@/components/goDetail"
export default {
  components:{
    goDetail
  },
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        // 0 为第一次请求， 1为不是第一次
        first: 1,
      },
      // id 详情
      id: -1,
      album: [],
      wallpaper: [],
      hasMore: true,
    };
  },
  onLoad(option) {
    // this.id = option.id;
    this.id = "5d5f8e45e7bce75ae7fb8278";
    this.getList();
    console.log(this.id);
  },
  // 页面触底 上拉加载下一页事件
  onReachBottom() {
    if (this.hasMore) {
      this.first = 0; // 已经请求过一次了，设置成0
      this.params.skip += this.params.limit;
      this.getList();
    } else {
      uni.showToast({
        title: "没有更多数据了",
        icon: "none",
      });
    }
  },
  methods: {
    getList() {
      this.request({
        url: `https://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params,
      }).then((res1) => {
        if (Object.keys(this.album).length === 0) {
          // 如果没有数据，才赋值
          this.album = res1.res.album;
        }
        if (res1.res.wallpaper.length === 0) {
          // 判断是否有数据
          this.hasMore = false;
          return;
        }
        this.wallpaper = res1.res.wallpaper;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 专辑背景
.album_bg {
  position: relative;
  image {
  }

  .album_info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: #fff;
    padding: 0 15rpx;
    .album_name {
      font-size: 40rpx;
    }

    .album_btn {
      background-color: $color;
      width: 152rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
    }
  }
}
// 专辑作者
.album_author {
  padding: 12rpx;
  .album_author_info {
    padding: 10rpx 0;
    display: flex;
    image {
      width: 50rpx;
    }

    .author_name {
      color: #000;
      margin-left: 15rpx;
    }
  }

  .album_author_desc {
  }
}
// 列表开始
.album_list {
  margin-top: 40rpx;
  display: flex;
  flex-wrap: wrap;
  .album_item {
    width: 33.33%;
    border: 5rpx solid #fff;
    image {
      
    }
  }
}
</style>
