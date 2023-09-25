import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import '@mdi/font/css/materialdesignicons.css'
import './styles/index.scss'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#27DEBF',
    darken: '#1aa38c',
    secondary: '#00CAB5',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}


const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents
  },
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Toast, {})
app.use(VueApexCharts)

app.mount('#app')
