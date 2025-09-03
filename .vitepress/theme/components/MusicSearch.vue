<template>
    <div class="flx_row row_ctr">
      <h2 class="text-center">音乐搜索</h2>
    </div>
    <div id="player_app" class="flx_row row_ctr">
        <div id="aplayer"></div>
    </div>
    <div>
        <div class="flx_row row_spb">
            <div></div>
            <div class="flx_row row_spb" style="height:30px">
                <input type="text" ref="searchText" class="bdr_gry" style="width:200px"></input>
                <span class="w20"></span>
                <button @click="search_music()" class="bdr_gry">搜索</button>
            </div>
            <div></div>
        </div>
        <div class="" v-for="(item, index) in song_list" :key="item.id">
            <div style="padding:5px"></div>
            <div class="flx_row rbs_100 row_spb">
                <div class=""></div>
                <div class="flx_row flx_cel cel_70 row_spb">
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
.cel_70{
    flex:0 0 70%
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

#player_app {
  width: 100%;
  height: 100%;
  padding: 50px;
  #aplayer {
    width: 480px; 
  }
}
</style>
<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios'
import APlayer from "APlayer"; 
import "APlayer/dist/APlayer.min.css"; 


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

var audio_arr = [];
var audio_inf =  {
    fixed: false, // 不开启吸底模式
    listFolded: true, // 折叠歌曲列表
    autoplay: true, // 开启自动播放
    preload: "auto", // 自动预加载歌曲
    loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
    order: "list", //  播放模式，list列表播放, random随机播放
};

var ply = null;

function click_song(id){
    axios.get(`https://api.vkeys.cn/v2/music/tencent?id=${id}`).then((res) => {
        var song_info = res.data.data;
        //location.replace(song_info.url);
        //location.href = song_info.url;
        var sgr_names = song_info.singer_list.map(sgr=>{
            return sgr.name;
        });
        var sgrs = sgr_names.join(",");
        console.log(ply);
        ply.list.add([{
            name: `${song_info.song}`, 
            artist: sgrs, 
            url: `${song_info.url}`,
        }]);
        
    })
}

onMounted(() => {
    ply = new APlayer({
        container: document.getElementById("aplayer"),
        audio: audio_arr, // 音乐信息
        ...audio_inf, // 其他配置信息
    });
})
</script>