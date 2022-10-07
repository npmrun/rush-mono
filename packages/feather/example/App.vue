<template>
    <div class="flex flex-col h-1/1">
        <div class="border-b flex p-6px">
            <div v-for="name in keys" :key="name">
                <fe-button @click="active = name">{{name}}</fe-button>
            </div>
        </div>
        <div class="flex flex-1">
            <div class="flex-1 p-12px border-r">
                <div v-if="activeComponet" class="border-b flex mb-12px pb-12px">
                    <div v-for="demo in activeComponet.demos" :key="demo.name">
                        <fe-button @click="activeDemo = demo.name">{{demo.name}}</fe-button>
                    </div>
                </div>
                <component v-if="activeDemo" :is="activeComponet?.demos[activeDemo]"></component>
            </div>
            <div class="flex-1 p-12px">
                <div v-if="activeComponet" class="border-b flex mb-12px pb-12px">
                    <fe-button @click="activeLanguage = 'zh'">zh</fe-button>
                    <fe-button @click="activeLanguage = 'en'">en</fe-button>
                </div>
                <div class="markdown-body">
                    <component :is="activeComponet?.[activeLanguage]"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
html,
body,
#app {
    height: 100%;
}
</style>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { components } from "./data"

const active = ref(components[0].name)
const activeDemo = ref<string>()
const activeLanguage = ref<'zh'|'en'>('zh')
const keys = computed(() => {
    return components.map((v) => v.name)
})
const activeComponet = computed(() => {
    let index = -1
    for (let i = 0; i < components.length; i++) {
        const element = components[i];
        if (element.name === active.value) {
            index = i
        }
    }
    if (index != 1) {
        const one = components[index]
        console.log(one.demos);
        if(Object.keys(one.demos).length){
            let name = Object.keys(one.demos)[0]
            activeDemo.value = one.demos[name].name as string
        }
        return one
    }
})
// let renderName = components[index].name
// let renderComponent = components[index].component
// let renderDemo = components[index].demos['basic']
// let renderZhMD = components[index].zh
// let renderEnMD = components[index].en
</script>