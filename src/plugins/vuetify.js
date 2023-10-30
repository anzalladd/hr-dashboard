import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#25695c',
        darken: '#1aa38c',
        secondary: '#00CAB5',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      }
    }
  }
});
