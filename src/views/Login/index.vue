<template>
  <div class="container pt-3 pt-md-5 my-5 pb-5">
    <div class="row mb-5">
      <div class="col-md-6 m-auto ">
        <form
          class="form-signin text-center p-0"
          @submit.prevent="login">
          <h1 class="pb-4 mb-5 font-weight-bold h3 text-white text-left title-border-decoration title-border-white">
            會員登入
          </h1>
          <div class="text-white d-md-flex justify-content-start align-items-end mb-3 text-left">
            <div class="h5 mb-0 mr-2">
              Email Address / Account
            </div>
            <small>電子信箱 / 帳號</small>
          </div>
          <label
            for="inputEmail"
            class="sr-only">Email address</label>
          <input
            id="inputEmail"
            v-model="user.username"
            type="email"
            class="form-control form-control-lg rounded-0"
            placeholder="Email address"
            required
            autofocus>
          <div class="text-white d-flex align-items-end mt-3 mb-3">
            <div class="h5 mb-0 mr-2">
              Password
            </div>
            <small>會員密碼</small>
          </div>
          <label
            for="inputPassword"
            class="sr-only">Password</label>
          <input
            id="inputPassword"
            v-model="user.password"
            type="password"
            class="form-control form-control-lg rounded-0"
            placeholder="Password"
            required>

          <button
            class="btn btn-outline-light btn-block py-3 d-flex align-items-center justify-content-center mt-5 rounded-0"
            type="submit">
            登入
          </button>

          <p class="text-danger font-weight-bold my-3">
            {{ message }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/api'
import { EventBus } from '@/eventBus/eventBus'
import { setToken } from '@/utils/auth.js'
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  mounted () {
  },
  methods: {
    login () {
      login(this.user).then(res => {
        if (res.data.success) {
          this.message = ''
          let token = res.data.token
          let expired = res.data.expired
          setToken(token, new Date(expired))
          this.$store.commit('set_token', token)

          this.$router.push({ name: 'Admin' })
            .catch((error) => {
              if (error instanceof ReferenceError) {
                EventBus.emitHandler(false, '取得資料錯誤')
              }
            })
        } else {
          this.message = res.data.message + '，帳號或密碼錯誤，請重新輸入。'
        }
      })
    }
  }
}
</script>
