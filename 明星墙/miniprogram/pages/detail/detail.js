// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:[],
      id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    // this.setData({ id: options.id})
    let id = options.id
    wx.cloud.database().collection("users").where({
      _id: id
    }).get().then(res => {
      // console.log(res);
      // let info = res.data.filter(item => {
      //   return item._id == this.data.id
      // })
      this.setData({
        userInfo: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let openid = wx.getStorageSync("openid");
    
  },

  
})