let flag = false;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:"开始",
    bg_color:"#00C777",
    tempVideoPath:"",
    videoUrl:"",
    position:"back",
    flag:false,
    hours:"00",
    minutes:"00",
    seconds:"00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.camera = wx.createCameraContext(); 
  },

  start(){
    if(flag){
      this.stop();
      this.setData({
        action: "开始",
        bg_color: "#00C777",
      })
    }else{
      // 开始录制
      this.camera.startRecord();
      // 开始计时
      timer = setInterval(()=>{
        seconds++;
        if(seconds >= 60){
          seconds = 0;
          minutes++;
          if(minutes >= 60){
            minutes = 0;
            hours++
          }
        }
        if (String(seconds).length == 1) {
          seconds = "0" + seconds;
        }
        if (String(minutes).length == 1) {
          minutes = "0" + minutes;
        }
        if (String(hours).length == 1) {
          hours = "0" + hours;
        }
        this.setData({hours,minutes,seconds})
      },1000)
      this.setData({
        action:"停止",
        bg_color:"#ff0000",
      })
    }
    flag = !flag;
  },
  // 停止录制
  stop(){
    this.camera.stopRecord({
      success:res=>{
        // console.log(res.tempVideoPath);
        // 停止计时
        // 清空定时器
        clearInterval(timer);
        // 计数置零
        hours = 0;
        minutes = 0;
        seconds = 0;
        this.setData({
          tempVideoPath: res.tempVideoPath
        })
      },
      fail:err=>{
        console.error(err)
      }
    })
  },
  // 上传录制的视频
  upload(){
    // 判断是否有录制视频
    if(this.data.tempVideoPath == ""){
      wx.showToast({
        title: '请先录制视频',
        icon: 'none'
      })
    }else{
      wx.showLoading({
        title: '正在上传',
      })
      wx.cloud.uploadFile({
        cloudPath: "video/"+new Date().getTime() + ".mp4",
        filePath: this.data.tempVideoPath
      }).then(res => {
        wx.cloud.database().collection("videos").add({
          data: {
            videoUrl: res.fileID
          }
        }).then(res => {
          // console.log(res);
          wx.showToast({
            title: '上传成功！',
          })
          // 视频临时地址置空，防止重复提交
          this.data.tempVideoPath = "";
          // 秒表置零
          this.setData({
            hours:"00",
            minutes:"00",
            seconds:"00"
          })
        }).catch(err => {
          wx.showToast({
            title: '上传失败！',
          })
          // 视频临时地址置空，防止重复提交
          this.data.tempVideoPath = "";
          // 秒表置零
          this.setData({
            hours: "00",
            minutes: "00",
            seconds: "00"
          })
        })
      }).catch(err => {
        // console.error(err)
      })
    }
  },
  change(){
    this.setData({flag:!this.data.flag});
    if(this.data.position == "back"){
      this.setData({
        position:"front"
      })
    }else{
      this.setData({
        position: "back"
      })
    }
  }
})