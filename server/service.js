const service = options => {
  options = {
    method: "GET",
    dataType: "json",
    ...options
  };
  const result = new Promise(function(resolve, reject) {
    //做一些异步操作
    const optionsData = {
      success: res => {
        resolve(res.data);
      },
      fail: error => {
        reject(error);
      },
      ...options
    };
    wx.request(optionsData);
  });
  return result;
};

export default service;
