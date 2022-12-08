<template>
    <div class="flex">
        <div @click="show = !show">open</div>
        <RushDialog v-model:show="show">
            <div style="background-color: white;">
                sada
            </div>
        </RushDialog>
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
import RushDialog from '@/index';
import { ref } from 'vue';
import { debounce } from "@utils/common"

const a = debounce((a,b,c)=>{
    console.log(a,b,c);
    console.log(this);
}, 200)
const bb = {
    a
}
bb.a(1,2,3)
bb.a(1,2,3)
bb.a(1,2,3)
bb.a(1,2,3)


const show = ref(false)
</script>