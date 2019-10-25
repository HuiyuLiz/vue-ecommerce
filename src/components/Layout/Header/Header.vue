<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="text-secondary" to="/">HOME</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                before-appear
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >購物頁面</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link
                  :to="{name:'shopping_List',params: { page: 1 }}"
                  class="dropdown-item"
                  href="#"
                >全部商品</router-link>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
          <div>
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <router-link :to="{name:'admin'}" class="nav-link" href="#">後臺管理</router-link>
              </li>
              <li class="nav-item active">
                <router-link :to="{name:'cart'}" class="nav-link" href="#">購物車</router-link>
              </li>
              <li class="nav-item active">
                <router-link class="nav-link" to="/login">登入</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Header"
};
</script>