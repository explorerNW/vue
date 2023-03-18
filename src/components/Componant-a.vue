<script lang="ts">
    import { countStore } from '../stores/counter';
    import { store } from '../stores/counter';
    export default {
        data() {
            return {
                countStore,
                store
            }
        },
        mounted() {
            
        },
        inheritAttrs: false,
        props: {
            step: Number
        },
        methods: {
            log(obj: Object) {
                console.log(obj);
            },
            countUp() {
                this.countStore.count++;
                this.store.commit('increament');
            }
        }
    }
</script>
<template>
    <span>Component A</span>

    {{ log($attrs) }}
    {{ $attrs }}
    <span v-bind="$attrs">component-a</span>

    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    <span>step: {{ step }}</span>
    <button @click="countUp">countStore++</button>
</template>
<style></style>