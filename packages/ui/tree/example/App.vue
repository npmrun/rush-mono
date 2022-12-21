<template>
    <div class="h-500px w-500px mx-auto">
        <rush-tree :list="list">
            <template #default="{ data, deep }">
                <div :style="{
                    marginLeft: deep * 10 + 'px',
                    'position': 'relative',
                    zIndex: 10
                }">
                    {{ data.isFolder }}-{{ data.title }} 11-22 {{ deep * 10 + 'px' }}
                </div>
            </template>
        </rush-tree>
        <div class="bg-red-100 h-20px"></div>
        <rush-tree bg="#cdcdcd6b" sort @expand="onExpand" :list="list2" auto-expand>
            <template #default="{ data, deep }">
                <div :style="{
                    marginLeft: deep * 10 + 'px',
                    'position': 'relative',
                    zIndex: 10
                }">
                    {{ data.isFolder }}-{{ data.title }} 11-22 {{ deep * 10 + 'px' }}
                </div>
            </template>
        </rush-tree>
    </div>
</template>

<style>
html,
body,
#app {
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>

<script lang="ts" setup>
import RushTree from "@/index"
import { ref, useSlots } from "vue"
import { convert, convertTreeData, ENiuTreeStatus, INiuTreeData } from "@/index"

const list = ref(convertTreeData([
    {
        key: 1,
        title: "aaa",
        children: [
            {
                key: 5,
                title: "5文件夹",
                children: [
                    {
                        key: 2,
                        title: "ccc"
                    },
                    {
                        key: 3,
                        title: "bbb"
                    },
                ]
            },
        ]
    },
    {
        key: 6,
        title: "basdbb"
    },
]))
const list2 = ref(convertTreeData([
    {
        key: 1,
        title: "aaa",
        children: [
            {
                key: 5,
                title: "5文件夹",
                children: [
                    {
                        key: 2,
                        title: "ccc"
                    },
                    {
                        key: 3,
                        title: "bbb"
                    },
                ]
            },
        ]
    },
    {
        key: 6,
        title: "basdbb"
    },
]))
function add() {
    list2.value?.push(
        convert({
            key: "2222222",
            title: "",
            isNew: true,
            isEdit: true,
        }),
    )
}
function addF() {
    list2.value?.push(
        convert({
            key: "3333333",
            title: "",
            isNew: true,
            isEdit: true,
            children: [],
        }),
    )
}
function onExpand(node: INiuTreeData) {
    console.log(node);

}

const dropFn = (status: ENiuTreeStatus, data: INiuTreeData<any>, list: INiuTreeData<any>[]): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 2000);
    })
}
</script>