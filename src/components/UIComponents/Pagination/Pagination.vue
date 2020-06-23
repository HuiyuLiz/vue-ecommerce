<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination d-flex justify-content-center justify-content-md-end">
      <li
        class="page-item"
        :class="{'disabled not-allowed':!pagination.has_pre}">
        <a
          class="page-link px-3"
          href="#"
          aria-label="Previous"
          :class="{'disabled not-allowed':!pagination.has_pre}"
          @click="getPage(pagination.current_page - 1) ">
          <span
            aria-hidden="true"
            :class="{'text-secondary':!pagination.has_next}">
            <span class="material-icons material-icons-middle pt-1">chevron_left</span>
          </span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        v-for="page in pagination.total_pages"
        :key="page"
        class="page-item"
        :class="{active:pagination.current_page===page}"
        @click="getPage(page)">
        <a
          class="page-link px-3"
          href="#">{{ page }}</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled not-allowed':!pagination.has_next}">
        <a
          class="page-link px-3 align-middle"
          href="#"
          aria-label="Next"
          :class="{'disabled not-allowed':pagination.has_next}"
          @click="getPage(pagination.current_page + 1)">
          <span aria-hidden="true">
            <span class="material-icons material-icons-middle pt-1">chevron_right</span>
          </span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPage (page) {
      this.$emit('getPage', page)
    }
  }
}
</script>
