import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import Landing from './pages/Landing.vue';
import Login from './pages/Login.vue';
import Profile from './pages/Profile.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';

import Timeline from './pages/Timeline.vue';
import Strumenti from './pages/Strumenti.vue';
import Esperimenti from './pages/Esperimenti.vue';
import Percorsi from './pages/Percorsi.vue';
import PercorsiNew from './pages/PercorsiNew.vue';
import PersonalizzazionePercorso from './pages/PersonalizzazionePercorso.vue';
import PercorsoSelezioato from './pages/PercorsoSelezionato.vue';
import PercorsoVROOM from './pages/PercorsoVROOM.vue'
import ElencoPercorsi from './pages/ElencoPercorsi.vue';
import DoveSiamo from './pages/DoveSiamo.vue';
import Contatti from './pages/Contatti.vue';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/landing',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/login',
      name: 'login',
      components: { default: Login, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    //Pagine aggiunte
    {
      path: '/timeline',
      name: 'timeline',
      components: { default: Timeline, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/strumenti',
      name: 'strumenti',
      components: { default: Strumenti, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/esperimenti',
      name: 'esperimenti',
      components: { default: Esperimenti, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/percorsi',
      name: 'percorsi',
      components: { default: Percorsi, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/creapercorso',
      name: 'creapercorso',
      components: { default: PercorsiNew, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/personalizzazionepercorso',
      name: 'personalizzazionepercorso',
      components: { default: PersonalizzazionePercorso, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/percorsoselezionato',
      name: 'percorsoselezionato',
      components: { default: PercorsoSelezioato, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
      /*props: (route) => ({
        defaultParam: {test: "test"},
        ...route.params
      })*/
      /*props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      },*/
    },
    {
      path: '/itinerariogenerato',
      name: 'itinerariogenerato',
      components: { default: PercorsoVROOM, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/elencopercorsi',
      name: 'elencopercorsi',
      components: { default: ElencoPercorsi, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/doveSiamo',
      name: 'doveSiamo',
      components: { default: DoveSiamo, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/contatti',
      name: 'contatti',
      components: { default: Contatti, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '*',
      redirect: '/'
    }

  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
