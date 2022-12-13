<template>
    <p>Times clicked: {{ count }}</p>
    <button @click="increment">increment</button>
</template>
  
<script lang="ts">
export default {
    name: 'Button',
    data: () => ({
        count: 0,
    }),
    methods: {
        increment () {
            this.count++
        },
    },
}
</script>