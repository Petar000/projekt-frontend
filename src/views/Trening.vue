<template>
  <div>
    <!-- Gornji dio stranice s korisničkim imenom i opcijom za odjavu -->
    <div class="navbar navbar-expand-lg navbar-light traka" style="background-color: lightgray; padding: 0;">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center w-100">
          <button @click="idiNaHome" class="home btn btn-md">Naslovna stranica</button>
          <p style="font-size:small;" class="justify-content-center align-items-center"></p>
          <button class="odjava btn btn-primary btn-md" @click="idiNaLogin">Odjavi se</button>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar navbar-expand-lg navbar-light traka fixed-bottom">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#" id="tr1kliknut" @click="pokaziTrening1()">Trening 1</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="tr2kliknut" @click="pokaziTrening2()">Trening 2</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="uputekliknute" @click="pokaziUpute()">Upute za vježbanje</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="idiNaMjere">Praćenje napretka</a>
        </li>
      </ul>
    </div>
  </div>
</div>
  <div class="container-fluid vh-90 d-flex align-items-top justify-content-center">
    <div class="container">
      <div class="row">
        <div class="col md-12">
          <div class="table-responsive">
            <div v-if="trening1Kliknut">
              <h1 id="glavni-naslov">{{ putaTjedno1 }}</h1>
              <table>
                <thead>
                  <tr>
                    <th>Ime vježbe</th>
                    <th>Broj serija</th>
                    <th>Broj ponavljanja</th>
                    <th>RPE</th>
                    <th>Izvedba vježbe</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(vježba, index) in treningProgram1" :key="vježba.ime">
                    <tr v-if="vježba.serija !== undefined">
                      <td @click="() => prikaziPovecanuSliku1(vježba.slika, index)">{{ vježba.ime }}</td>
                      <td @click="() => prikaziPovecanuSliku1(vježba.slika, index)">{{ vježba.serija }}</td>
                      <td @click="() => prikaziPovecanuSliku1(vježba.slika, index)">
                        {{ vježba.min_ponavljanja }} -
                        {{ vježba.max_ponavljanja }}
                      </td>
                      <td @click="() => prikaziPovecanuSliku1(vježba.slika, index)">{{ vježba.rpe }}</td>
                      <td @click="() => prikaziPovecanuSliku1(vježba.slika, index)">
                        <img :src="vježba.slika" alt="Animacija vježbe" class="animacije" />
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div v-if="trening2Kliknut">
              <h1>{{ putaTjedno2 }}</h1>
              <table>
                <thead>
                  <tr>
                    <th>Ime vježbe</th>
                    <th>Broj serija</th>
                    <th>Broj ponavljanja</th>
                    <th>RPE</th>
                    <th>Izvedba vježbe</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(vježba, index) in treningProgram2" :key="vježba.ime">
                    <tr v-if="vježba.serija !== undefined">
                      <td @click="() => prikaziPovecanuSliku2(vježba.slika, index)">{{ vježba.ime }}</td>
                      <td @click="() => prikaziPovecanuSliku2(vježba.slika, index)">{{ vježba.serija }}</td>
                      <td @click="() => prikaziPovecanuSliku2(vježba.slika, index)">
                        {{ vježba.min_ponavljanja }} -
                        {{ vježba.max_ponavljanja }}
                      </td>
                      <td @click="() => prikaziPovecanuSliku2(vježba.slika, index)">{{ vježba.rpe }}</td>
                      <td @click="() => prikaziPovecanuSliku2(vježba.slika, index)">
                        <img :src="vježba.slika" alt="Animacija vježbe" class="animacije" />
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="uputeKliknut">
        <div class="stranica-uputa">
          <h1>Upute za trening</h1>
          <p class="upute-tekst">
            Pauza između svake serije je između 2 i 3.5 minute - nije strogo
            određena. Za svaku vježbu pronaći opterećenje koje će odgovarati
            zadanom broju ponavljanja i zadanoj RPE skali. Cilj je svaki tjedan
            progresivno povećavati opterećenje kroz kilažu na vježbama ili kroz
            broj ponavljanja u zadanom rasponu.
          </p>
          <h2>Što je RPE?</h2>
          <p class="upute-tekst">
            RPE skala (Rate of Perceived Exertion) označava skalu od 1-10 kojom
            ocjenjujemo težinu svake serije tako da procjenimo koliko smo još
            ponavljanja mogli napraviti u njoj prije nego bi ostali bez snage.
            Broj ponavljanja u rezervi oduzimamo od broja 10 kako bi dobili
            vrijednost skale. Na primjer ako bi odradili seriju čućnja s 60kg i
            napravili 10 ponavljanja, a mogli bi maksimalno napraviti 12, onda tu
            seriju ocjenjujemo s RPE 8.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalPrikazan" class="modal" @click="zatvoriModal">
    <img :src="modalniSadrzaj" alt="Povećana slika" class="povecana-slika" @click.stop />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      treningProgram1: {}, //prvi koji ce se prikazati
      treningProgram2: {}, // drugi koji ce se prikazati
      putaTjedno1: "",
      putaTjedno2: "",
      mojiOdgovori: "",
      trening1Kliknut: false, //u metodi na kraju se postavlja u true ovisno sta se klikne
      trening2Kliknut: false,
      uputeKliknut: false,
      modalPrikazan: false, // stanje modalnog prozora
    modalniSadrzaj: "",
    };
  },
  mounted() {
    axios
      .get("https://learntotrain-backend.onrender.com/odgovori")
      .then((response) => {
        this.mojiOdgovori = response.data;
        console.log("odgovorii nakon json", this.mojiOdgovori);
      })
      .catch((error) => {
        console.log(error);
      });

    this.provjeriOdgovore();

    this.tr1 = document.getElementById("tr1kliknut");
    this.tr2 = document.getElementById("tr2kliknut");
    this.upute = document.getElementById("uputekliknute");
    this.pokaziTrening1();
  },

  methods: {
    async provjeriOdgovore() {
      await new Promise((resolve) => {
        const checkMojiOdgovori = setInterval(() => {
          if (this.mojiOdgovori) {
            console.log(
              "evo dosli odgovori",
              this.mojiOdgovori,
              this.mojiOdgovori.drugiOdgovor
            );
            clearInterval(checkMojiOdgovori);
            resolve();
          }
        }, 100);
      });

      const prviOdgovor = this.mojiOdgovori[0].prviOdgovor;
      const drugiOdgovor = this.mojiOdgovori[0].drugiOdgovor;

      if (drugiOdgovor === "2") {
        await this.dohvatiFullBody1();
        await this.dohvatiFullBody2();
        this.putaTjedno1 = "1xtjedno Full Body A";
        this.putaTjedno2 = "1xtjedno Full Body B";
      } else if (drugiOdgovor === "3") {
        if (prviOdgovor === "Podjednako") {
          this.putaTjedno1 = "2xtjedno Full Body A";
          this.putaTjedno2 = "1xtjedno Full Body B";
          await this.dohvatiFullBody1();
          await this.dohvatiFullBody2();
        } else if (prviOdgovor === "Trup") {
          this.putaTjedno1 = "1xtjedno Lower Body";
          this.putaTjedno2 = "2xtjedno Upper Body";
          await this.dohvatiLowerBody();
          await this.dohvatiUpperBody();
        } else if (prviOdgovor === "Donji dio") {
          this.putaTjedno1 = "2xtjedno Lower Body";
          this.putaTjedno2 = "1xtjedno Upper Body";
          await this.dohvatiLowerBody();
          await this.dohvatiUpperBody();
        }
      } else if (drugiOdgovor === "4") {
        this.putaTjedno1 = "2xtjedno Lower Body";
        this.putaTjedno2 = "2xtjedno Upper Body";
        if (prviOdgovor === "Podjednako") {
          await this.dohvatiLowerBody();
          await this.dohvatiUpperBody();
        } else if (prviOdgovor === "Trup") {
          await this.dohvatiLowerBodyViseGornji();
          await this.dohvatiUpperBodyViseGornji();
        } else if (prviOdgovor === "Donji dio") {
          await this.dohvatiLowerBodyViseDonji();
          await this.dohvatiUpperBodyViseDonji();
        }
      }
    },

    async dohvatiFullBody1() {
      try {
        const response = await axios.get("https://learntotrain-backend.onrender.com/fullbody1");
        this.treningProgram1 = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiFullBody2() {
      try {
        const response = await axios.get("https://learntotrain-backend.onrender.com/fullbody2");
        this.treningProgram2 = response.data;
        console.log(this.treningProgram2);
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiLowerBody() {
      try {
        const response = await axios.get("https://learntotrain-backend.onrender.com/lowerbody");
        this.treningProgram1 = response.data;
        console.log(this.treningProgram1);
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiLowerBodyViseGornji() {
      try {
        const response = await axios.get(
          "https://learntotrain-backend.onrender.com/lowerbody-visegornji"
        );
        this.treningProgram1 = response.data;
        console.log(this.treningProgram1);
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiLowerBodyViseDonji() {
      try {
        const response = await axios.get(
          "https://learntotrain-backend.onrender.com/lowerbody-visedonji"
        );
        this.treningProgram1 = response.data;
        console.log(this.treningProgram1);
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiUpperBody() {
      try {
        const response = await axios.get("https://learntotrain-backend.onrender.com/upperbody");
        this.treningProgram2 = response.data;
        console.log(this.treningProgram2);
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiUpperBodyViseGornji() {
      try {
        const response = await axios.get(
          "https://learntotrain-backend.onrender.com/upperbody-visegornji"
        );
        this.treningProgram2 = response.data;
        console.log(this.treningProgram2);
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiUpperBodyViseDonji() {
      try {
        const response = await axios.get(
          "https://learntotrain-backend.onrender.com/upperbody-visedonji"
        );
        this.treningProgram2 = response.data;
        console.log(this.treningProgram2);
      } catch (error) {
        console.log(error);
      }
    },

    async pokaziTrening1() {
      this.trening1Kliknut = true;
      this.trening2Kliknut = false;
      this.uputeKliknut = false;
      this.tr1.style.color = "gray";
      this.tr2.style.color = "";
      this.upute.style.color = "";
    },
    async pokaziTrening2() {
      this.trening1Kliknut = false;
      this.trening2Kliknut = true;
      this.uputeKliknut = false;
      this.tr2.style.color = "gray";
      this.tr1.style.color = "";
      this.upute.style.color = "";
    },
    async pokaziUpute() {
      this.trening1Kliknut = false;
      this.trening2Kliknut = false;
      this.uputeKliknut = true;
      this.upute.style.color = "gray";
      this.tr1.style.color = "";
      this.tr2.style.color = "";
    },

    idiNaHome() {
      this.$router.push({ name: "home" });
    },

    idiNaMjere() {
      this.$router.push({ name: "Napredak" });
    },

    idiNaLogin(){
      this.$router.push({ name: "login" })
    },

    prikaziPovecanuSliku1(slika, index) {
  console.log('ovo je index ', index);
  console.log('vrijednost slike ', slika);
  console.log('treningProgram1', this.treningProgram1)
  this.modalniSadrzaj = this.treningProgram1[index].slika;
  this.modalPrikazan = true;
  },
  zatvoriModal() {
  this.modalPrikazan = false;
  },

  prikaziPovecanuSliku2(slika, index) {
  this.modalniSadrzaj = this.treningProgram2[index].slika;
  this.modalPrikazan = true; 
  },
  zatvoriModal() {
  this.modalPrikazan = false;
  },
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 4vw;
  box-shadow: 0px 0px 10px #888;
}

.upute-tekst {
  font-size: 1.7vw;
  margin-top: 1.5vw;
}

th,
td {
  text-align: left;
  padding: 0.2vw;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #137cbd;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #2da6e8;
}

tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}

#glavni-naslov{
  font-size: 3vw;
}

h1 {
  font-weight: bold;
  font-size: 3vw;
  margin-top: 3vw;
  margin-bottom: 1.5vw;
}

h2 {
  margin-top: 3vw;
  font-size: 2.5vw;
}

.animacije {
  width: 126px;
  height: 85px;
}

button {
  font-weight: bold;
  border-radius: 0.5vw;
  color: white;
}

button:hover {
  color: lightgray;
}

.stranica-uputa {
  align-items: center !important;
}

.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* poluprozirni overlay */
    z-index: 1000; /* visok indeks z-ordera da bi bio iznad ostalog sadržaja */
}

/* Stilizacija slike unutar modalnog prozora */
.modal img {
    max-width: 80%;
    max-height: 80%;
    border-radius: 5px; /* zaobljeni rubovi slike */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* sjena oko slike */
}

.navbar {
    padding: 1vw 2vw;
  }

  .btn {
    width: auto !important; /* Vraćanje širine na auto */
  }

  .traka {
    border-radius: 0; /* Uklanjanje zaobljenih rubova */
  }

  .fixed-bottom {
    bottom: 0; /* Postavljanje donje trake na dno stranice */
    min-height: 4vw;
    font-size: 1vw;
  }
  .nav-link {
  width: auto;
  white-space: nowrap;
  font-size: medium; 
}
.navbar-nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
  overflow-x: auto; /* Dodajemo horizontalni scrollbar */
}
.home {
  background-color: #137cbd;
  font-size: medium;
  padding: 0.5vw 1vw;
  width: auto;
  margin: 0.5vw 1.5vw;
}
.odjava {
  font-size: medium; 
  padding: 0.5vw 1vw;
  width: auto; /* Podešavanje širine na automatsko */
  margin: 0.5vw 1.5vw;
  background-color: darkgrey;
  border: none;
}
.navbar-toggler {
  display: none;
}
@media (max-width: 1024px){

  .animacije {
    width: 95px;
    height: 64px;
  }
  .navbar-expand-lg .navbar-collapse {
    flex-basis: 100%; /* Navbar se neće odmah kolapsirati na ovom breakpointu */
    display: flex !important;
    flex-basis: auto;
    flex-grow: 1;
    overflow: hidden;
    height: auto;
  }
  .navbar-nav .nav-item {
    flex: 0 0 auto; /* Poništavamo fleksibilnost linkova */
  }
}

@media (max-width: 768px) {
  .home{
    border-radius: 1.5vw;
  }
  .odjava{
    border-radius: 1.5vw;
  }
  .nav-link {
  font-size: small; 
}
  .navbar-nav{
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }
  .navbar-nav .nav-item {
    flex: 1 1 auto;
    text-align: center;
    margin: 0;
  }

  h1 {
    font-size: 7vw;
    margin-top: 5vw;
    margin-bottom: 6vw;
  }

  #glavni-naslov{
  font-size: 7vw;
}

  .upute-tekst {
    font-size: 3.5vw;
  }

  h2 {
    font-size: 5vw;
  }

  .animacije {
    width: 75px;
    height: 50px;
  }

  th {
    font-size: 2.5vw;
  }

  td {
    font-size: 2.5vw;
  }
}
</style>
