/**
 * 防抖
 */
export function debounce<T extends any[], R = void>(
    fn: (...argu: T) => R,
    duration: number
) {
    let timer: ReturnType<typeof setTimeout> | void
    return function f(this: void, ...argu: T) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = undefined
            fn.apply(this, argu)
        }, duration)
    }
}

/**
 * 节流
 */
export function throttle<T extends any[], R = void>(
    fn: (...argu: T) => R,
    interval: number
) {
    let last
    let timer: ReturnType<typeof setInterval> | void
    return function (...argu: T) {
        const now = +new Date()
        if (last && now - last < interval) {
            clearTimeout(last)
            timer = setTimeout(function () {
                last = now
                fn.apply(this, argu)
            }, interval)
        } else {
            last = now
            fn.apply(this, argu)
        }
    }
}
