import service from "../../server/serviceNews";

const app = getApp();

Page({
    data: {
        currentId: "",
        dataList: [],
        newsForm: {
            lastCursor: "",
            pageSize: 20
        },
        onLoadStatus: false,
        swiperDura: 0
    },
    onLoad: function(option) {
        let currentId = "";
        console.log("option", option);
        let news = app.globalData.news;
        let hasID = false;
        if (option && option.id) {
            currentId = option.id;
            console.log("news", news);

            news.forEach(item => {
                if (item.id == currentId) {
                    hasID = true;
                }
            });
            if (!hasID) {
                service({
                    url: "https://api.readhub.me/topic/" + currentId
                }).then(() => {
                    this.setData({
                        dataList: news,
                        currentId: currentId
                    });
                });
            } else {
                this.setData({
                    dataList: news,
                    currentId: currentId
                });
            }
        } else {
            currentId = this.data.dataList[0].id;
            this.setData({
                dataList: news,
                currentId: currentId
            });
        }

        console.log("asdasd", this.data.dataList);
    },
    onReady: function() {
        this.setData({
            swiperDura: 500
        });
    },
    // swiper切换
    bindChange: function(e) {
        console.log("swiper 切换", e);
        // e.detail.source  判断是否手动划动引起变化
        if (e.detail && e.detail.currentItemId == "loading") {
            if (this.data.onLoadStatus) {
                return;
            }
            const lastCont = app.globalData.news.length;
            this.setData({
                onLoadStatus: true,
                newsForm: {
                    lastCursor: app.globalData.news[lastCont - 1].order,
                    pageSize: 20
                }
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
                        currentId: globalNews[lastCont].id,
                        dataList: globalNews,
                        onLoadStatus: false
                    });
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    },
    // 点击右下角(未使用)
    actionSheet: function() {
        wx.showActionSheet({
            itemList: ["复制新闻地址"],
            success: res => {
                switch (res.tapIndex) {
                    case 0:
                        this.setClipboardData();
                        break;
                    default:
                        console.log("default");
                }
            }
        });
    },
    // 复制当前地址(未使用)
    setClipboardData: function() {
        const currentId = this.data.currentId;
        const dataList = this.data.dataList;
        let data = {};
        dataList.forEach(item => {
            if (item.id == currentId) {
                data = item;
                return false;
            }
        });
        if (data.mobileUrl) {
            wx.setClipboardData({
                data: data.mobileUrl,
                success: function(res) {
                    wx.showToast({
                        title: "复制成功",
                        icon: "success"
                    });
                },
                fail: function(res) {
                    wx.showToast({
                        title: "复制失败",
                        icon: "none"
                    });
                }
            });
        } else {
            wx.showToast({
                title: "复制失败",
                icon: "none"
            });
        }
    },
    // 分享
    onShareAppMessage: function() {
        const currentId = this.data.currentId;
        const dataList = this.data.dataList;
        let data = {};
        dataList.forEach(item => {
            if (item.id == currentId) {
                data = item;
                return false;
            }
        });
        return {
            title: data.title,
            // desc: data.summary,
            path: "pages/detail/index?id=" + currentId
        };
    }
});
