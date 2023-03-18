import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { store } from './stores/counter'

import i18nPlugin from './plugins/i18n';

export const app = createApp(App)

app.directive('example', (el, binding) => {
    el.style.color = binding.value;
});

app.use(createPinia())
app.use(router);
app.use(store);

app.use(i18nPlugin, {
    greetings: {
        hello: 'Bonjour!'
    }
});

app.mount('#app')
