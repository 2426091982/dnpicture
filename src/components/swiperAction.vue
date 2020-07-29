<template>
  <view @touchstart="handleTouchstart" @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 按下时间
      startTime: 0,
      // 按下的坐标
      startX: 0,
      startY: 0,
    };
  },
  methods: {
    // 用户按下屏幕
    handleTouchstart(e) {
      this.startTime = Date.now();
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
    },
    // 用户松开屏幕
    handleTouchend(e) {
      let endTime = Date.now();
      let endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;

      // 判断按下的时长
      if (endTime - this.startTime > 2000) {
        return;
      }

      // 判断按下的方向
      let direction = "";

      // 先判断用户滑动的距离 是否合法 合法：判断滑动的方向，
      if (
        Math.abs(endX - this.startX) > 10 &&
        Math.abs(endY - this.startY) < 10
      ) {
        // 滑动方向
        direction = endX - this.startX > 0 ? "right" : "left";
      } else {
        return;
      }
      // 用户做了合法的滑动操作
      this.$emit("swiperAction", { direction });
    },
  },
};
</script>

<style scoped></style>
