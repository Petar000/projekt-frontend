import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vue from 'vue'

const app = createApp(App); // Kreiranje Vue instance

app.use(router).mount('#app')
