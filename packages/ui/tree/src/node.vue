<template>
    <div class="ps-tree-node component" :class="[{ draging: status === ENiuTreeStatus.DragIng }]">
        <div class="ps-tree-node-wrapper" ref="nodeEL" :draggable="draggable" @dragstart.stop="onDragstart"
            @dragend.stop="onDragend" @drop.stop="onDrop" @dragover.stop="onDragover" @dragleave.stop="onDragleave"
            @click.stop="emit('click', data)">
            <slot :data="data" :deep="level" :dataSourceKey="dataSourceKey" :status="status">
                <div :style="{
                    marginLeft: level * 10 + 'px',
                    'position': 'relative',
                    zIndex: 10
                }">
                    {{ data.title }} - {{ level * 10 + 'px' }}
                </div>
            </slot>
            <div v-if="!opts.sort" :style="{ marginLeft: level * 10 + 'px', backgroundColor: (dataSourceKey != data.key &&
                        dataSourceKey != undefined &&
                        !isChildOf(data.key, dataSourceKey, list) &&
                        status!=undefined)?bg:'' }" :class="[
                {
                    'ps-tree-drag-up':
                        dataSourceKey != data.key &&
                        dataSourceKey != undefined &&
                        !isChildOf(data.key, dataSourceKey, list) &&
                        status === ENiuTreeStatus.DragUp,
                    'ps-tree-drag-in':
                        dataSourceKey != data.key &&
                        dataSourceKey &&
                        !isChildOf(data.key, dataSourceKey, list) &&
                        status === ENiuTreeStatus.DragIn,
                    'ps-tree-drag-down':
                        dataSourceKey != data.key &&
                        dataSourceKey &&
                        !isChildOf(data.key, dataSourceKey, list) &&
                        status === ENiuTreeStatus.DragDown,
                },
            ]"></div>
        </div>
        <div v-if="opts.sort && dda?.parentKey.value == data.key" :style="{ marginLeft: level * 10 + 'px',backgroundColor: bg+' !important' }"
            class="ps-tree-drag-in"></div>
        <div class="ps-tree-sub-node" v-if="(opts.justOpen || data.isExpand) && data.children && data.children.length">
            <template v-for="(item, index) in sortedList" :key="item.key">
                <node :bg="bg" @onDragstart="(e: INiuTreeKey) => emit('onDragstart', e)"
                    @onDragend="(e: INiuTreeKey) => emit('onDragend', e)"
                    @onDrop="(e: INiuTreeKey, s?: ENiuTreeStatus) => emit('onDrop', e, s)"
                    @onDragover="(e: INiuTreeKey) => emit('onDragover', e)"
                    @onDragoverSelf="() => emit('onDragoverSelf')"
                    @onDragleave="(e: INiuTreeKey) => emit('onDragleave', e)"
                    @expand="(e: INiuTreeData) => emit('expand', e)" @click="(e: INiuTreeData) => emit('click', e)"
                    :data-source-key="dataSourceKey" :data="item" :list="list" :level="level + 1">
                    <!-- <template #default="{data, deep, dataSourceKey, status}: {data: INiuTreeData, deep: number, dataSourceKey:INiuTreeKey, status:ENiuTreeStatus}"> -->
                    <template #default="fuck">
                        <aa v-bind="fuck"></aa>
                        <!-- <renderNode :data="fuck" :slots="$slots"></renderNode> -->
                        <!-- <slot :data="data" :deep="deep" :dataSourceKey="dataSourceKey" :status="status"></slot> -->
                    </template>
                </node>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import node from './node.vue'
import { inject, ref, provide, renderSlot, useSlots, watch, readonly, computed, Ref } from 'vue'
import { findByKeyParent, isChildOf } from './util'
import renderNode from './renderNode'
import type { INiuTreeData, INiuTreeKey } from './type'
import { ENiuTreeStatus } from './type';
import { betterDirectorySort } from "./better-directory-sort"

const sortedList = computed(() => {
    if (opts.sort) {
        return props.data.children?.sort((a, b) => {
            return betterDirectorySort(
                { name: a.title, isDirectory: a.isFolder },
                { name: b.title, isDirectory: b.isFolder },
            );
        });
    }
    return props.data.children
})


