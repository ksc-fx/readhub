import service from "../../server/service";

const dayObject = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false
};
//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    news: [],
    newsForm: {
      lastCursor: "",
      pageSize: 20
    },
    lowerReqState: false
  },
  onLoad: function() {
    this.getNews();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  getNews: function() {
    this.setData({
      lowerReqState: true
    });
    const option = {
      url: "https://api.readhub.me/topic",
      data: {
        ...this.data.newsForm
      }
    };
    service(option)
      .then(data => {
        const news = data.data;

        news.forEach(item => {
          if (!dayObject[new Date(item.publishDate).getDay()]) {
            item.showDate = true;
            dayObject[new Date(item.publishDate).getDay()] = true;
          }
          const timeStemp = new Date(item.publishDate).getTime();
          item.dateFormat = this.parseDate(timeStemp);
          const tempObj = {};
          const tempKey = "news[" + this.data.news.length + "]";
          tempObj[tempKey] = item;
          this.setData(tempObj);
        });

        this.setData({
          lowerReqState: false
        });
        wx.hideLoading();
      })
      .catch(error => {
        console.log("error", error);
      });
  },
  /**
   *  date 时间戳
   */
  parseDate: function(date) {
    if (isNaN(date)) {
      return "";
    }
    let resStr = "";
    const today =
      new Date().getFullYear() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getDate();
    const todayStart = new Date(today + " 00:00:00").getTime();
    const todayEnd = new Date(today + " 23:59:59").getTime();
    const dateDiff = Math.floor((todayEnd - date) / 86400000);
    const dayList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const todayDay = new Date().getDay();
    const dateDay = new Date(date).getDay();
    resStr = dayList[dateDay];
    switch (dateDiff) {
      case 0:
        resStr = "今天";
        break;
      case 1:
        resStr = "昨天";
        break;
      default:
    }
    if (
      todayDay < dateDay ||
      (todayDay != dateDay && dateDay == 0 && todayDay != 1)
    ) {
      resStr = "上" + resStr;
    }
    return resStr;
  },
  tabItem: function(e) {
    console.log("点击");
    wx.navigateTo({
      url: "../details/index?id=" + this.data.newsForm.id
    });
  },

  /**
   * 滚动
   */
  scroll: function(e) {},
  /**
   * 下拉刷新
   */
  upper: function() {},
  /**
   * 上拉加载
   */
  lower: function() {
    console.log("上拉加载");
    if (this.data.lowerReqState) {
      return;
    }
    this.setData({
      lastCursor: this.data.news[this.data.news.length - 1].order,
      pageSize: 20,
      lowerReqState: true
    });
    this.getNews();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: "正在刷新",
      icon: "loading"
    });
    console.log("下拉刷新");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上提加载");
    wx.showLoading({
      title: "正在加载",
      icon: "loading"
    });
    if (this.data.lowerReqState) {
      return;
    }
    this.setData({
      newsForm: {
        lastCursor: this.data.news[this.data.news.length - 1].order,
        pageSize: 20
      },
      lowerReqState: true
    });
    console.log(this.data);
    this.getNews();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
