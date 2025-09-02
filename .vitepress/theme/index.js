
import DefaultTheme from 'vitepress/theme'
import {onMounted} from 'vue'
import Layout from './Layout.vue'

export default { 
    ...DefaultTheme,
    Layout: Layout,
    setup(){
        onMounted(() => {
            
        })
    }
} 

        