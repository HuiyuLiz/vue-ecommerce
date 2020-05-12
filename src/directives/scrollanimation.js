const scrollObServer = new IntersectionObserver(
  (entries, animatedObServer) => {
    entries.forEach((entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('enter')
        animatedObServer.unobserve(entry.target)
      }
    }))

  }
)
export default {
  bind(el) {
    el.classList.add('before-enter')
    el.style.transitionDelay = el.dataset.delay
    scrollObServer.observe(el)
  }
}