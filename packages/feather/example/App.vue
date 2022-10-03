<template>
    <div>
        <h2>
            {{ renderName }}
        </h2>
        <component :is="renderComponent">sad</component>
        <component :is="renderDemo"></component>
        <component :is="renderZhMD"></component>
        <component :is="renderEnMD"></component>
    </div>
</template>

<script lang="ts" setup>
import { components } from "./data"

const index = 0
let renderName = components[index].name
let renderComponent = components[index].component
let renderDemo = components[index].demos['basic']
let renderZhMD = components[index].zh
let renderEnMD = components[index].en
</script>