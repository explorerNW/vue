<script lang="ts">
    export default {
        async setup() {
            const res = await fetch('http://localhost:6173/question');        
            return {
                data: await res.json().then(answer => answer)
            }
        }
    }
</script>
<template>
    async component: {{ data }}
</template>
<style>

</style>