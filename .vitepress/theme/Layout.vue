<!-- .vitepress/theme/Layout.vue -->
<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide, ref } from "vue";
const { Layout } = DefaultTheme;
import {data as layout_dat} from './layout.data.js'
const { isDark } = useData();
import {onMounted} from 'vue'

const isShow = ref(false);


var add_ctt = ref(null);
function all_posts(){
    if(add_ctt.value.style.display == "none"){
        add_ctt.value.style.display = "block"
    }else{
        add_ctt.value.style.display = "none"
    }
}

function show_dir(e){
    var sho_div = e.target.nextElementSibling;
    if(sho_div.style.display == "none"){
        sho_div.style.display = "block";
    }else{
        sho_div.style.display = "none";
    }
}   

var dir_color = isDark.value?"darkgray":"lightgray";

onMounted(()=>{
    
})

</script>

<template>
  <!-- <DefaultTheme.Layout /> -->
  <Layout>
    <template #doc-before>
      <button
        class="VPBadge warning fix_btn"
        @click="all_posts()"
      >
      +
      </button>
      <div ref="add_ctt" class="fix_div">
        <ul>
            <div v-for="post of layout_dat" key="post.url">
                <div v-if="post.items">
                    - <span @click="show_dir" :style="{'backgroundColor':dir_color}">{{post.text}}</span>
                    <div :id="post.text" style="display:none">
                        <div v-for="post2 of post.items" key="post2.items">
                            <div v-if="post2.items">
                                &nbsp;&nbsp;
                                |- <span @click="show_dir" :style="{'backgroundColor':dir_color}">{{post2.text}}</span>
                                <div :id="post2.text" style="display:none">
                                    <div v-for="post3 of post2.items" key="post3.items">
                                        <div v-if="post3.items">
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            |-- <span @click="show_dir" :style="{'backgroundColor':dir_color}">{{post3.text}}</span>
                                            <div :id="post3.text" style="display:none"></div>
                                        </div>
                                        <div v-if="post3.link">
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            |-- <a :href="'/'+post3.link" class="post-title">{{post3.text}}</a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div v-if="post2.link">
                                  &nbsp;&nbsp;|- <a :href="'/'+post2.link" class="post-title">{{post2.text}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="post.link">
                    - <a :href="'/'+post.link" class="post-title">{{post.text}}</a>
                </div>
            </div>
        </ul>
      </div>
    </template>
    <template #doc-footer-before>
      
    </template>
    <template #doc-bottom>
	  <!--回到顶部结构-->
      <a href="#app" id="go2top"> </a>
    </template>
  </Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
.fix_btn {
  position: fixed; 
  top: 150px; 
  left: 30px;
  z-index: 9;
}
.fix_div {
    display:none; 
    position: fixed; 
    top:150px; 
    left:100px; 
    background-color:#969faf;
    z-index: 9;
}
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  border-radius: 6px;
  background-color: var(--vp-local-search-result-bg);
  color: #333;
  text-align: center;
  border-radius: 3px;
  padding: 16px;
  position: fixed;
  z-index: 10;
  left: 50%;
  bottom: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
/*回到顶部样式*/
#go2top {
  background: #999
    url("https://www.imqd.cn/wp-content/themes/imqd/images/go2top.png")
    no-repeat 8px center;
  position: fixed;
  bottom: 28px;
  right: 20px;
  width: 40px;
  height: 35px;
  border-radius: 6px;
}
#go2top:hover {
  background-color: #555;
}
@keyframes fadein {
  0% {
    bottom: 0;
    opacity: 0;
  }
  100% {
    bottom: 50px;
    opacity: 1;
  }
}
</style>