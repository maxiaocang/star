// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickName:"点击头像登录",
      avatarUrl:"/images/person.png"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  onShow(){
    // 获取缓存中保存的用户信息
    if (wx.getStorageSync("userInfo")) {
      this.setData({ userInfo: wx.getStorageSync("userInfo") })
    }
  },
  // 点击按钮获取用户信息
  // getuserinfo(e){
  //   console.log(e)
  // },

  // 用户登录
  login(){
    if (!wx.getStorageSync("userInfo")){
      wx.navigateTo({
        url: '/pages/ask/ask',
      })
    }else{
      wx.showToast({
        title: '您已登录',
      })
    }
    
  },

  //跳转到个人简介
  toIntroduction(){
    // 先判断用户是否登录
    if(wx.getStorageSync("userInfo")){
      wx.navigateTo({
        url: '/pages/introduction/introduction',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  //跳转到添加视频
  toAdd() {
    // 先判断用户是否登录
    if (wx.getStorageSync("userInfo")) {
      wx.navigateTo({
        url: '/pages/video/video',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
 
})