<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">電商後臺管理</a>
      <ul class="navbar-nav px-4">
        <li class="nav-item text-nowrap">
          <a class="nav-link d-flex align-items-center" href="#" @click="logout">
            <i class="material-icons mr-2">person</i>登出
          </a>
        </li>
      </ul>
    </nav>
    <Dashboard></Dashboard>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Layout/Dashboard/Dashboard';
import { logout } from '@/api/api';
export default {
  name: 'admin',
  components: {
    Dashboard
  },
  computed: {

  },
  watch: {
  },
  methods: {
    logout () {
      logout().then(res => {
        if (res.data.success) {
          this.$router.push('/login');          
        }
      });
    },
  },
};
</script>
