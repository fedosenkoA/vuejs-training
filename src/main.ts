import './sass/app.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App.vue';
import { createApp } from 'vue';
import { router } from './router';
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';

const app = createApp(App);
app.use(router).use(VCalendar);

router.isReady().finally(() => {
  app.mount('#app');
});
