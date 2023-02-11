import { Scroll, throttle, debounce, judge, onresize } from "./util";

interface IOptions {
    el: string | null;
    callback: (current: number, number: number) => void;
}

function $(selector: string): HTMLElement {
  return <HTMLElement>document.querySelector(selector);
}
function setStyle<T extends any>(element: HTMLElement, style: T): void {
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const prop = style[key];
      // @ts-ignore
      element.style[key] = prop;
    }
  }
}   
 
export default class FullPage {
  private options: IOptions = { el: null,callback:()=>void(0) };
  private el: HTMLElement;
  private elBlock: NodeListOf<HTMLElement>;

  private width: number = 0;
  private height: number = 0;
  private current: number = 0;
  private pages: number = 0; 
  private debounceInit = debounce(this.init, this, 200);

  constructor(options: IOptions) {
    Object.keys(options).forEach((option) => {
      if (this.options.hasOwnProperty(option)) {
        // @ts-ignore
        this.options[option] = options[option];
      }
    });
    if (this.options.el === null) {
      throw new Error("没有匹配到元素");
      return;
    }
    this.el = $(this.options.el+' .box');
    this.elBlock = $(this.options.el).querySelectorAll(".block");

    this.init();

    let tup = throttle(this.up, this, 500);
    let tdown = throttle(this.down, this, 500);
    Scroll(tup, tdown);
    judge(tup, tdown);

    onresize(this.debounceInit, this);
  }
  private init() {
    this.pages = 0;
    this.height = 0;
    this.width = 0; 
    setStyle(document.body,{overflow: 'hidden'});
      
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    setStyle(this.el,{height: this.height + "px"});
    setStyle(this.el,{transition: "transform .5s"});

    let child = this.elBlock;
    for (let i = 0; i < child.length; i++) {
      const element = child[i];
      setStyle(element,{height: "100%"});
      setStyle(element,{width: "100%"});
    }
    this.pages = child.length;
    setStyle(this.el,{transform: `translateY(-${
      this.height * this.current
    }px)`});
    this.options.callback(this.current,this.current);
  }

  private up() {
    let last = this.current;
    let next = (this.current = this.current - 1);
    if (next >= this.pages) this.current = this.pages - 1;
    if (next < 0) this.current = 0;
    if (last != this.current) {
      setStyle(this.el,{transform: `translateY(-${
        this.height * this.current
      }px)`});
      this.options.callback(this.current, last);
    }
  }

  private down() {
    let last = this.current;
    let next = (this.current = this.current + 1);
    if (next >= this.pages) this.current = this.pages - 1;
    if (next < 0) this.current = 0;
    if (last != this.current) {
      setStyle(this.el,{transform: `translateY(-${
        this.height * this.current
      }px)`});
      this.options.callback(this.current, last);
    }
  }
}
