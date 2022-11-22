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

const show = ref(false)
</script>