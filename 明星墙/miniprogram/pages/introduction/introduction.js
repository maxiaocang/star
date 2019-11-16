// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: "/images/11.png",
    up_image:"",
    address:"--点击选择地址--"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击选择上传图片
  upload() {
    wx.chooseImage({
      success: (res) => {
        // console.log(res.tempFilePaths);
        this.setData({
          image: res.tempFilePaths,
          up_image: res.tempFilePaths
        })
      }
    })
  },
  // 点击选择地址
  bindRegionChange(e) {
    // console.log(e.detail.value);
    this.setData({ address: e.detail.value })
  },
  // 点击提交
  formSubmit(e) {
    // console.log(e.detail.value);
    let msg = e.detail.value;
    if(msg.username == ""){
      wx.showToast({
        title: '姓名不能为空',
        icon:"none"
      })
    } else if (msg.up_image == ""){
      wx.showToast({
        title: '图片不能为空',
        icon: "none"
      })
    } else if (msg.address == "") {
      wx.showToast({
        title: '地址不能为空',
        icon: "none"
      })
    } else if (msg.dsc == "") {
      wx.showToast({
        title: '描述不能为空',
        icon: "none"
      })
    }else{
      wx.showLoading({
        title: '正在提交',
        mask:true
      })
      // 获取用户头像
      let avatarUrl = wx.getStorageSync("userInfo").avatarUrl;
      // 将图片资源上传到服务器
      wx.cloud.uploadFile({
        cloudPath: "images/"+new Date().getTime() + ".jpg",
        filePath: msg.up_image
      }).then(res => {
        // console.log(res.fileID);
        // 得到图片在云服务器地址
        msg.up_image = res.fileID;
        // 将数据插入到数据库
        wx.cloud.database().collection("users").add({
          data: {
            username: msg.username,
            avatarUrl:avatarUrl,
            sex: msg.sex,
            image: msg.up_image,
            address: msg.address,
            dsc: msg.dsc
          }
          // 插入成功
        }).then(res => {
          console.log(res);
          wx.showToast({
            title: '提交成功',
          })
          this.setData({
            form_info:"",
            image: "/images/11.png",
            up_image: "",
            address: "--点击选择地址--"
          })
          // 插入失败
        }).catch(err => {
          console.error(err)
        })
      })
    }
    
  }
})