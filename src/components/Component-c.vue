<script lang="ts">
    export default {
        data() {
           return {
            count: 0
           }
        },
        props: {
            name: String
        },
        computed: {
           
        },
        methods: {
           countUp: function() {
            this.count++;
           },
           countDown: function() {
            this.count--;
            if (this.count < 0) {
                this.count = 0;
            }
           }
        }
    }
</script>
<template>
    <span>Component C</span>
    <button @click="countUp">+</button>{{ count }}<button @click="countDown">-</button>
</template>
<style></style>