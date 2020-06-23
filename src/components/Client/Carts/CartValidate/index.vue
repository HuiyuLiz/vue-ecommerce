<template>
  <div>
    <div class="h5 text-secondary mb-4 font-weight-bold title-border-decoration title-border-secondary pb-3">
      收件人資訊 <span class="text-danger"> (必填)</span>
    </div>
    <div class="form-group">
      <ValidateInput
        v-model="userForm.user.name"
        text="姓名"
        rules="required"
        class="classes"
        name="username"
        :show-label="true" />
    </div>
    <div class="form-group">
      <ValidateInput
        v-model="userForm.user.email"
        text="Email"
        rules="required|email"
        class="classes"
        name="email"
        :show-label="true" />
    </div>
    <div class="form-group">
      <ValidateInput
        v-model="userForm.user.tel"
        type="tel"
        text="手機號碼"
        rules="required|mobile"
        class="classes"
        name="mobile"
        :show-label="true" />
    </div>
    <div class="h5 text-secondary mt-5 mb-4 font-weight-bold title-border-decoration title-border-secondary pb-3">
      配送資訊<span class="text-danger"> (必填)</span>
    </div>
    <div class="form-group">
      <label
        for="useraddress"
        class="text-secondary">收件人地址</label>
      <div class="form-row justify-content-center">
        <div class="form-group col-md-3">
          <ValidationProvider
            v-slot="{ classes,errors }"
            name="country"
            rules="required">
            <select
              v-model="countryIndex"
              class="form-control   rounded-0 mb-2"
              :class="classes">
              <option
                :value="null"
                selected
                disabled
                class="form-control ">
                請選擇縣市
              </option>
              <option
                v-for="(country,cindex) in postal"
                :key="country.name"
                :value="cindex"
                class="form-control">
                {{ country.name }}
              </option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-3">
          <ValidationProvider
            v-slot="{ classes,errors }"
            name="zone"
            rules="required">
            <select
              v-model="areaIndex"
              class="form-control  rounded-0 mb-2"
              :class="classes">
              <option
                :value="null"
                selected
                disabled>
                請選擇鄉鎮市區
              </option>
              <option
                v-for="(area,aindex) in areas"
                :key="aindex"
                :value="aindex">
                {{ area.name }}
              </option>
            </select>
            <span
              v-if="errors[0]"
              class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-6">
          <ValidateInput
            v-model="userForm.user.address"
            text="地址"
            rules="required"
            class="classes"
            name="address"
            :show-label="false" />
        </div>
      </div>
    </div>
    <hr>
    <div class="form-group  rounded-0 mb-5">
      <label
        for="comment"
        class="h5 text-secondary mt-3 mb-4 font-weight-bold title-border-decoration title-border-secondary pb-3">留言 (選填)</label>
      <textarea
        id="comment"
        v-model="userForm.message"
        name
        class="form-control rounded-0 mt-1"
        cols="30"
        rows="5"
        placeholder="有什麼話想對我們說呢?" />
    </div>
  </div>
</template>

<script>
import ValidateInput from './ValidateInput'
export default {
  name: 'CartList',
  components: {
    ValidateInput
  },
  props: {
    userForm: {
      type: Object,
      required: true
    },
    index: {
      type: Object,
      required: true
    },
    areas: {
      type: Array,
      required: true
    },
    postal: {
      type: Array,
      required: true
    }
  },
  computed: {
    countryIndex: {
      get () {
        return this.index.country
      },
      set (val) {
        this.index.country = val
        this.index.area = null
        this.userForm.user.address = ''
      }
    },
    areaIndex: {
      get () {
        return this.index.area
      },
      set (val) {
        this.index.area = val
      }
    }
  }
}
</script>
<style>
</style>
