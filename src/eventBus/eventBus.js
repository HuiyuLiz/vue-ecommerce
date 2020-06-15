import Vue from 'vue'
export const EventBus = new Vue({
  data () {
    return {
    }
  },
  methods: {
    toastOpen (isSuccess, message, type) {
      isSuccess ? (type = 'success') : (type = 'error')
      this.$toasted.show(message, {
        theme: 'bubble',
        position: 'top-right',
        duration: 3500,
        type: type,
        action: {
          icon: 'close',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      })
    },
    onHandler (isSuccess, message, type) {
      this.$on('responseStatus', (isSuccess, message, type) => {
        this.toastOpen(isSuccess, message, type)
      })
    },
    emitHandler (isSuccess, res) {
      this.$emit('responseStatus', isSuccess, res)
    },
    offHandler () {
      this.$off('responseStatus')
    }
  }
})
