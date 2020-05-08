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
        username: '',
        password: ''
      },
      message:''
    };
  },
  methods: {
    login () {
      login(this.user).then(res => {
        if (res.data.success) {
          this.message = ''
          this.$router.push({ name: 'productList', params: { page: 1 } }).catch((error)=>{
            console.error(error)
          });
        }else{
           this.message = res.data.message+'，帳號或密碼錯誤，請重新輸入。'
        }
      });
    }
  }
};
</script>
<template src="./template.html"></template>