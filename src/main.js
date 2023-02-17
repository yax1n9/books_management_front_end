import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import permissionDirective from "./directives/permission.js";

const app = createApp(App)

app.directive('permission', permissionDirective)

app.use(router).use(createPinia()).mount('#app')
