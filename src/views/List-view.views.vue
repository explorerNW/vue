<script lang="ts">
    export default {
        data() {
           return {

           };
        },
        props: ['list'],
        emits: ['send']
    }
</script>
<template>
    <span class="item" v-memo="[index === 2]" v-once v-for="(item, index) of list" :key="item.id" @click="$emit('send', $event, item)">{{ item.name }}</span>
</template>
<style>
    .item {
        cursor: pointer;
    }
</style>