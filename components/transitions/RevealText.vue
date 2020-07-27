<template>
  <Transition
    :appear="appear"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    name="fade-translate"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'FadeTranslate',
  props: { appear: { type: Boolean, default: false } },
  data() {
    return {
      height: null
    }
  },
  methods: {
    beforeEnter(element) {
      gsap.set(element, {
        y: '80%',
        opacity: 0
      })
    },
    enter(element, done) {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0

      gsap.to(element, {
        duration: 1,
        height,
        y: '0%',
        opacity: 1,
        ease: 'expo',
        onComplete: () => {
          element.style.height = 'auto'
          done()
        }
      })
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.3,
        height: 0,
        opacity: 0,
        onComplete: done
      })
    }
  }
}
</script>

<style lang="scss"></style>
