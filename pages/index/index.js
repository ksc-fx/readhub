import service from "../../server/serviceNews";
const app = getApp();

function resetDayObject() {
    app.globalData.dayObject = [
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ];
}

Page({
    data: {
        news: [],
        newsForm: {
            lastCursor: "",
            pageSize: 20
        },
        lowerReqState: false,
        isNavigate: false
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
            data: {
                ...this.data.newsForm
            }
        };
        service(option)
            .then(() => {
                const globalNews = app.globalData.news;

                this.setData({
                    news: globalNews,
                    lowerReqState: false
                });
            })
            .catch(error => {
                console.log("errorsss", error);
            });
    },
    tabItem: function(e) {
        if (this.data.isNavigate) {
            return;
        }
        this.setData({
            isNavigate: true
        });

        wx.navigateTo({
            url: "../detail/index?id=" + e.target.id,
            success: () => {
                console.log("跳转详情succ");
                this.setData({
                    isNavigate: false
                });
            },
            fail: error => {
                console.log("跳转详情error", error);
                this.setData({
                    isNavigate: false
                });
            }
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
        this.setData({
            news: [],
            newsForm: {
                lastCursor: "",
                pageSize: 20
            }
        });
        resetDayObject();
        this.getNews();
        wx.stopPullDownRefresh();
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
