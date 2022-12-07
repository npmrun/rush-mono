<template>
    <div class="flex h-500px">
        <div class="h-1/1 w-1/1 border border-red-200 relative">
            <RushAdjustLine></RushAdjustLine>
            <RushAdjustLine direction="bottom"></RushAdjustLine>
        </div>
        <!-- <div class="h-1/1 w-1/1 flex border border-red-200 relative">
            <div class="h-1/1 relative flex-1 w-0">
                llllllllllllllllllllleft
                <RushAdjustLine :target="nextContainer"></RushAdjustLine>
            </div>
            <div class="h-1/1 relative" ref="nextContainer">
                middle
            </div>
            <div class="h-1/1 relative">
                right
                <RushAdjustLine direction="left" :watch="nextContainer"></RushAdjustLine>
            </div>
        </div> -->
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
import RushAdjustLine from '@/index';
import { ref } from 'vue';
import { debounce } from "@utils/common"

const nextContainer = ref()

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