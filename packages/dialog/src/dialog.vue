<template>
    <teleport :to="to" :disabled="disabled">
        <transition name="fade">
            <rush-mask is-render v-model:show="isShow"></rush-mask>
        </transition>
        <div class="niu-dialog__wrapper" v-if="isShowWraper" @click.stop="isShow = false">
            <transition name="slide-fade" @after-leave="close()">
                <div class="niu-dialog__content" v-if="isShow" @click.stop>
                    <slot></slot>
                </div> 
            </transition>
        </div>    
    </teleport>
</template>
 
<script lang="ts" setup>
import { onMounted, watch, ref, nextTick } from 'vue';
import RushMask from '@rush-ui/mask';
 
const props = withDefaults(defineProps<{
    to?: string
    disabled?: boolean
    show?: boolean
}>(), {
    to: 'body',
    disabled: false,
    show: false,
})
const emits = defineEmits<{
    (e: "update:show", isShow: boolean): void
}>()

onMounted(() => {
    watch(() => props.show, (isShow) => {
        if (isShow) {
            show()
        } else {
            hide()
        }
    }, {
        immediate: true
    })
})

const isShow = ref(false)
const isShowWraper = ref(false)

function show() {
    isShowWraper.value = true
    document.body.style.overflow="hidden"
    nextTick(()=>{
        isShow.value = true
    })
}

function hide() {
    isShow.value = false
    document.body.style.overflow=""
}

function close() {
    isShowWraper.value = false
    emits("update:show", false)
}
</script>

<style lang="less" scoped>
@import "./anim.less";

.niu-dialog__wrapper {
    position: absolute;
    inset: 0;
    z-index: 999;
    display: flex;

    .niu-dialog__content {
        margin: auto;
    }
}
</style>
