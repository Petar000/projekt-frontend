import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vue from 'vue'

const app = createApp(App); // Kreiranje Vue instance

// Funkcija za dohvaćanje session ID-a iz kolačića
const getSessionIdFromCookie = () => {
  // Dohvaćanje svih kolačića i razdvajanje
  const cookies = document.cookie.split('; ');
  // Pronalazak kolačića za session ID
  const sessionIdCookie = cookies.find(cookie => cookie.startsWith('sessionId='));
  // Ako postoji kolačić za session ID, vraća njegovu vrijednost, inače null
  if (sessionIdCookie) {
    return sessionIdCookie.split('=')[1];
  }
  return null;
};

// Funkcija za generiranje novog session ID-a
const generateSessionId = () => {
  // Koristi 'uuid' paket za generiranje jedinstvenog ID-a
  return uuidv4();
};

// Funkcija za postavljanje session ID-a u kolačić
const setSessionCookie = (sessionId) => {
  // Postavljanje session ID-a u kolačić s atributom SameSite=Strict
  document.cookie = `sessionId=${sessionId}; SameSite=Strict`;
};

// Dohvaćanje postojećeg session ID-a iz kolačića
let sessionId = getSessionIdFromCookie();

// Ako ne postoji session ID u kolačiću, generiraj novi
if (!sessionId) {
  sessionId = generateSessionId();
  // Postavljanje novog session ID-a u kolačić
  setSessionCookie(sessionId);
}

// Postavljanje session ID-a na globalni prototip Vue instance kako bi bio dostupan u cijeloj aplikaciji
app.config.globalProperties.$sessionId = sessionId;

app.use(router).mount('#app')
