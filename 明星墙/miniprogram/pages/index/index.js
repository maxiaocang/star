// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 请求数据
    wx.cloud.database().collection("users").where({}).get().then(res=>{
      this.setData({
        users:res.data
      })
    })
  },
  toDetail(e){
    // console.log(e.currentTarget.id)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.id}`,
    })
  }
  
})