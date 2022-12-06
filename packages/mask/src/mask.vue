<template>
    <div
        class="rush-mask component"
        v-if="isRenderShow"
        v-show="isDisplayShow"
        @click.stop="clickMask"
    ></div> 
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const props = withDefaults(defineProps<{
    show?: boolean
    isRender?: boolean
}>(), {
    show: false,
    isRender: false
})
const isDisplayShow = computed(()=>{
    return !props.isRender ? props.show : true
})
const isRenderShow = computed(()=>{
    return props.isRender ? props.show && props.isRender : true
})

const emits = defineEmits<{
    (e: "update:show", isShow: boolean): void
}>()

function clickMask() {
    emits("update:show", false)
}
</script>

<style lang="less" scoped>
.rush-mask.component {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #00000062;
    z-index: 998;
}
</style>
