
<script setup>
import { computed, ref } from 'vue';
import { data } from './tags.data.js';

const { tagMap, postMap } = data;
const tags = Object.keys(tagMap);
const currentTag = ref(null);

const postList = computed(() => currentTag.value ? tagMap[currentTag.value].map(url => postMap[url]) : []);
function onTagClick(tag) {
currentTag.value = tag;
}
</script>
<style>

</style>

<template>
<div>
    <div class="tags">
        <span v-for="tag in tags" :key="tag" @click="onTagClick(tag)" style="padding: 2px">
        <button class="" :style='{"border":"solid 1px var(--c-bdr)", "box-sizing": "border-box"}'>{{ tag }}({{ tagMap[tag].length }})</button>
        </span>
    </div>
    <div v-if="currentTag">
        <h2>{{ currentTag }}</h2>
        <ul>
        <li v-for="post in postList" :key="post.url">
        <a :href="'/'+post.url">{{ post.title }}</a>
        </li>
        </ul>
    </div>
</div>
</template>
        