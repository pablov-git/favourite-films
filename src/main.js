/*
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
*/

import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

//const vuetify = createVuetify()
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          card: '#bbd3d8ff',
          background: '#fefae0',
          secondary: '#ccd5ae',
        },
      },
      dark: {
        colors: {
          card: '#bbd3d8ff',
          background: '#242424',
          secondary: '#5CBBF6',
        },
      },
    },
  },
});

createApp(App)
  .use(vuetify)
  .mount('#app')
