<template>
    <button type="button" @click="onClick" class="fe-button" :class="[computedClass]">
        <slot></slot>
    </button>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    type?: "danger" | "primary" | "warning"
    ghost?: boolean
}>(), {
    ghost: false
})

const computedClass = computed(() => {
    const result = []
    if (props.type) result.push(`fe-button--${props.type}`);
    if (props.ghost) result.push(`fe-button--ghost`);
    return result
})

function onClick() {
    console.log(111);
    
}
</script>