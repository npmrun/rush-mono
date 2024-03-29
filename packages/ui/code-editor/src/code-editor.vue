
<script lang="ts" setup>
import { judgeFile } from "./util"
import { monaco } from "./monaco"
import { computed, getCurrentScope, onBeforeUnmount, onMounted, onScopeDispose, onUnmounted, ref, watch } from "vue";
import DefaultLogo from "./120x120.png"

const editorRef = ref<HTMLDivElement>()
let editor: monaco.editor.IStandaloneCodeEditor | null = null

const props = withDefaults(
    defineProps<{
        modelValue?: string
        name?: string
        logoType?: "bg" | "logo"
        logo?: string
    }>(),
    {
        logo: DefaultLogo,
        logoType: "logo",
        modelValue: "",
        name: "",
    },
)
const emit = defineEmits<{
    (e: "update:modelValue", code: string): void
}>()

defineExpose({
    setContent(content: string) {
        if (editorRef.value && editor) {
            editor.setValue(content)
        }
    }
})
function updateModel(name: string, content: string) {
    if (editor) {
        var oldModel = editor.getModel() //获取旧模型
        let file = judgeFile(name)
        let model: monaco.editor.ITextModel = monaco.editor.createModel(content ?? "", file?.language ?? "txt")
        if (oldModel) {
            oldModel.dispose()
        }
        editor.setModel(model)
    }
}
function resizeLayout() {
    if (editor) {
        editor.layout()
    }
}
onMounted(() => {
    if (editorRef.value && !editor) {
        editor = monaco.editor.create(editorRef.value, {
            theme: "vs-light",
            fontFamily: 'Cascadia Mono, Consolas, "Courier New", monospace',
        }) as monaco.editor.IStandaloneCodeEditor
        editor.onDidChangeModelContent(e => {
            if (editor) {
                let code = editor.getValue()
                emit("update:modelValue", code)
            }
        })
        editorRef.value.addEventListener('resize', resizeLayout)
    }
    watch(
        () => props.name,
        async (name) => {
            if (editor) {
                updateModel(name, props.modelValue)
            }
        },
        { immediate: true },
    )
})

onBeforeUnmount(() => {
    if (editorRef.value) {
        editorRef.value.removeEventListener('resize', resizeLayout)
    }
    if (editor) {
        var oldModel = editor.getModel()
        if (oldModel) {
            oldModel.dispose()
        }
        editor?.dispose()
        editor = null
    }
})
const style = computed(() => {
    if (props.logo && props.logoType === "bg") {
        return {
            backgroundImage: `url(${props.logo})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        }
    }
    return {}
})
function useResizeObserver(callback: ResizeObserverCallback,) {
    const isSupported = window && 'ResizeObserver' in window
    let observer: ResizeObserver | undefined
    const cleanup = () => {
        if (observer) {
            observer.disconnect()
            observer = undefined
        }
    }
    const stopWatch = watch(
        () => editorRef.value,
        (el) => {
            cleanup()
            if (isSupported && window && el) {
                observer = new ResizeObserver(callback)
                observer!.observe(el, {})
            }
        },
        { immediate: true }
    )

    const stop = () => {
        cleanup()
        stopWatch()
    }
    function tryOnScopeDispose(fn: () => void) {
        if (getCurrentScope()) {
            onScopeDispose(fn)
            return true
        }
        return false
    }
    tryOnScopeDispose(() => {
        stop()
    })
}

useResizeObserver(() => {
    if (editor) {
        editor.layout()
    }
})
</script>

<template>
    <div class="monaco-wrapper">
        <div class="monaco-editor" ref="editorRef"></div>
        <div class="monaco-bg" :style="style">
            <img v-if="logoType === 'logo' && logo" class="monaco-logo" :src="logo" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.monaco-wrapper {
    height: 100%;
    position: relative;

    .monaco-editor {
        height: 100%;
    }

    .monaco-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        opacity: .1;

        .monaco-logo {
            @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
        }
    }
}
</style>
