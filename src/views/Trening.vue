<template>

  <div class="navbar navbar-expand-lg navbar-light bg-light">
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
          <li class="nav-item">
            <a class="nav-link active" href="#" @click="pokaziTrening1()">Trening 1</a>
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
  <h1 id = "naslovplana"></h1>
  <div class="container">
    <div class="row mt-4">
      <div class="col">
        <div v-if="trening1Kliknut">
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

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      treningProgram1: {}, //prvi koji ce se prikazati
      treningProgram2: {}, // drugi koji ce se prikazati
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
      const prviNaslov = document.getElementById("naslovplana");

      const prviOdgovor = this.mojiOdgovori[0].prviOdgovor;
      const drugiOdgovor = this.mojiOdgovori[0].drugiOdgovor;

      if (drugiOdgovor === "2") {
        prviNaslov.innerText = "Treninzi za 2 puta tjedno. Full body A-B";
        await this.dohvatiFullBody1();
        await this.dohvatiFullBody2();
      } else if (drugiOdgovor === "3") {
        if (prviOdgovor === "Podjednako") {
          await this.dohvatiFullBody1();
          await this.dohvatiFullBody2();
          prviNaslov.innerText = "Treninzi za 3 puta tjedno. Full body A-B-A";
        } else if (prviOdgovor === "Trup") {
          await this.dohvatiLowerBody();
          await this.dohvatiUpperBody();
          prviNaslov.innerText = "Treninzi za 3 puta tjedno. Upper-Lower-Upper";
        } else if (prviOdgovor === "Donji dio") {
          await this.dohvatiLowerBody();
          await this.dohvatiUpperBody();
          prviNaslov.innerText = "Treninzi za 3 puta tjedno. Lower-Upper-Lower";
        }
      } else if (drugiOdgovor === "4") {
        prviNaslov.innerText =
          "Treninzi za 4 puta tjedno. Lower-Upper-Lower-Upper";
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
        const imetr1 = this.treningProgram1[9].imetreninga;
        const naslov1 = document.getElementById("naslovtr1");
        naslov1.innerText = imetr1;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiFullBody2() {
      try {
        const response = await axios.get("http://localhost:3000/fullbody2");
        this.treningProgram2 = response.data;
        console.log(this.treningProgram);
        const imetr2 = this.treningProgram2[8].imetreninga;
        const naslov2 = document.getElementById("naslovtr2");
        naslov2.innerText = imetr2;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiLowerBody() {
      try {
        const response = await axios.get("http://localhost:3000/lowerbody");
        this.treningProgram1 = response.data;
        console.log(this.treningProgram);
        const imetr1 = this.treningProgram1[5].imetreninga;
        const naslov1 = document.getElementById("naslovtr1");
        naslov1.innerText = imetr1;
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
        const imetr1 = this.treningProgram1[5].imetreninga;
        const naslov1 = document.getElementById("naslovtr1");
        naslov1.innerText = imetr1;
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
        const imetr1 = this.treningProgram1[5].imetreninga;
        const naslov1 = document.getElementById("naslovtr1");
        naslov1.innerText = imetr1;
      } catch (error) {
        console.log(error);
      }
    },
    async dohvatiUpperBody() {
      try {
        const response = await axios.get("http://localhost:3000/upperbody");
        this.treningProgram2 = response.data;
        console.log(this.treningProgram);
        const imetr2 = this.treningProgram2[7].imetreninga;
        const naslov2 = document.getElementById("naslovtr2");
        naslov2.innerText = imetr2;
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
        const imetr2 = this.treningProgram2[7].imetreninga;
        const naslov2 = document.getElementById("naslovtr2");
        naslov2.innerText = imetr2;
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
        const imetr2 = this.treningProgram2[7].imetreninga;
        const naslov2 = document.getElementById("naslovtr2");
        naslov2.innerText = imetr2;
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
    }
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 4vw;
}

.upute-tekst {
  font-size: 1.5vw;
}
#naslovplana {
  margin-top: 1.5vw;
  font-size: 3vw;
}
th,
td {
  text-align: left;
  padding: 0.2vw;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

h1 {
  margin-top: 10px;
  margin-bottom: 15px;
}

h2 {
  font-size: 2.5vw;
}
#naslovtr1 {
  margin-bottom: 1vw;
}

#naslovtr2 {
  margin-bottom: 1vw;
}

.animacije {
  width: 7vw;
}
</style>
