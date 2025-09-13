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
      <span
        class="fix_btn"
        @click="all_posts()"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-icon size-6"><path d="M3 12h.01"></path><path d="M3 18h.01"></path><path d="M3 6h.01"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M8 6h13"></path></svg>
      </span>
      <div ref="add_ctt" class="fix_div" style="width:50%; height:30%; overflow-y: auto">
        <div style="padding:10px">
            <ul>
                <div v-for="post of layout_dat" key="post.url" class="pst_itm">
                    <div v-if="post.items">
                        - <button @click="show_dir" style="backgroundColor:var(--c-folder-bg)">{{post.text}}</button>
                        <div :id="post.text" style="display:none">
                            <div v-for="post2 of post.items" key="post2.items" class="pst_itm">
                                <div v-if="post2.items">
                                    &nbsp;&nbsp;
                                    |- <button @click="show_dir" style="backgroundColor:var(--c-folder-bg)">{{post2.text}}</button>
                                    <div :id="post2.text" style="display:none">
                                        <div v-for="post3 of post2.items" key="post3.items" class="pst_itm">
                                            <div v-if="post3.items">
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                |-- <button @click="show_dir" style="backgroundColor:var(--c-folder-bg)">{{post3.text}}</button>
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
  right: 30px;
  z-index: 9;
}
.fix_div {
    display:none; 
    position: fixed; 
    top:150px; 
    right:60px; 
    background-color:var(--c-mine-bg);
    z-index: 9;
    border: 1px solid var(--c-mine);
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

.pst_itm {
    background-color: var(--c-mine-bg);
    margin-top:1px;
    border-radius:4px;
}
.pst_itm:hover{
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: var(--c-mine);
}
</style>