
import DefaultTheme from 'vitepress/theme'
import {onMounted} from 'vue'
import {data} from './lastposts.data.js'
import Layout from './Layout.vue'

export default { 
    ...DefaultTheme,
    Layout: Layout,
    setup(){
        onMounted(() => {
            
        })
    }
} 

        