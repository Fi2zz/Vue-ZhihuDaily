

export  default function debounce(fn, delay) {
  let ctx;
  let args;
  let timer = null;

  let later = function () {
    fn.apply(ctx, args);
    // 当事件真正执行后，清空定时器
    timer = null;
    console.log(1)
  };
  return function () {
    ctx = this;
    args = arguments;
    // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 重新设置事件触发的定时器
    timer = setTimeout(later, delay);
  };
}