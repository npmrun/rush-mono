<template>
    <div
        class="rush-mask component"
        v-show="show"
        @click.stop="clickMask"
    ></div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    show?: boolean
}>(), {
    show: false
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
