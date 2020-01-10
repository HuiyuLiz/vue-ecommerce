<script>
import { login } from '@/api/api';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
export default {
  name: 'Login',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      user: {
        username: "",
        password: ''
      }
    };
  },
  methods: {
    login () {
      login(this.user).then(res => {
        if (res.data.success) {
          this.$router.push({ name: 'productList', params: { page: 1 } }).catch((error)=>{
            console.error(error)
          });
        }
      });
    }
  }
};
</script>
<template src="./template.html"></template>