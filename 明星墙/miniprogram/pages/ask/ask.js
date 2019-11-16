// miniprogram/pages/ask/ask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取用户信息
  getUserInfo(e){
    // console.log(e);
    wx.setStorageSync("userInfo", e.detail.userInfo);
    // 获取当前用户openid
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxa1b87075b923334a&secret=f0839717a8f248fe2a4ffdf15505c611&js_code=${res.code}&grant_type=authorization_code`,
            data: {
              code: res.code
            },
            success:res=>{
              console.log(res.data.openid);
              wx.setStorageSync("openid",res.data.openid);
            },
            fail:err=>{
              wx.showToast({
                title: 'openid获取失败！',
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.navigateBack();

  }
})