export function setTitle(title) {
    if (typeof title === "string")
        if (title !== "")
            document.title = title + "-汉化工房九九组";
        else
            document.title = "汉化工房九九组"
}

export function timelapse(stamp) {
    if (typeof stamp !== "number") return "";
    var create_time = new Date(stamp * 1000);
    var current_time = new Date().getTime();
    var lapse =  current_time - create_time;
    function ms2string(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        s = (s - mins) / 60;
        var hrs = s % 24;
        var dys = (s - hrs) / 24;
        return (dys !== 0?(dys+'天'):"") + (hrs !== 0 || dys !== 0?(("0"+hrs).slice(-2)+'小时'):"") +
            (mins !== 0 || hrs !== 0 || dys !== 0 ?(("0"+mins).slice(-2)+'分钟'):"") + ("0"+secs).slice(-2) +'秒';
    }
    return ms2string(lapse);
}


export function localtime(stamp) {
    if (typeof stamp !== "number") return "";
    let time = new Date(stamp * 1000);
    return time.getFullYear() + "年" + (time.getMonth()+1) + "月" + time.getDate() + "日";
}

export function localtime_exact(stamp) {
    if (typeof stamp !== "number") return "";
    let time = new Date(stamp * 1000);
    return time.getFullYear() + "年" + (time.getMonth()+1) + "月" + time.getDate() + "日 " +
        ("0"+time.getHours()).slice(-2) + ":" + ("0"+time.getMinutes()).slice(-2);
}