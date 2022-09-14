<template>
    <button class="fe-button" :class="[computedClass]">
        <slot></slot>
    </button>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    type?: "danger"
}>(), {})

const computedClass = computed(() => {
    const result = []
    if (props.type) result.push(`fe-button--${props.type}`);
    return result
})
</script>