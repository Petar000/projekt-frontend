<template>
  <router-view v-slot="{ Component, route }">
    <!-- Provjera ako je ruta jedna od onih koje zahtijevaju tranziciju -->
    <transition v-if="trebaTranziciju(route.name)" :name="napraviTranziciju(route.name)" mode="out-in">
      <component :is="Component" />
    </transition>
    <!-- Ako ruta ne zahtijeva tranziciju, prikaži komponentu izravno -->
    <component v-else :is="Component" />
  </router-view>
</template>

<script>
import { auth } from './views/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import store from './views/store';
import { signOut } from "firebase/auth";
import router from './router';

export default {
  name: 'App',
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Korisnik je prijavljen
        console.log('Korisnik je prijavljen:', user.email);
        store.currentUser = user.email;
      } else {
        // Korisnik je odjavljen
        console.log('Korisnik je odjavljen.');
        store.currentUser = null;

        if (router.name !== 'login'){
          router.push({ name: 'login' });
        }
      }
    });
  },

  data(){
    return {
      store,
    };
  },

  methods: {
    // Metoda za provjeru treba li se primijeniti tranzicija za rutu
    trebaTranziciju(routeName) {
      // Vratite false ako je ime rute ..., inače vratite true
      return routeName !== 'Napredak' && routeName !== 'home' && routeName !== 'login';
    },
    // Metoda za dobivanje imena tranzicije prema imenu rute
    napraviTranziciju(routeName) {
      switch (routeName) {
        case 'Pitanja':
          return 'slide';
        case 'Pitanja2':
          return 'slide';
        case 'Savjeti':
          return 'slide';
        case 'Trening':
          return 'fade';
      }
    }
  }
};
</script>

<style lang="scss">
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button:hover {
  color: lightgrey;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.trainLogo2 {
  width: 12vw;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 !important;
}

.bg-img2 {
  color: white;
  background-image: url(../src/assets/background-novi.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

button {
  background-color: #2DA6E8;
  color: black;
  border: none;
  cursor: pointer;
}

h1 {
  font-weight: bold;
}

p {
  font-size: 2.8vw;
}

.traka {
  background-color: #2B2B2B;
}

.nav-link {
  font-weight: bold;
}

.navbar-light .navbar-nav .nav-link {
  color: #ffffff;
}

.navbar-light .navbar-nav .nav-link:hover {
  color: lightgray;
}

#idihome:hover {
  color: lightgrey;
}

@media (max-width: 768px) {
  .bg-img {
    background-size: 100% 100%;
  }

  .bg-img2 {
    height: 100%;
  }

  .trainLogo2 {
    width: 28vw;
  }

  p {
    font-size: 5vw;
  }
}</style>


