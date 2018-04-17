const service = options => {
    wx.showNavigationBarLoading();

    options = {
        method: "GET",
        dataType: "json",
        ...options
    };
    const result = new Promise(function(resolve, reject) {
        //做一些异步操作
        const optionsData = {
            success: res => {
                wx.hideNavigationBarLoading();

                resolve(res.data);
            },
            fail: error => {
                wx.hideNavigationBarLoading();

                reject(error);
            },
            ...options
        };
        wx.request(optionsData);
    });
    return result;
};

export default service;
