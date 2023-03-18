<script lang="ts">
    export default{
        data() {
            return {
              // value: ''
            }
        },
        props: {
            modelValue: String
        },
        emits: ['update:modelValue'],
        computed: {
          value: {
            get(): string {
              return this.modelValue as string;
            },
            set(value: string) {
              this.$emit('update:modelValue', value);
            }
          }
        }
    }
</script>
<template>
    <div class="container">
      <label for="modelValue">modelValue-:value: <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as any).value)"/></label>
      <label for="modelValue">modelValue-v-model-computed: <input v-model="value"/></label>
    </div>
</template>
<style>
.container {
  display: flex;
  flex-direction: column;
}
</style>
