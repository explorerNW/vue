import { defineAsyncComponent } from 'vue';

export const AsyncComponent = defineAsyncComponent(()=>import('./components/Componant-a.vue'));