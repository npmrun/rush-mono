import * as Dom from "../dom"

describe("DOM测试", function () {
    it('添加 class', () => {
        const el = document.createElement("div")
        Dom.addClass(el, "aaa")
        expect(el.classList.contains("aaa")).toBeTruthy()
        expect(el.classList.length).toBe(1)
    });
    it('移除 class', () => {
        const el = document.createElement("div")
        el.classList.add("bbb")
        Dom.removeClass(el, "bbb")
        expect(el.classList.contains("bbb")).toBeFalsy()
        expect(el.classList.length).toBe(0)
    });

    it('是否包含 class', () => {
        const el = document.createElement("div")
        el.classList.add("aaa")
        expect(Dom.hasClass(el, "aaa")).toBeTruthy()
        expect(Dom.hasClass(el, "vvv")).toBeFalsy()
        expect(el.classList.length).toBe(1)
    });
})