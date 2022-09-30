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

let renderName = components[0].name
let renderComponent = components[0].component
let renderDemo = components[0].demos['basic']
let renderZhMD = components[0].zh
let renderEnMD = components[0].en

</script>