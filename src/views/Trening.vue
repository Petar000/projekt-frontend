<template>

  <div class="navbar navbar-expand-lg navbar-light traka">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <button @click="idiNaHome" id="idihome">Naslovna stranica</button>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="pokaziTrening1()">Trening 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="pokaziTrening2()">Trening 2</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="pokaziUpute()">Upute za vježbanje</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container-fluid bg-img vh-90 d-flex align-items-top justify-content-center">
    <div class="container-fluid home-screen">
  <div class="container">
    <div class="row mt-4">
      <div class="col">
        <div v-if="trening1Kliknut">
          <h1>{{ imetr1 }}</h1>
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
              <template v-for="vježba in treningProgram1" :key="vježba.ime">
                <tr v-if="vježba.serija !== undefined">
                  <td>{{ vježba.ime }}</td>
                  <td>{{ vježba.serija }}</td>
                  <td>
                    {{ vježba.min_ponavljanja }} - {{ vježba.max_ponavljanja }}
                  </td>
                  <td>{{ vježba.rpe }}</td>
                  <td>
                    <img
                      :src="vježba.slika"
                      alt="Animacija vježbe"
                      class="animacije"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-if="trening2Kliknut">
          <h1>{{ imetr2 }}</h1>
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
            <template v-for="vježba in treningProgram2" :key="vježba.ime">
              <tr v-if="vježba.serija !== undefined">
                <td>{{ vježba.ime }}</td>
                <td>{{ vježba.serija }}</td>
                <td>
                  {{ vježba.min_ponavljanja }} - {{ vježba.max_ponavljanja }}
                </td>
                <td>{{ vježba.rpe }}</td>
                <td>
                  <img
                    :src="vježba.slika"
                    alt="Animacija vježbe"
                    class="animacije"
                  />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="uputeKliknut">
    <h1>Upute za trening</h1>
  <p class = "upute-tekst">
    Pauza između svake serije je između 2 i 3.5 minute - nije strogo određena.
    Za svaku vježbu pronaći opterećenje koje će odgovarati zadanom broju
    ponavljanja i zadanoj RPE skali.
  </p>
  <h2>Što je RPE?</h2>
  <p class = "upute-tekst">
    RPE skala (Rate of Perceived Exertion) označava skalu od 1-10 kojom ocjenjujemo težinu svake serije 
    tako da procjenimo koliko smo još ponavljanja mogli napraviti u njoj prije nego bi ostali bez snage. 
    Broj ponavljanja u rezervi oduzimamo od broja 10 kako bi dobili vrijednost skale. Na primjer ako bi 
    odradili seriju čućnja s 60kg i napravili 8 ponavljanja, a mogli bi maksimalno napraviti 10, onda tu 
    seriju ocjenjujemo s RPE 8.
  </p>
  </div>
  </div>
  </div>
</div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      treningProgram1: {}, //prvi koji ce se prikazati
      treningProgram2: {}, // drugi koji ce se prikazati
      imetr1: "",
      imetr2: "",
      mojiOdgovori: {},
      trening1Kliknut: true,  //u metodi na kraju se postavlja u true ovisno sta se klikne
      trening2Kliknut: false,
      uputeKliknut: false
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/odgovori")
      .then((response) => {
        this.mojiOdgovori = response.data;
        console.log("odgovorii nakon json", this.mojiOdgovori);
      })
      .catch((error) => {
        console.log(error);
      });

    this.provjeriOdgovore();
  },

  methods: {
    async provjeriOdgovore() {
      await new Promise((resolve) => {
        const checkMojiOdgovori = setInterval(() => {
          if (this.mojiOdgovori) {
            console.log(
              "evo dosli odgovori",
              this.mojiOdgovori,
              this.mojiOdgovori[0].drugiOdgovor
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
      } else if (drugiOdgovor === "3") {
        if (prviOdgovor === "Podjednako") {
          await this.dohvatiFullBody1();
          await this.dohvatiFullBody2();;
        } else if (prviOdgovor === "Trup") {
          await this.dohvatiLowerBody();
          await this.dohvatiUpperBody();
        } else if (prviOdgovor === "Donji dio") {
          await this.dohvatiLowerBody();
          await this.dohvatiUpperBody();
        }
      } else if (drugiOdgovor === "4") {
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
        const response = await axios.get("http://localhost:3000/fullbody1");
        this.treningProgram1 = response.data;
        console.log("prije kreiranja naslova", this.treningProgram1);
        this.imetr1 = this.treningProgram1[9].imetreninga;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiFullBody2() {
      try {
        const response = await axios.get("http://localhost:3000/fullbody2");
        this.treningProgram2 = response.data;
        console.log(this.treningProgram);
        this.imetr2 = this.treningProgram2[8].imetreninga;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiLowerBody() {
      try {
        const response = await axios.get("http://localhost:3000/lowerbody");
        this.treningProgram1 = response.data;
        console.log(this.treningProgram);
        this.imetr1 = this.treningProgram1[5].imetreninga;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiLowerBodyViseGornji() {
      try {
        const response = await axios.get(
          "http://localhost:3000/lowerbody-visegornji"
        );
        this.treningProgram1 = response.data;
        console.log(this.treningProgram);
        this.imetr1 = this.treningProgram1[5].imetreninga;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiLowerBodyViseDonji() {
      try {
        const response = await axios.get(
          "http://localhost:3000/lowerbody-visedonji"
        );
        this.treningProgram1 = response.data;
        console.log(this.treningProgram);
        this.imetr1 = this.treningProgram1[5].imetreninga;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiUpperBody() {
      try {
        const response = await axios.get("http://localhost:3000/upperbody");
        this.treningProgram2 = response.data;
        console.log(this.treningProgram);
        this.imetr2 = this.treningProgram2[7].imetreninga;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiUpperBodyViseGornji() {
      try {
        const response = await axios.get(
          "http://localhost:3000/upperbody-visegornji"
        );
        this.treningProgram2 = response.data;
        console.log(this.treningProgram);
        this.imetr2 = this.treningProgram2[7].imetreninga;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiUpperBodyViseDonji() {
      try {
        const response = await axios.get(
          "http://localhost:3000/upperbody-visedonji"
        );
        this.treningProgram2 = response.data;
        console.log(this.treningProgram);
        this.imetr2 = this.treningProgram2[7].imetreninga;
      } catch (error) {
        console.log(error);
      }
    },

    pokaziTrening1(){
      this.trening1Kliknut = true;
      this.trening2Kliknut = false;
      this.uputeKliknut = false;
    },
    pokaziTrening2(){
      this.trening1Kliknut = false;
      this.trening2Kliknut = true;
      this.uputeKliknut = false;
    },
    pokaziUpute(){
      this.trening1Kliknut = false;
      this.trening2Kliknut = false;
      this.uputeKliknut = true;
    },

    idiNaHome() {
      this.$router.push({ name: "home" });
    }
  },
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
  background-color: #137CBD;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #2DA6E8;
}
tbody tr:nth-child(odd) {
  background-color: #F2F2F2;
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
  width: 7vw;
}

button {
  font-weight: bold;
  border-radius: 0.5vw;
  color: white;
  background-color: #001BFF;
}
.traka{
  background-color: #2B2B2B;
}

.nav-link{
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

</style>
