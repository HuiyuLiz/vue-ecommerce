<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-end">
      <li class="page-item" :class="{'disabled':!pagination.has_pre}">
        <a
          class="page-link px-3"
          href="#"
          aria-label="Previous"
          @click="getPage(pagination.current_page - 1) "
          :class="{'disabled':!pagination.has_pre}"
        >
          <span aria-hidden="true" :class="{'text-secondary':!pagination.has_next}">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{active:pagination.current_page===page}"
        @click="getPage(page)"
      >
        <a class="page-link px-3" href="#">{{page}}</a>
      </li>
      <li class="page-item" :class="{'disabled':!pagination.has_next}">
        <a
          class="page-link px-3"
          href="#"
          aria-label="Next"
          :class="{'disabled':pagination.has_next}"
          @click="getPage(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPage(page) {
      this.$emit("getPage", page);
    }
  }
};
</script>

<style lang="scss">
.page-link:focus {
  z-index: 2;
  outline: 0;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
</style>
