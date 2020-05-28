<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ classes , errors }">
    <label :for="name" :class="{'d-none':!showLabel}" class="text-secondary">{{text}}</label>
    <input
      :type="type"
      class="form-control rounded-0 mb-2"
      :class="classes"
      :name="name"
      :id="name"
      :placeholder="'請輸入'+text"
      v-model="observeValue"
    />
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name:'ValidateInput',
  props:{
    type:{
      type:String,
      default:'text'
    },
    value:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    text:{
      type:String,
      required:true
    },
    showLabel:{
      type:Boolean,
      default:false
    },
    rules:{
      type:String,
      required:true
    }
  }, 
  computed: {
    observeValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }

}
</script>

<style>
</style>