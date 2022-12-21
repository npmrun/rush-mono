<template>
    <div class="ps-tree component" :style="{backgroundColor: isDrag?bg:''}" @dragover.prevent="onDragover2"
        @dragleave.stop="onDragleave2" @drop.stop="onDrop2">
        <template v-for="(item, index) in sortedList" :key="item.key">
            <node @onDragstart="onDragstart" @expand="onExpand" @onDragover="onDragover" @onDragoverSelf="onDragoverSelf" @onDragend="onDragEnd" @onDrop="onDrop"
                :data-source-key="dataSourceKey" :data="item" :list="sortedList" :level="level"
                @click="(item) => clickNode(item)" :bg="bg">
                <template
                    #default="{ data, deep, dataSourceKey, status }: { data: INiuTreeData, deep: number, dataSourceKey?: INiuTreeKey, status?: ENiuTreeStatus }">
                    <slot :data="data" :deep="deep" :dataSourceKey="dataSourceKey" :status="status"></slot>
                </template>
            </node>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { provide, ref, renderSlot, useSlots, getCurrentInstance, watch } from "vue"
import node from './node.vue'
import type { INiuTreeData, INiuTreeKey } from './type'
import { ENiuTreeStatus } from './type'
import {
    findByKey,
    findByKeyParent,
    forEachTree,
    insertAfterByKey,
    insertBeforeByKey,
    isChild,
    isChildOf,
    removeByKey,
} from './util'

import { betterDirectorySort } from "./better-directory-sort"

const isDrag = ref(false)
function onDragover2() {
    if (!props.sort) return
    if (!dataSourceKey.value) return
    if (!isChild(dataSourceKey.value, props.list)) {
        isDrag.value = true
    }
}
function onDragleave2() {
    if (!props.sort) return
    isDrag.value = false
}
async function onDrop2() {
    emit("itemDrop")
    if (!props.sort) return
    if (!dataSourceKey.value) return
    if (!isDrag.value) return
    isDrag.value = false
    let data = findByKey(dataSourceKey.value, props.list)
    const sourceKey = dataSourceKey.value;
    dataSourceKey.value = undefined
    if (
        data
    ) {
        const isSuccess = (await props.dropFn?.(ENiuTreeStatus.DragIn, data, undefined))
        if (isSuccess == undefined || isSuccess) {
            removeByKey(sourceKey, props.list)
            props.list.push(data)
            emit("change")
        }

    }
}

const props = withDefaults(
    defineProps<{
        list: INiuTreeData[]
        justOpen?: boolean
        bg?: string
        autoExpand?: boolean
        justOpenOne?: boolean
        sort?: boolean
        level?: number
        dropFn?(status: ENiuTreeStatus, data: INiuTreeData, targetDataList?: INiuTreeData): boolean | Promise<boolean>
    }>(),
    {
        justOpenOne: false,
        justOpen: false,
        autoExpand: false,
        sort: false,
        level: 0,
        bg: '#cdcdcd6b',
    }
)
const slot = useSlots()

provide("tree:opts", props)
provide("tree:data", {
    parentKey: ref<INiuTreeKey>()
})

const sortedList = ref<INiuTreeData[]>([])
watch(()=>props.list, ()=>{
    if (props.sort) {
        sortedList.value = props.list.sort((a, b) => {
            return betterDirectorySort(
                { name: a.title, isDirectory: a.isFolder },
                { name: b.title, isDirectory: b.isFolder },
            );
        })
    }else{
        sortedList.value = props.list
    }
}, { deep: true, immediate: true })


function onExpand(item: INiuTreeData) {
    emit("expand", item)
}

function clickNode(item: INiuTreeData) {
    if (props.justOpenOne) {
        forEachTree(props.list, (node: INiuTreeData) => {
            node.isExpand = false
        })
    }
    if (item.isFolder) {
        item.isExpand = !item.isExpand
        emit("change")
    }

}

const emit = defineEmits<{
    (e: 'change'): void
    (e: 'expand', data: INiuTreeData): void
    (e: 'itemDragstart'): void
    (e: 'itemDragend'): void
    (e: 'itemDrop'): void
}>()

const dataSourceKey = ref()
function onDragstart(key: INiuTreeKey) {
    dataSourceKey.value = key
    emit("itemDragstart")
}
function onDragover(key: INiuTreeKey) {
    if (!props.sort) return
    if (!key) return
    let data = findByKey(key, props.list)
    if (isChild(key, props.list) && data && data.isFile) {
        isDrag.value = true
    }else{
        isDrag.value = false
    }
}
function onDragoverSelf() {
    isDrag.value = false
}
function onDragEnd(key: INiuTreeKey) {
    dataSourceKey.value = undefined
    isDrag.value = false
    emit("itemDragend")
}
async function onDrop(key: INiuTreeKey, status?: ENiuTreeStatus) {
    emit("itemDrop")
    if (!dataSourceKey.value) return
    if (!key) return
    let data = findByKey(dataSourceKey.value, props.list)
    let targetData = findByKey(key, props.list)
    const sourceKey = dataSourceKey.value;
    dataSourceKey.value = undefined
    isDrag.value = false
    switch (status) {
        case ENiuTreeStatus.DragInner: 
            const parentData = findByKeyParent(key, props.list)
            if (
                data &&
                targetData &&
                sourceKey != key &&
                !isChildOf(key, sourceKey, props.list)
            ) {
                const isSuccess = (await props.dropFn?.(status, data, parentData))
                if (isSuccess == undefined || isSuccess) {
                    removeByKey(sourceKey, props.list)
                    if(parentData && parentData.children){
                        parentData.children.push(data)
                        if (props.autoExpand) {
                            parentData.isExpand = true
                        }
                    }else{
                        props.list.push(data)
                    }
                    emit("change")
                }
            }
            break
        case ENiuTreeStatus.DragIn:
            if (
                data &&
                targetData &&
                sourceKey != key &&
                !isChildOf(key, sourceKey, props.list) &&
                targetData.children
            ) {
                const isSuccess = (await props.dropFn?.(status, data, targetData))
                if (isSuccess == undefined || isSuccess) {
                    removeByKey(sourceKey, props.list)
                    targetData.children.push(data)
                    if (props.autoExpand) {
                        targetData.isExpand = true
                    }
                    emit("change")
                }
            }
            break
        case ENiuTreeStatus.DragDown:
            // 按索引往列表添加节点
            if (
                data &&
                targetData &&
                sourceKey != key &&
                !isChildOf(key, sourceKey, props.list)
            ) {
                const isSuccess = (await props.dropFn?.(status, data, targetData))
                if (isSuccess == undefined || isSuccess) {
                    removeByKey(sourceKey, props.list)
                    insertAfterByKey(key, data, props.list)
                    emit("change")
                }
            }
            break
        case ENiuTreeStatus.DragUp:
            // 按索引往列表添加节点
            if (
                data &&
                targetData &&
                sourceKey != key &&
                !isChildOf(key, sourceKey, props.list)
            ) {
                const isSuccess = (await props.dropFn?.(status, data, targetData))
                if (isSuccess == undefined || isSuccess) {
                    removeByKey(sourceKey, props.list)
                    insertBeforeByKey(key, data, props.list)
                    emit("change")
                }
            }
            break
    }
}
</script>

