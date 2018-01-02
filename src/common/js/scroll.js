export function scroll(disTop, speed) {
  // chrome
  let d = document.body
  // firefox
  let f = document.documentElement
  let timer
  timer = setInterval(function () {
    d.scrollTop -= Math.ceil(d.scrollTop * 0.1)
    f.scrollTop -= Math.ceil(f.scrollTop * 0.1)
    if (d.scrollTop == disTop && f.scrollTop == disTop) clearInterval(timer)
  }, speed)
}
