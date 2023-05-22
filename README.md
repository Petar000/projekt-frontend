# Learntotrain

## Opis

Learn to train je aplikacija za početnike u treningu s opterećenjem. Nakon što se aplikacija otvori, pokrenut će se početna stranica koja govori za koga je namijenjena. Aplikacija služi svima onima koji žele početi s treningom neovisno o tome je li im cilj gubiti ili dobivati kilograme. Klikom na dugme "Kreni" otvara se iduća stranica s pitanjima. Potrebno je odabrati
koji dio tijela bi htjeli više napredovati i koliko puta tjedno bi htjeli trenirati. Zatim slijedi stranica sa savjetima i nakon toga slijedi glavna stranica s programima treninga te koliko puta tjedno svaki trening izvoditi. U navigacijskoj traci se nalazi i element "Praćenje napredka" koji vodi na novu stranicu na kojoj se nalazi tablica za unošenje mijera za svaki tjedan.

## Datoteke projekta

Struktura direktorija u projektu:

- `public`: Direktorij koji sadrži javne fajlove i glavnu HTML datoteku.
  - `index.html`: Glavni HTML file.
  
- `src`: Direktorij koji sadrži izvorni kod projekta.
  - `assets`: Direktorij koji sadrži slike projekta.
  - `router`: Direktorij koji sadrži definicije ruta za Vue Router.
    - `index.js`: File koji sadrži definicije ruta.
  - `views`: Direktorij koji sadrži Vue komponente za prikaz različitih stranica.
    - `HomeView.vue`: Komponenta za početnu stranicu.
    - `Napredak.vue`: Komponenta za prikaz napretka.
    - `Pitanja.vue`: Komponenta za prikaz pitanja.
    - `Savjeti.vue`: Komponenta za prikaz savjeta.
    - `Trening.vue`: Komponenta za prikaz treninga.
  - `App.vue`: Glavna Vue komponenta.
  - `main.js`: Glavni JavaScript file.

- `package-lock.json`: File koji čuva verzije ovisnosti.
- `package.json`: File koji sadrži informacije o projektu i ovisnostima.
- `README.md`: File koji sadrži dokumentaciju i opis projekta.

## Pokretanje

1. **Kloniranje repozitorija**

Kako biste klonirali ovaj repozitorij na svoje računalo, otvorite terminal ili neki drugi naredbeni redak, navigirajte do direktorija u kojem želite smjestiti projekt i izvršite sljedeću naredbu:

git clone https://github.com/Petar000/projekt-frontend.git

2. **Instalacija**

Pokrenite sljedeću naredbu npm install u terminalu direktorija projekta kako bi instalirali sve potrebne pakete:

npm install

3. **Pokretanje projekta**

Pokrenite frontend projekt koristeći sljedeću naredbu:

npm run serve

Otvorite aplikaciju s dobivenom adresom localhost-a.

## Buildanje aplikacije

Za buildanje aplikacije za produkciju, izvršite sljedeću naredbu:

npm run build

## Autor

- Ime: Petar Vuković