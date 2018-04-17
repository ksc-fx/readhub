const parseDate = date => {
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
};
module.exports = { parseDate };
