import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import SelectCity from './components/SelectCity.vue'
import WeatherInfo from './components/WeatherInfo.vue'

const routes = [
    {path: "/", component: SelectCity},
    {path: "/weather-info/:city", component: WeatherInfo, props:true}
 ];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app');
