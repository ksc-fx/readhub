Page({
    data: {
        currentId: '',
        dataList: [
            {
                "id": 19064619,
                "title": "【RSA2018】创新沙盒|机器学习和推测性代码执行技术在RSA中的应用",
                "summary": "一种引擎技术推测性代码执行引擎，该引擎能够模拟代码在内存中执行时的行为方式，通过覆盖所有潜在的执行链并专注于恶意容量而不是恶意行为 ... 其强大的机器学习和推测性代码执行技术将网络安全事件风险降至最低 ... BluVector强大的机器学习和推测性代码执行技术使企业能够准确识别高级恶意软件攻击，将网络安全事件风险降至最低。",
                "summaryAuto": "一种引擎技术推测性代码执行引擎，该引擎能够模拟代码在内存中执行时的行为方式，通过覆盖所有潜在的执行链并专注于恶意容量而不是恶意行为 ... 其强大的机器学习和推测性代码执行技术将网络安全事件风险降至最低 ... BluVector强大的机器学习和推测性代码执行技术使企业能够准确识别高级恶意软件攻击，将网络安全事件风险降至最低。",
                "url": "http://blog.nsfocus.net/rsa2018-bluvector/",
                "mobileUrl": "http://blog.nsfocus.net/rsa2018-bluvector/",
                "siteName": "绿盟科技博客",
                "language": "zh-cn",
                "authorName": "吴子建",
                "publishDate": "2018-04-16T02:38:06.000Z",
                "newsArray": [
                    {
                        id: 19064340,
                        url: "http://www.donews.com/news/detail/3/2994583.html",
                        title: "听证会结束后的Facebook依然危机重重 投资者还在喊扎克伯格下台",
                        groupId: 1,
                        siteName: "DoNews",
                        siteSlug: "site_donews",
                        mobileUrl: "http://3g.donews.com/News/donews_detail/2994583.html",
                        authorName: "赵晋杰",
                        duplicateId: 1,
                        publishDate: "2018-04-16T01:10:01.000Z"
                    },
                    {
                        id: 19064789,
                        url: "http://news.iresearch.cn/content/2018/04/274026.shtml",
                        title: "扎克伯格再遭投资者炮轰：不应同时担任董事长、CEO",
                        groupId: 2,
                        siteName: "艾瑞网",
                        siteSlug: "rss_iresearchmon",
                        mobileUrl: "http://news.iresearch.cn/content/2018/04/274026.shtml",
                        authorName: null,
                        duplicateId: 2,
                        publishDate: "2018-04-16T03:51:01.000Z"
                    }
                ],
            },
            {
                "id": 19064510,
                "title": "Windows漏洞利用开发教程Part 2：Short JUMP",
                "summary": "我花了大量的时间来研究了计算机安全领域Windows漏洞利用开发，希望能和大家分享一下，能帮助到对这方面感兴趣的朋友，如有不足，还请见谅 ... VX Search是一款能够快速搜索电脑文件的工具软件，我们的目标是VX Search Enterprise版本9.7.18，你可以通过下面链接下载存在漏洞的程序 ... 运行脚本生成payload.xml，我们继续F9运行程序，通过Import Com",
                "summaryAuto": "我花了大量的时间来研究了计算机安全领域Windows漏洞利用开发，希望能和大家分享一下，能帮助到对这方面感兴趣的朋友，如有不足，还请见谅 ... VX Search是一款能够快速搜索电脑文件的工具软件，我们的目标是VX Search Enterprise版本9.7.18，你可以通过下面链接下载存在漏洞的程序 ... 运行脚本生成payload.xml，我们继续F9运行程序，通过Import Command选项导入payload.xml文件，程序发生崩溃并弹出计算器。",
                "url": "http://www.freebuf.com/articles/system/167959.html",
                "mobileUrl": "http://www.freebuf.com/articles/system/167959.html",
                "siteName": "FreeBuf",
                "language": "zh-cn",
                "authorName": "zusheng",
                "publishDate": "2018-04-16T02:00:55.000Z"
            }
        ]
    },
    onLoad: function (option) {
        let currentId = '';
        if (option.query && option.query.id) {
            currentId = option.query.id
        }
        else {
            currentId = this.data.dataList[0].id;
        }
        this.setData({ currentId: currentId });
    },
    // swiper切换
    bindChange: function (e) {
    },
    // 点击右下角
    actionSheet: function () {
        wx.showActionSheet({
            itemList: ['复制新闻地址'],
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
    // 复制当前地址
    setClipboardData: function () {
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
                success: function (res) {
                    wx.showToast({
                        title: '复制成功',
                        icon: 'success'
                    });
                },
                fail: function (res) {
                    wx.showToast({
                        title: '复制失败',
                        icon: 'none'
                    });
                }
            })
        }
        else {
            wx.showToast({
                title: '复制失败',
                icon: 'none'
            });
        }

    },
    // 分享
    onShareAppMessage: function () {
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
            path: '/page/detail/index'
        };
    },
})
