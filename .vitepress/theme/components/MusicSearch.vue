<template>
    <div class="flx_row row_ctr">
      <h2 class="text-center">音乐搜索</h2>
    </div>
    <div>
        <div class="flx_row row_spb">
            <div></div>
            <div class="flx_row row_spb">
                <input type="text" ref="searchText" class="bdr_gry"></input>
                <span class="w20"></span>
                <button @click="search_music()" class="bdr_gry">搜索</button>
            </div>
            <div></div>
        </div>
        <div class="" v-for="(item, index) in song_list" :key="item.id">
            <div style="padding:5px"></div>
            <div class="flx_row rbs_100 row_spb">
                <div class=""></div>
                <div class="flx_row flx_cel cel_50 row_spb">
                    <span ><img :src="item.cover" class="h20 w40"></img></span> 
                    <span class="">{{ item.song }}</span> 
                    <button @click="click_song(item.id)">点歌</button>
                </div>
                <div class=""></div>
            </div>
            <div style=""></div>
        </div>
    </div>
  </template>
<style>
.h20{
    height:20px;
}
.h40{
    height:40px;
}
.w40{
    width:40px;
}
.w20{
    width:20px;
}

.row_spb{
    justify-content: space-between
}
.cel_50{
    flex:0 0 50%
}
.cel_20{
    flex:0 0 20%
}
.cel_ctr{
    align-self: center;
}
.row_rit{
    justify-content: right; 
}
.row_lft{
    justify-content: flex-start; 
}
.row_ctr{
    justify-content: center; 
}
.bdr_grn{
    border:1px solid #00FF00;
}
.bdr_gry{
    border:1px solid gray;
}
.rbs_100{
    flex-basis: 100%;
}
.flx_row{
    display:flex;
    flex-wrap: wrap;
    flex-direction: row;
}
.flx_col{
    display:flex;
    flex-basis: 100%;
    flex-direction: column;
}
.flx_cel{
    border-radius: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
    border:1px solid gray; 
    padding: 16px;
}
</style>
<script setup>
import {ref} from 'vue';
import axios from 'axios'

var searchText = ref(null);

var song_list = ref(null);
function search_music(){
    var search_text = encodeURIComponent(searchText.value.value);
    if(search_text == null){
    return;
    }
    axios.get(`https://api.vkeys.cn/v2/music/tencent?word=${search_text}`).then((res) => {
        song_list.value = res.data.data
    })
}
function click_song(id){
    axios.get(`https://api.vkeys.cn/v2/music/tencent?id=${id}`).then((res) => {
            var song_info = res.data.data;
            //location.replace(song_info.url);
            location.href = song_info.url;
    })
}
</script>