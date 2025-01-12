import { createApp } from 'vue'
import Vue3Autocounter from 'vue3-autocounter';
import VueApexCharts from "vue3-apexcharts";
import './assets/style.css'
import './assets/icomoon/style.css'
import App from './App.vue'
import router from './router';

const app = createApp(App);

app.use(router);
app.component('vue3-autocounter', Vue3Autocounter);
app.use(VueApexCharts);
app.component("apexchart", VueApexCharts);
app.mount('#app');  