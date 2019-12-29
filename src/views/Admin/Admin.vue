<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">電商後臺管理</a>
      <!-- <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />-->
      <ul class="navbar-nav px-4">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click="logout">
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
  name: 'home',
  components: {
    Dashboard
  },
  methods: {
    logout() {
      logout().then(res => {
        if (res.data.success) {
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>
