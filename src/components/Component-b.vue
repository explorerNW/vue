<script lang="ts">
    import { countStore, store } from '../stores/counter';
    export default {
        data() {
            return {
                countStore,
                store
            }
        },
        props: {
            name: String
        },
        methods: {
            countDown() {
                this.countStore.count--;
                this.store.commit('discreament');
            }
        }
    }
</script>
<template>
    <span>Component B - {{ name }}</span>
    <button @click="countDown">countStore--</button>
</template>
<style></style>