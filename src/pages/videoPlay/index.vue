<template>
  <view class="video_play" v-if="videoObj.img">
    <image :src="videoObj.img"></image>
    <!-- 工具栏开始 -->
    <view class="video_tool">
      <view
        :class="[
          'iconfont',
          isMuted ? 'icon-jinyin' : 'icon-shengyinyinliangmianxing-',
        ]"
        @click="handleMuted"
      ></view>
      <view class="iconfont icon-fenxiang">
        <button open-type="share"></button>
      </view>
    </view>
    <!-- 工具栏结束 -->

    <!-- 视频控件 开始 -->
    <view class="video_wrap">
      <video :src="videoObj.video" :muted="isMuted" objectFit="fill"></video>
    </view>
    <!-- 视频控件 结束 -->

    <!-- 下载开始 -->
    <view class="download">
      <view class="fownload_btn" @click="handledDownload">下载高清</view>
    </view>
    <!-- 下载结束 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 数据数组
      videoObj: {},
      // 是否禁音
      isMuted: false,
    };
  },
  onLoad() {
    this.videoObj = getApp().globalData.video;
  },
  methods: {
    // 开关声音
    handleMuted() {
      this.isMuted = !this.isMuted;
    },
    // 下载视频
    async handledDownload() {
      // 展示加载中图标
      await uni.showLoading({ title: "下载中" });

      // 将远程文件 下载到小程序的内存中
      const { tempFilePath } = (await uni.downloadFile({
        url: this.videoObj.video,
      }))[1];
     
      // 将内存中的文件下载到本地上
      await uni.saveVideoToPhotosAlbum({
        filePath:tempFilePath
      });

      // 关闭加载中图标
      uni.hideLoading();

      await uni.showToast({
        title:'下载成功!'
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.video_play {
  position: relative;
  image {
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    // css3 滤镜
    filter: blur(20px);
  }
  .video_tool {
    height: 80rpx;
    display: flex;
    justify-content: flex-end;
    .iconfont {
      width: 80rpx;
      color: #fff;
      font-size: 50rpx;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20rpx;
    }
  }

  .video_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    video {
      width: 360rpx;
      height: 600rpx;
    }
  }

  .download {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30rpx;
    .fownload_btn {
      width: 360rpx;
      height: 80rpx;
      border: 5rpx solid #fff;
      border-radius: 30rpx;
      padding: 10rpx 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
.icon-fenxiang {
  position: relative;
  button {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
