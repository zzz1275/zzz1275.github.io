
<script setup>
import { computed, ref } from 'vue';
import { data } from './allposts.data.js';

const { tagMap, postMap } = data;

var urls = Object.keys(postMap).sort((a, b)=>{
    return a >b;
})

</script>

<template>
<div>
	<h2>文章分类列表</h2>
	<ul>
		<li v-for="url in urls" :key="url">
		    <a :href="url">{{ postMap[url]["title"] }}</a>
		</li>
	</ul>
</div>
</template>
        