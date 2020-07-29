export default (params) => {
  // 显示加载中图标
  uni.showLoading({
    title: "加载中",
  });
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // 关闭加载图标
        uni.hideLoading();
      }
    })
  })
}