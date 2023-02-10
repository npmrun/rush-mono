//https://github.com/xiaogliu/pure-full-page/blob/master/src/js/pureFullPage.js
import { Scroll, throttle, debounce, touch, onresize } from "./util";

interface IConfig {
    el: string; //元素
    scrollCB(index: number): void;
}

export default class fullpage {
    private el: HTMLElement | null = null;
    private config: IConfig = { el: '', scrollCB: () => { } };
    private cb: Function = () => { };
    private indicatorElement: HTMLElement | null = null;

    private width: number = 0;
    private height: number = 0;
    private current: number = 0;
    private pages: number = 0;
    private debounceInit = debounce(this.init, this, 200);

    constructor(config: IConfig) {
        this.el = document.querySelector(config.el + '>.box');
        this.config = config;
        if (!this.el) {
            throw new Error("不存在该元素！");
            return;
        }
        this.cb = config.scrollCB;

        this.init();

        let tup = throttle(this.up, this, 500);
        let tdown = throttle(this.down, this, 500);
        Scroll(tup, tdown);
        touch(tup, tdown);

        onresize(this.debounceInit, this);
    }

    private initIndicator() {
        let config = this.config;
        this.indicatorElement = document.querySelector(config.el + "> .indicator");
        if (!this.indicatorElement) {
            return
        }
        let len = this.pages;
        this.indicatorElement.style.position = "absolute";
        this.indicatorElement.style.left = "0";
        this.indicatorElement.style.top = "0";
        for (let i = 0; i < len; i++) {
            let div = document.createElement("div");
            div.style.width = "50px";
            div.style.height = "50px";
            div.style.backgroundColor = "white";
            div.style.borderRadius = "50px";
            this.indicatorElement.appendChild(div);
        }
    }

    private init() {
        // this.current = -1;
        this.pages = 0;
        this.height = 0;
        this.width = 0;
        setTimeout(() => {
            document.body.style.overflow = "hidden";
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
            console.log(this.height);
            (<HTMLElement>this.el).style.height = this.height + "px";
            (<HTMLElement>this.el).style.transition = "transform .5s";
            let child = (<HTMLElement>this.el).querySelectorAll(".block");
            for (let i = 0; i < child.length; i++) {
                const element = child[i];
                (<HTMLElement>element).style.height = "100%";
                (<HTMLElement>element).style.width = "100%";
            }
            this.pages = child.length;
            this.initIndicator();
            (<HTMLElement>this.el).style.transform = `translateY(-${this.height * this.current
                }px)`;
            this.cb(this.current, this.current);

        }, 200);
    }

    private up(delta: number) {
        let last = this.current;
        let next = (this.current = this.current - 1);
        if (next >= this.pages) this.current = this.pages - 1;
        if (next < 0) this.current = 0;
        if (last != this.current) {
            (<HTMLElement>this.el).style.transform = `translateY(-${this.height * this.current
                }px)`;
            this.cb(this.current, last);
        }
    }

    private down(delta: number) {
        let last = this.current;
        let next = (this.current = this.current + 1);
        if (next >= this.pages) this.current = this.pages - 1;
        if (next < 0) this.current = 0;
        if (last != this.current) {
            (<HTMLElement>this.el).style.transform = `translateY(-${this.height * this.current
                }px)`;
            this.cb(this.current, last);
        }
    }
}
