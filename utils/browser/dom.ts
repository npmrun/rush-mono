export const hasClass = function (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export const addClass = function (obj, cls) {
    if (!hasClass(obj, cls)) obj.className += ' ' + cls
}

export const removeClass = function (obj, cls) {
    if (hasClass(obj, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg, ' ')
    }
}

export const toggleClass = function (obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls)
    } else {
        addClass(obj, cls)
    }
}

export function setStyle(el: HTMLElement, css: Partial<CSSStyleDeclaration>) {
    for (const key in css) {
        if (Object.prototype.hasOwnProperty.call(css, key)) {
            const prop = css[key]
            el.style[key] = prop as string
        }
    }
}
