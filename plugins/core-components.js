//? ovde sada definisemo komponente koje se iznova koriste (AppButton, AppControlInput, PostList)
//! i ono sto je vrlo bitno, moramo da importujemo Vue!!
import Vue from 'vue'

import AppButton from '@/components/UI/AppButton'
import AppControlInput from '@/components/UI/AppControlInput'
import PostList from '@/components/Posts/PostList'

Vue.component('AppButton', AppButton)
Vue.component('AppControlInput', AppControlInput)
Vue.component('PostList', PostList)

// ovde smo definisali pluginove, importovali Vue framework i reuse componente, a u nuxt.config.js idemo u plugins property da registrujemo ove komponente