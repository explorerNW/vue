<script lang="ts">
    export default{

    }
</script>
<template>
    <div class="error-container">
        <span class="error">Error</span>
        <strong>This is an Error for Demo Purposes</strong>
        <slot></slot>
    </div>
</template>
<style>
    .error-container {
        display: flex;
        flex-direction: column;
    }
    .error {
        color:red;
        font-weight: bold;
        font-size: 2rem;
    }
</style>