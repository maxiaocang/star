// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:[],
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    // 获取当前用户的 openid
    this.getContent()
   
  },
  onPullDownRefresh(){
    this.getContent()
  },
  getContent(){
    let openid = wx.getStorageSync("openid");
    wx.cloud.database().collection("videos").where({
      _openid: openid
    }).get().then(res => {
      console.log(res);
      if (res.data.length != 0) {
        this.setData({ videoUrl: res.data, flag: false });
      }
    }).catch(err => {
      console.error(err)
    })
  }

  
})