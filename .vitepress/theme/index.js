
import DefaultTheme from 'vitepress/theme'
import {onMounted} from 'vue'
import Layout from './Layout.vue'
import './styles/custom.css'

export default { 
    ...DefaultTheme,
    Layout: Layout,
    setup(){
        onMounted(() => {
            
        })
    }
} 

        