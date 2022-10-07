<template>
    <button :type="htmlType" :disabled="disabled" class="fe-button" :class="[computedClass]">
        <slot></slot>
    </button>
</template>
<script lang="ts" setup>
import { ButtonHTMLAttributes, computed } from 'vue';

const props = withDefaults(defineProps<{
    type?: "danger" | "primary" | "warning"
    ghost?: boolean
    htmlType?: ButtonHTMLAttributes["type"]
    disabled?: boolean
    loading?: boolean
    dashed?: boolean
}>(), {
    htmlType: "button",
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
</script>