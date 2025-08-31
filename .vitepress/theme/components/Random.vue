<style>
</style>
<template>
</template>
<script setup>
import { useRouter } from 'vitepress'
import { data } from './random.data.js'

const router = useRouter();

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

var ran_url = getRandomElement(data.urls)

router.go(`/${ran_url}`);
</script>