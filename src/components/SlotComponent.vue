<script lang="ts">
    export default {
        data() {
            return {
                data: []
            }
        }
    }
</script>
<template>
    <span>slot: </span>
    <slot name="content" :title="'content'" :componentName="'ComponentB'"></slot>
</template>
<style lang="scss">

</style>