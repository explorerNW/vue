<template>
  <h1>{{ msg }}</h1>
  <p class="import-meta-url">{{ url }}</p>
  <CustomButton>CommonButton</CustomButton>
</template>

<script>
import CustomButton from '../components/button'

export default {
  async setup() {
    const url = import.meta.env.SSR
      ? import.meta.url
      : document.querySelector('.import-meta-url')?.textContent
    return {
      msg: 'About',
      url,
    }
  },
  components: {
    CustomButton,
  },
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
