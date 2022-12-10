<template>
    <div class="fe-input">
        <div class="fe-input__warpper">
            <input @focus="handleFocus" @blur="handleBlur" spellcheck="false" class="fe-input__inner" value="sasa"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const isFocus = ref(false)
function handleFocus(e: FocusEvent) {
    isFocus.value = true
}
function handleBlur(e: Event) {
    isFocus.value = false
}

const computedClass = computed(()=>{
    return {
        "":""
    }
})

</script>

