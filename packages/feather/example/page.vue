<template>
    <div class="border-b flex p-6px">
        <div v-for="name in keys" :key="name">
            <fe-button @click="(active = name) && $router.replace(`/${language}/${name}`)">{{ name }}
            </fe-button>
        </div>
    </div>
    <div class="flex flex-1">
        <div class="flex-1 p-12px border-r">
            <div v-if="activeComponet" class="border-b flex mb-12px pb-12px">
                <div v-for="demo in activeComponet.demos" :key="demo.name">
                    <fe-button
                        @click="(activeDemo = demo.name) && $router.replace(`/${language}/${active}/${demo.name}`)">{{
                                demo.name
                        }}</fe-button>
                </div>
            </div>
            <component v-if="activeDemo" :is="activeComponet?.demos[activeDemo]"></component>
        </div>
        <div class="flex-1 p-12px">
            <div v-if="activeComponet" class="border-b flex mb-12px pb-12px">
                <fe-button @click="(activeLanguage = 'zh') && $router.replace(`/zh/${active}/${activeDemo}`)">zh
                </fe-button>
                <fe-button @click="(activeLanguage = 'en') && $router.replace(`/en/${active}/${activeDemo}`)">en
                </fe-button>
            </div>
            <div class="markdown-body">
                <component :is="activeComponet?.[activeLanguage]"></component>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed, ref } from "vue";
import { components } from "./data"

const route = useRoute()
console.log(route.params);
console.log(route.params);

const compName = route.params!.comp as string
const demoName = route.params!.demo as string
const language = route.params!.language as 'zh' | 'en' ?? 'zh'

const active = ref(compName)
const activeDemo = ref<string>()
const activeLanguage = ref<'zh' | 'en'>(language)
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
    if (index != -1) {
        const one = components[index]
        if (demoName && one.demos[demoName]) {
            activeDemo.value = one.demos[demoName].name
        } else {
            if (Object.keys(one.demos).length) {
                let name = Object.keys(one.demos)[0]
                activeDemo.value = one.demos[name].name as string
            }
        }
        return one
    }
})
</script>