const props = withDefaults(
    defineProps<{
        data: INiuTreeData
        bg: string
        list: INiuTreeData[]
        dataSourceKey?: INiuTreeKey
        level?: number
    }>(),
    {
        level: 0,
    }
)

const parentLevel = computed(() => {
    let level = props.level - 1
    return level >= 0 ? level : 0
})

const slots = useSlots()
const aa = (fuck: any) => renderSlot(slots, "default", fuck)

watch(() => props.data.isExpand, () => {
    emit("expand", props.data)
})
const dda = inject("tree:data") as {
    parentKey: Ref<INiuTreeKey | undefined>
}
const opts = inject("tree:opts", {
    justOpen: false,
    sort: false,
})
const emit = defineEmits<{
    (e: 'click', data: INiuTreeData): void
    (e: 'expand', data: INiuTreeData): void
    (e: 'onDragstart', key: INiuTreeKey): void
    (e: 'onDragend', key: INiuTreeKey): void
    (e: 'onDrop', key: INiuTreeKey, status?: ENiuTreeStatus): void
    (e: 'onDragover', key: INiuTreeKey): void
    (e: 'onDragoverSelf'): void
    (e: 'onDragleave', key: INiuTreeKey): void
}>()
const draggable = ref(true)
const status = ref<ENiuTreeStatus>()
const nodeEL = ref<HTMLDivElement>()
provide("draggable", draggable)
function onDragstart(event: DragEvent) {
    dda.parentKey.value = undefined
    // 开始拖拽
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        if (nodeEL.value) {
            let clone = nodeEL.value.cloneNode(true) as HTMLDivElement
            clone.id = 'dragging_node'
            clone.style.display = 'inline-block'
            clone.style.position = 'absolute'
            clone.style.zIndex = '100000'
            clone.style.width = '100px'
            clone.style.top = '-100000px'
            document.body.append(clone)
            event.dataTransfer.setDragImage(clone, -4, -4)
        }
        emit('onDragstart', props.data.key)
        status.value = ENiuTreeStatus.DragIng
    }
}
function onDragend() {
    dda.parentKey.value = undefined
    // 结束拖拽
    let clone = document.getElementById('dragging_node')
    clone?.remove()
    status.value = undefined
    emit('onDragend', props.data.key)
}
function onDrop(e: DragEvent) {
    dda.parentKey.value = undefined
    e.preventDefault()
    emit('onDrop', props.data.key, status.value)
    status.value = undefined
}

function onDragover(event: DragEvent) {
    event.preventDefault()
    if (!props.dataSourceKey) return
    emit('onDragoverSelf')
    if (props.dataSourceKey === props.data.key) return
    if (
        props.dataSourceKey &&
        isChildOf(props.data.key, props.dataSourceKey, props.list)
    )
        return
    const y = event.offsetY
    const h = (event.currentTarget as HTMLDivElement).offsetHeight
    let activeKey = undefined
    if (!opts.sort) {
        if (y < h / 3) {
            status.value = ENiuTreeStatus.DragUp
        } else if (y <= (h * 2) / 3 && y >= h / 3 && props.data.children) {
            status.value = ENiuTreeStatus.DragIn
        } else if (y > (h * 2) / 3) {
            status.value = ENiuTreeStatus.DragDown
        } else {
            status.value = undefined
        }
    } else {
        const parentSource = findByKeyParent(props.dataSourceKey, props.list)
        const parentData = findByKeyParent(props.data.key, props.list)
        if (props.data.children) {
            status.value = ENiuTreeStatus.DragIn
            activeKey = props.data.key
        } else if (!props.data.children && opts.sort) {
            if (parentSource && parentData && parentSource.key !== parentData.key) {
                activeKey = parentData.key
                status.value = ENiuTreeStatus.DragInner
            } else if (parentSource != parentData) {
                if (parentData) {
                    activeKey = parentData.key
                }
                status.value = ENiuTreeStatus.DragInner
            }
        }
        dda.parentKey.value = activeKey
    }
    emit('onDragover', props.data.key)
}
function onDragleave() {
    dda.parentKey.value = undefined
    if (!props.dataSourceKey) return
    if (props.dataSourceKey === props.data.key) return
    if (
        props.dataSourceKey &&
        isChildOf(props.data.key, props.dataSourceKey, props.list)
    )
        return

    // 拖拽离开元素上
    status.value = undefined
    emit('onDragleave', props.data.key)
}
</script>
