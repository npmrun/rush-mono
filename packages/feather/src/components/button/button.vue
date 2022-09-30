<template>
    <button type="button" :disabled="disabled" @click="onClick" class="fe-button" :class="[computedClass]">
        <slot></slot>
    </button>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    type?: "danger" | "primary" | "warning"
    ghost?: boolean
    disabled?: boolean
    loading?: boolean
    dashed?: boolean
}>(), {
    ghost: false,
    disabled: false
})

const computedClass = computed(() => {
    const result = []
    if (props.type) result.push(`fe-button--${props.type}`);
    if (props.ghost) result.push(`fe-button--ghost`);
    if (props.disabled) result.push(`fe-button--disabled`);
    if (props.loading) result.push(`fe-button--loading`);
    if (props.dashed) result.push(`fe-button--dashed`);
    return result
})

function onClick() {
    console.log(111);
    
}
</script>