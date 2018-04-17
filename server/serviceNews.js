import service from "./service";
import { parseDate } from "../utils/parseDate";
const app = getApp();
const News = option => {
    return service({
        url: "https://api.readhub.me/topic",
        method: "GET",
        ...option
    })
        .then(data => {
            const news = data.data;
            if (typeof news == "object" || typeof news == "object") {
                news.forEach(item => {
                    if (
                        !app.globalData.dayObject[
                            new Date(item.publishDate).getDay()
                        ]
                    ) {
                        item.showDate = true;
                        app.globalData.dayObject[
                            new Date(item.publishDate).getDay()
                        ] = true;
                    }
                    const timeStemp = new Date(item.publishDate).getTime();
                    item.dateFormat = parseDate(timeStemp);

                    app.globalData.news.push(item);
                });
            } else {
                if (
                    !app.globalData.dayObject[
                        new Date(data.publishDate).getDay()
                    ]
                ) {
                    data.showDate = true;
                    app.globalData.dayObject[
                        new Date(data.publishDate).getDay()
                    ] = true;
                }
                const timeStemp = new Date(data.publishDate).getTime();
                data.dateFormat = parseDate(timeStemp);

                app.globalData.news.push(data);
            }
            console.log("app.globalData.news", app.globalData.news);
            wx.hideLoading();
        })
        .catch(error => {
            console.log("error", error);
        });
};
export default News;
