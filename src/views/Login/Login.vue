<script>
import { login } from "@/api/api";
import Header from "@/components/Layout/Header/Header";
export default {
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      login(this.user).then(res => {
        if (res.data.success) {
          this.$router.push({ name: "productList", params: { page: 1 } });
        }
      });
    }
  }
};
</script>
<template src="./template.html"></template>