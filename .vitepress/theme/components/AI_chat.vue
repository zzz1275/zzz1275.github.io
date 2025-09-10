<template>
<div class="">
  <h2 class="text-center">AI问答</h2>
  <div>
    <label>请提问:</label>
  </div>  
  <textarea ref="user_input"  class="bdr_gry bdr_rds" style="width:100%"/>
  <select class="form-control">
    <option>gpt-4.1-mini</option>
    <option>gpt-4</option>
  </select>
  <span class="" style="padding:4px"></span>
  <button class="bdr_gry bdr_rds" style="" @click="user_click">提交</button>
  <span class="" style="padding:4px"></span>
  <button class="bdr_gry bdr_rds" style="" @click="user_clear">清除</button>
  <div ref="ai_out" class="bdr_gry bdr_rds" style="width:100%; height:500px; overflow-y:auto">
  </div>
</div>

</template>

<style>
@import "/node_modules/highlight.js/styles/vs2015.min.css";
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
.z04{
    z-index: 4;
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
.slf_ctr{
    align-self: center;
}
.cel_ctr{
    align-items: center;
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
.yas_ctr{
    align-items: center;
}
.bdr_grn{
    border:1px solid #00FF00;
}
.bdr_gry{
    border:1px solid gray;
}
.bdr_rds{
    border-radius:5px;
}
.rbs_100{
    flex-basis: 100%;
}
.flx_row{
    display:flex;
    flex-direction: row;
}
.flx_wrp{
    flex-wrap: wrap;
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
import {ref, onMounted } from 'vue';
import axios from 'axios';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';


const marked = new Marked(
  markedHighlight({
	emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value.replaceAll("\n","<br/>");
    }
  })
);

var user_input = ref(null);

var ai_out = ref(null);

var user_click = function(){
    var ipt = user_input.value.value;
    var out = ai_out.value.value;
    axios.post(`https://text.pollinations.ai/`,{
        "messages": [
            { "role": "system", "content": `使用markdown格式回答问题` },
            { "role": "user", "content": `${ipt}` }
        ],
        "model": "openai",
        "private":"true"
    }).then((res) => {
        ai_out.value.style.display = "block"
        var rst_dat = res.data;
        if(!out){out=`usr:\n${ipt}`}
        var rst_md = marked.parse(`${rst_dat}`);
        var rst_spn= document.createElement("span");
        rst_spn.innerHTML=`<h3>usr:${ipt}<br/></h3><br/>${rst_md}`;
        ai_out.value.appendChild(rst_spn);
        user_input.value.value="";
    }).catch(function(e){
        console.log("error:"+e);
        user_input.value.value="";
    })
    user_input.value.value="等待中...";
}
var user_clear = function(){
    ai_out.value.innerHTML=""
    ai_out.value.style.display="none"
}

onMounted(() => {
    
})

</script>
