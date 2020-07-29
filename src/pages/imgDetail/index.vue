<template>
  <view>
    <!-- 用户信息 开始 -->
    <view class="user_info">
      <view class="user_icon">
        <!-- <image :src="imgDetail.user.avatar" mode="widthFix" /> -->
        <image
          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3878988015,2382580758&fm=26&gp=0.jpg"
          mode="widthFix"
        />
      </view>
      <view class="user_desc">
        <!-- <view class="user_name">{{imgDetail.user.name}}</view> -->
        <view class="user_name">螺旋狗</view>
        <view class="user_time">{{ imgDetail.cnTime }}</view>
      </view>
    </view>
    <!-- 用户信息 结束 -->

    <!-- 高清大图 开始 -->
    <swiper-action @swiperAction="handelSwiperAction">
      <view class="high_img">
        <image mode="widthFix" :src="imgDetail.thumb" />
      </view>
    </swiper-action>
    <!-- 高清大图 结束 -->

    <!-- 点赞收藏 开始 -->
    <view class="user_rank">
      <view class="rank">
        <text class="iconfont icon-dianzan1">{{ imgDetail.rank }}</text>
      </view>
      <view class="user_collect">
        <text class="iconfont icon-shoucang">收藏</text>
      </view>
    </view>
    <!-- 点赞收藏 结束 -->

    <!-- 专辑 开始 -->
    <view class="album_wrap">
      <!-- 标题 -->
      <view class="album_title">相关</view>
      <!-- 内容 -->
      <view class="album_list">
        <view class="album_item" v-for="item in album" :key="item.id">
          <!-- 左边 -->
          <view class="album_cover">
            <image :src="item.cover" mode="aspectFill"></image>
          </view>
          <!-- 右边 -->
          <view class="album_info">
            <view class="album_info_text">专辑</view>
            <view class="album_name">{{ item.name }}</view>
            <text class="iconfont icon-dayuhao"></text>
          </view>
        </view>
      </view>
    </view>
    <!-- 专辑 结束 -->

    <!-- 最热评论 comment hot -->
    <view class="comment hot" v-if="hot.length">
      <view class="comment_title">
        <text class="iconfont icon-hot"></text>
        <text class="comment_text">最热评论</text>
      </view>
      <view class="comment_list">
        <view class="comment_item" v-for="item in hot" :key="item.id">
          <!-- 用户信息 -->
          <view class="comment_user">
            <!-- 用户头像 -->
            <view class="user_icon">
              <image mode="widthFix" :src="item.user.avatar" />
            </view>
            <!-- 用户名称 -->
            <view class="user_name">
              <view class="user_nickname">{{ item.user.name }}</view>
              <view class="user_time">{{ item.cnTime }}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user_badge">
              <image
                v-for="item2 in item.user.title"
                :key="item2.icon"
                :src="item2.icon"
              />
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment_desc">
            <view class="comment_content">{{ item.content }}</view>
            <view class="comment_like">
              <text class="iconfont icon-dianzan1">{{ item.size }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热评论 comment hot  结束-->

    <!-- 最新评论 comment new 开始 -->
    <view class="comment new" v-if="comment.length">
      <view class="comment_title">
        <text class="iconfont icon-pinglun"></text>
        <text class="comment_text">最新评论</text>
      </view>
      <view class="comment_list">
        <view class="comment_item" v-for="item in comment" :key="item.id">
          <!-- 用户信息 -->
          <view class="comment_user">
            <!-- 用户头像 -->
            <view class="user_icon">
              <image mode="widthFix" :src="item.user.avatar" />
            </view>
            <!-- 用户名称 -->
            <view class="user_name">
              <view class="user_nickname">{{ item.user.name }}</view>
              <view class="user_time">{{ item.cnTime }}</view>
            </view>
            <!-- 用户徽章 -->
            <view class="user_badge">
              <image
                v-for="item2 in item.user.title"
                :key="item2.icon"
                :src="item2.icon"
              />
            </view>
          </view>
          <!-- 评论数据 -->
          <view class="comment_desc">
            <view class="comment_content">{{ item.content }}</view>
            <view class="comment_like">
              <text class="iconfont icon-dianzan1">{{ item.size }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新评论 comment 结束 -->

    <!-- 下载开始 -->
    <view class="download" @click="handleDowload">
      <view class="download_btn">下载图片</view>
    </view>
    <!-- 下载结束 -->
  </view>
</template>

<script>
import moment from "moment";
import swiperAction from "@/components/swiperAction.vue";
// 设置语言格式为 中文
moment.locale("zh-cn");
export default {
  components: {
    swiperAction,
  },
  data() {
    return {
      imgDetail: {},
      album: [],
      hot: [],
      comment: [],
      // 图片的索引
      index: "",
    };
  },
  mounted() {
    console.log(getApp().globalData);
    let { imgIndex } = getApp().globalData;
    this.index = imgIndex;
    this.getData();
  },
  methods: {
    //给当前页面赋值
    getData() {
      let { imgList } = getApp().globalData;

      this.imgDetail = imgList[this.index];
      // 组合图片属性
      this.imgDetail.newThumb =
        this.imgDetail.thumb + this.imgDetail.rule.replace("$<Height>", 360);

      // 时间格式
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
      // 获取评论数据
      this.getComments(this.imgDetail.id);
    },
    // 获取评论数据
    getComments(id) {
      this.request({
        url: `https://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`,
      }).then((res1) => {
        console.log(res1);
        this.album = res1.res.album;

        // 给 hot 数组中的对象添加一个时间属性 xxx月前
        res1.res.hot.forEach(
          (v) => (v.cnTime = moment(v.atime * 1000).fromNow())
        );
        res1.res.comment.forEach(
          (v) => (v.cnTime = moment(v.atime * 1000).fromNow())
        );

        this.hot = res1.res.hot;
        this.comment = res1.res.comment;
      });
    },
    // 组件滑动事件
    handelSwiperAction(e) {
      let { imgList } = getApp().globalData;
      if (e.direction === "left" && this.index < imgList.length - 1) {
        // 可以进行左滑动，加载下一张
        this.index++;
        this.getData();
      } else if (e.direction === "right" && this.index > 0) {
        // 右滑，加载上一张
        this.index--;
        this.getData();
      } else {
        uni.showToast({
          title: "没有更多照片了",
          icon: "none",
        });
      }
    },
    // 下载按钮
    async handleDowload() {
      // 加载图标
      await uni.showLoading({
        title: '下载中'
      })

      // 将远程文件下载到小程序的内存中
      const res1 = await uni.downloadFile({url: this.imgDetail.img});
      const {tempFilePath} = res1[1];

      // 将小程序内存中的临时文件下载到本地上
      const res2 = await uni.saveImageToPhotosAlbum({filePath: tempFilePath});

      // 关闭加载图标
      uni.hideLoading();  
      await uni.showToast({
        title: '下载图片成功'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.user_info {
  display: flex;
  padding: 20rpx;
  .user_icon {
    padding: 0 20rpx;
    image {
      width: 88rpx;
      border-radius: 50%;
    }
  }

  .user_desc {
    .user_name {
      color: #000;
      font-weight: 600;
    }

    .user_time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}

.user_rank {
  display: flex;
  height: 80rpx;
  border-bottom: 5rpx solid #eee;
  .rank {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
    }
  }

  .user_collect {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
    }
  }
}
/* 专辑 */
.album_wrap {
  padding: 20rpx;
  .album_title {
    padding: 10rpx 0;
  }

  .album_list {
    .album_item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 10rpx solid #eee;

      .album_cover {
        flex: 1;
        image {
          width: 180rpx;
          height: 180rpx;
        }
      }

      .album_info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;
        .album_info_text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .iconfont {
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
          color: #000;
        }
        .album_name {
        }
      }
    }
  }
}

/* 最热评论 */
.comment {
  .comment_title {
    padding: 15rpx;
    .iconfont {
      font-size: 40rpx;
    }
    .icon-hot {
      color: red;
    }
    .icon-pinglun {
      color: aqua;
    }

    .comment_text {
      font-weight: 600;
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }
  .high_img {
    image {
      border-bottom: 1rpx solid #eee;
    }
  }
  .comment_list {
    .comment_item {
      border-bottom: 15rpx solid #eee;
      // 用户信息
      .comment_user {
        display: flex;
        padding: 20rpx 0;
        .user_icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;

          image {
            width: 80%;
            border-radius: 50%;
          }
        }

        .user_name {
          flex: 1;
          .user_nickname {
            color: #777;
          }

          .user_time {
            color: #ccc;
            font-size: 24rpx;
            padding: 5rpx;
          }
        }

        .user_badge {
          image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
          }
        }
      }

      .comment_desc {
        display: flex;
        padding: 30rpx 0;
        .comment_content {
          flex: 1;
          padding-left: 15%;
          color: #000;
        }

        .comment_like {
          text-align: right;
          padding-right: 15rpx;
          .iconfont {
          }
        }
      }
    }
  }
}

.download {
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .download_btn {
    width: 90%;
    height: 80%;
    background-color: $color;
    color: #fff;
    font-size: 50rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
