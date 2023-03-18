import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { createStore } from 'vuex';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
});

export const countStore = reactive({
  count: ref(0)
});

export const store = createStore({
  state() {
      return {
          count: 0
      }
  },
  mutations: {
      increament(state) {
          state.count++;
      },
      discreament(state) {
          state.count--;
      }
  }
});
