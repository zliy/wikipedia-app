
export default function (int) {
    const DAYINMS = 86400 * 1000
    let now = new Date()
    let today0clock = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()

    if (today0clock - int > DAYINMS * 3) {
        let intday = new Date(int)
        let index = (today0clock - int) / DAYINMS | 0 + 1
        return { readableTime: `${intday.getFullYear()}年${intday.getMonth() + 1}月${intday.getDate()}日`, index }
    }
    if (today0clock - int > DAYINMS * 2) {
        return { readableTime: '三天前', index: 3 }
    }
    if (today0clock - int > DAYINMS) {
        return { readableTime: '两天前', index: 2 }
    }
    if (today0clock - int > 0) {
        return { readableTime: '昨天', index: 1 }
    }
    return { readableTime: '今天', index: 0 }
}
