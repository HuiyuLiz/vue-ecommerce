<template>
  <div>
    <nav
      class="navbar flex-md-nowrap layout-navbar d-flex justify-content-end bg-white"
      style="height: 66px;"
    >
      <ul class="navbar-nav px-4">
        <li class="nav-item text-nowrap text-secondary">
          <a
            class="nav-link d-flex align-items-center text-secondary font-weight-bold"
            href="#"
            @click="logout"
          >
            <i class="material-icons material-icons-middle text-secondary mr-2">person</i>登出
          </a>
        </li>
      </ul>
    </nav>
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard/Layout'
import { logout } from '@/api/api'
export default {
  name: 'Admin',
  components: {
    Dashboard
  },
  data () {
    return {

    }
  },
  methods: {
    logout () {
      logout().then(res => {
        if (res.data.success) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
