<template>
    <div :class="[
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
</template>
<script lang="ts" setup>
import { isChildOf } from "./util";
import { ENiuTreeStatus, INiuTreeData, INiuTreeKey } from "./type";
const props = withDefaults(
    defineProps<{
        data: INiuTreeData
        list: INiuTreeData[]
        dataSourceKey?: INiuTreeKey
        status?: ENiuTreeStatus
    }>(),
    {},
)
</script>
