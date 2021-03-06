import Vue from 'vue'

const toast = (opts) => {
  const popup = {
    position: 'top-end',
    toast: true,
    showConfirmButton: false,
    timer: 4000,
  }
  const message = Object.assign(popup, opts)
  Vue.swal(message)
}

const error = (err) => {
  if (err.response) {
    let msg = err.response.data.message
    toast({ icon: 'error', title: msg })
  } else {
    toast({ icon: 'error', title: err.toString() })
  }
}

const success = (msg) => {
  toast({ icon: 'success', title: msg })
}

export default {
  error,
  success,
}
