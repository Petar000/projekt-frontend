<template>
  <div>
    <!-- Gornji dio stranice s korisničkim imenom i opcijom za odjavu -->
    <div class="navbar navbar-expand-lg navbar-light traka" style="background-color: lightgray; padding: 0;">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center w-100">
          <button @click="idiNaHome" class="home btn btn-md">Naslovna stranica</button>
          <p style="font-size:small;" class="justify-content-center align-items-center"></p>
          <button class="odjava btn btn-primary btn-md" @click="Odjavi">Odjavi se</button>
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
          <div v-if="odgovori.prviOdgovor !== 'Kod kuće' || odgovori.treciOdgovor !== '3'">
            <li class="nav-item">
              <a class="nav-link" href="#" id="tr2kliknut" @click="pokaziTrening2()">Trening 2</a>
            </li>
          </div>
          <div
            v-if="(odgovori.prviOdgovor === 'Kod kuće' && odgovori.treciOdgovor === '4' && odgovori.drugiOdgovor !== 'Podjednako') || (odgovori.prviOdgovor === 'Kod kuće' && odgovori.drugiOdgovor === 'Podjednako' && odgovori.treciOdgovor === '5')">
            <li class="nav-item">
              <a class="nav-link" href="#" id="tr3kliknut" @click="pokaziTrening3()">Trening 3</a>
            </li>
          </div>
          <li class="nav-item">
            <a class="nav-link" href="#" id="uputekliknute" @click="pokaziUpute()">Upute</a>
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
            <div v-if="trening3Kliknut">
              <h1>{{ putaTjedno3 }}</h1>
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
                  <template v-for="(vježba, index) in treningProgram3" :key="vježba.ime">
                    <tr v-if="vježba.serija !== undefined">
                      <td @click="() => prikaziPovecanuSliku3(vježba.slika, index)">{{ vježba.ime }}</td>
                      <td @click="() => prikaziPovecanuSliku3(vježba.slika, index)">{{ vježba.serija }}</td>
                      <td @click="() => prikaziPovecanuSliku3(vježba.slika, index)">
                        {{ vježba.min_ponavljanja }} -
                        {{ vježba.max_ponavljanja }}
                      </td>
                      <td @click="() => prikaziPovecanuSliku3(vježba.slika, index)">{{ vježba.rpe }}</td>
                      <td @click="() => prikaziPovecanuSliku3(vježba.slika, index)">
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
      <div v-if="(uputeKliknut) && (odgovori.prviOdgovor === 'U teretani')">
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
          <p>
            <a @click="openPopup" class="popup-link">Kako skratiti vrijeme treninga?</a>
          </p>
          <div v-if="popupVisible" class="popup">
            <button @click="closePopup" class="close-btn">X</button>
            <p id="popup-tekst">
              Ukoliko želite optimizirati vrijeme provedeno na treningu, preporučujemo
              implementaciju superserija za gornji dio tijela.
              Superserija se definira kao serija vježbi u kojoj se izvode dvije vježbe za različite mišićne
              skupine.
              <br> <br>
              Primjerice, vježba za prsa i leđa jedna za drugom, nakon čega
              slijedi odgovarajuća pauza.
            </p>
          </div>
        </div>
      </div>
      <div v-if="(uputeKliknut) && (odgovori.prviOdgovor === 'Kod kuće')">
        <div class="stranica-uputa">
          <h1>Upute za trening</h1>
          <p class="upute-tekst">
            Pauza između svake serije je između 1.5 i 2.5 minute - nije strogo
            određena. Za svaku vježbu ukoliko izlazi van zadanog broja ponavljanja dodati opterećenje pomoću bučica.
            Cilj je svaki tjedan progresivno povećavati broj ponavljanja na vježbama u zadanom rasponu
            ili dodavati opterećenje s utezima.
          </p>
          <h2>Što je RPE?</h2>
          <p class="upute-tekst">
            RPE skala (Rate of Perceived Exertion) označava skalu od 1-10 kojom
            ocjenjujemo težinu svake serije tako da procjenimo koliko smo još
            ponavljanja mogli napraviti u njoj prije nego bi ostali bez snage.
            Broj ponavljanja u rezervi oduzimamo od broja 10 kako bi dobili
            vrijednost skale. Na primjer ako bi odradili seriju čućnja i
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
import { auth } from './firebase'
import { signOut } from "firebase/auth";
import axios from "axios";
import { odgovori } from './Pitanja.vue';

export default {
  data() {
    return {
      treningProgram1: {}, //prvi koji ce se prikazati
      treningProgram2: {}, // drugi koji ce se prikazati
      treningProgram3: {}, // treci koji ce se mozda prikazati
      odgovori,
      putaTjedno1: "",
      putaTjedno2: "",
      putaTjedno3: "",
      mojiOdgovori: "",
      trening1Kliknut: false, //u metodi na kraju se postavlja u true ovisno sta se klikne
      trening2Kliknut: false,
      trening3Kliknut: false,
      uputeKliknut: false,
      modalPrikazan: false, // stanje modalnog prozora
      modalniSadrzaj: "",
      popupVisible: false,
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
    this.tr3 = document.getElementById("tr3kliknut");
    this.upute = document.getElementById("uputekliknute");
    console.log("ovo su upute getelementbyid ", this.upute)
    console.log("ovo je tr3 getelementbyid ", this.tr3)
    this.pokaziTrening1();

    // Svi linkovi unutar elemenata s klasom .nav-item
    const links = document.querySelectorAll('.nav-item a');

    // Dodajte event listener za svaki link
    links.forEach(link => {
      link.addEventListener('click', function (event) {
        // Spriječeno defaultno ponašanje linka
        event.preventDefault();

        // Dodana .clicked klasa samo kliknutom linku
        this.classList.add('clicked');

        // Postavljen timer za uklanjanje .clicked klase nakon 200ms
        setTimeout(() => {
          this.classList.remove('clicked');
        }, 200);
      });
    });
  },

  methods: {
    async provjeriOdgovore() {
      await new Promise((resolve) => {
        const checkMojiOdgovori = setInterval(() => {
          if (this.mojiOdgovori) {
            console.log(
              "evo dosli odgovori",
              this.mojiOdgovori,
              this.mojiOdgovori.treciOdgovor
            );
            clearInterval(checkMojiOdgovori);
            resolve();
          }
        }, 100);
      });

      const prviOdgovor = this.mojiOdgovori[0].prviOdgovor;
      const drugiOdgovor = this.mojiOdgovori[0].drugiOdgovor;
      const treciOdgovor = this.mojiOdgovori[0].treciOdgovor;

      if (prviOdgovor === "U teretani") {
        if (treciOdgovor === "2") {
          await this.dohvatiFullBody1();
          await this.dohvatiFullBody2();
          this.putaTjedno1 = "1xtjedno Full Body A";
          this.putaTjedno2 = "1xtjedno Full Body B";
        } else if (treciOdgovor === "3") {
          if (drugiOdgovor === "Podjednako") {
            this.putaTjedno1 = "2xtjedno Full Body A";
            this.putaTjedno2 = "1xtjedno Full Body B";
            await this.dohvatiFullBody1();
            await this.dohvatiFullBody2();
          } else if (drugiOdgovor === "Trup") {
            this.putaTjedno1 = "1xtjedno Lower Body";
            this.putaTjedno2 = "2xtjedno Upper Body";
            await this.dohvatiLowerBody();
            await this.dohvatiUpperBody();
          } else if (drugiOdgovor === "Donji dio") {
            this.putaTjedno1 = "2xtjedno Lower Body";
            this.putaTjedno2 = "1xtjedno Upper Body";
            await this.dohvatiLowerBody();
            await this.dohvatiUpperBody();
          }
        } else if (treciOdgovor === "4") {
          this.putaTjedno1 = "2xtjedno Lower Body";
          this.putaTjedno2 = "2xtjedno Upper Body";
          if (drugiOdgovor === "Podjednako") {
            await this.dohvatiLowerBody();
            await this.dohvatiUpperBody();
          } else if (drugiOdgovor === "Trup") {
            await this.dohvatiLowerBodyViseGornji();
            await this.dohvatiUpperBodyViseGornji();
          } else if (drugiOdgovor === "Donji dio") {
            await this.dohvatiLowerBodyViseDonji();
            await this.dohvatiUpperBodyViseDonji();
          }
        }

      } else if (treciOdgovor === "3") {
        if (drugiOdgovor === "Podjednako") {
          this.putaTjedno1 = "3xtjedno Full Body";
          await this.dohvatiFullBodyKuci();
        } else if (drugiOdgovor === "Trup") {
          this.putaTjedno1 = "1xtjedno Lower Body";
          this.putaTjedno2 = "2xtjedno Upper Body";
          await this.dohvatiLowerBodyKuci();
          await this.dohvatiUpperBodyKuci();
        } else if (drugiOdgovor === "Donji dio") {
          this.putaTjedno1 = "2xtjedno Lower Body";
          this.putaTjedno2 = "1xtjedno Upper Body";
          await this.dohvatiLowerBodyKuci();
          await this.dohvatiUpperBodyKuci();
        }
      } else if (treciOdgovor === "4") {
        if (drugiOdgovor === "Podjednako") {
          this.putaTjedno1 = "2xtjedno Lower Body";
          this.putaTjedno2 = "2xtjedno Upper Body";
          await this.dohvatiLowerBodyKuci();
          await this.dohvatiUpperBodyKuci();
        } else if (drugiOdgovor === "Trup") {
          this.putaTjedno1 = "1xtjedno Lower Body";
          this.putaTjedno2 = "2xtjedno Upper Body";
          this.putaTjedno3 = "1xtjedno Full Body";
          // DODAT I 1xtjedno FULLBODY
          await this.dohvatiLowerBodyKuci();
          await this.dohvatiUpperBodyKuci();
          await this.dohvatiFullBodyKuci();
        } else if (drugiOdgovor === "Donji dio") {
          this.putaTjedno1 = "2xtjedno Lower Body";
          this.putaTjedno2 = "1xtjedno Upper Body";
          this.putaTjedno3 = "1xtjedno Full Body";
          // DODAT I 1xtjedno FULLBODY
          await this.dohvatiLowerBodyKuci();
          await this.dohvatiUpperBodyKuci();
          await this.dohvatiFullBodyKuci();
        }
      } else if (treciOdgovor === "5") {
        if (drugiOdgovor === "Podjednako") {
          this.putaTjedno1 = "2xtjedno Lower Body";
          this.putaTjedno2 = "2xtjedno Upper Body";
          this.putaTjedno3 = "1xtjedno Full Body";
          await this.dohvatiLowerBodyKuci();
          await this.dohvatiUpperBodyKuci();
          await this.dohvatiFullBodyKuci();
        } else if (drugiOdgovor === "Trup") {
          this.putaTjedno1 = "2xtjedno Lower Body";
          this.putaTjedno2 = "3xtjedno Upper Body";
          await this.dohvatiLowerBodyKuci();
          await this.dohvatiUpperBodyKuci();
        } else if (drugiOdgovor === "Donji dio") {
          this.putaTjedno1 = "3xtjedno Lower Body";
          this.putaTjedno2 = "2xtjedno Upper Body";
          await this.dohvatiLowerBodyKuci();
          await this.dohvatiUpperBodyKuci();
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

    async dohvatiFullBodyKuci() {
      try {
        const response = await axios.get(
          "https://learntotrain-backend.onrender.com/fullbody-kuci"
        );
        if (odgovori.prviOdgovor === "Kod kuće" && odgovori.treciOdgovor === "3") {
          this.treningProgram1 = response.data;
          console.log(this.treningProgram1);
        } else {
          this.treningProgram3 = response.data;
          console.log(this.treningProgram3);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async dohvatiLowerBodyKuci() {
      try {
        const response = await axios.get(
          "https://learntotrain-backend.onrender.com/lowerbody-kuci"
        );
        this.treningProgram1 = response.data;
        console.log(this.treningProgram1);
      } catch (error) {
        console.log(error);
      }
    },

    async dohvatiUpperBodyKuci() {
      try {
        const response = await axios.get(
          "https://learntotrain-backend.onrender.com/upperbody-kuci"
        );
        this.treningProgram2 = response.data;
        console.log(this.treningProgram1);
      } catch (error) {
        console.log(error);
      }
    },

    async pokaziTrening1() {
      this.trening1Kliknut = true;
      this.trening2Kliknut = false;
      this.trening3Kliknut = false;
      this.uputeKliknut = false;
      this.tr1.style.color = "gray";
      if (this.tr2) {
        this.tr2.style.color = "";
      }
      if (this.tr3) {
        this.tr3.style.color = "";
      }
      this.upute.style.color = "";
    },
    async pokaziTrening2() {
      this.trening1Kliknut = false;
      this.trening2Kliknut = true;
      this.trening3Kliknut = false;
      this.uputeKliknut = false;
      this.tr2.style.color = "gray";
      this.tr1.style.color = "";
      if (this.tr3) {
        this.tr3.style.color = "";
      }
      this.upute.style.color = ""; // Ode se dogada GRESKA, ovo se uopce ne promjeni pri klikom na trening
    },
    async pokaziTrening3() {
      this.trening1Kliknut = false;
      this.trening2Kliknut = false;
      this.trening3Kliknut = true;
      this.uputeKliknut = false;
      this.tr3.style.color = "gray";
      this.tr1.style.color = "";
      this.tr2.style.color = "";
      this.upute.style.color = "";
    },
    async pokaziUpute() {
      this.trening1Kliknut = false;
      this.trening2Kliknut = false;
      this.trening3Kliknut = false;
      this.uputeKliknut = true;
      this.upute.style.color = "gray";
      this.tr1.style.color = ""; // OVO RADI i ovo se promjeni
      this.tr2.style.color = "";
      this.tr3.style.color = "";
    },

    idiNaHome() {
      this.$router.push({ name: "home" });
    },

    idiNaMjere() {
      this.$router.push({ name: "Napredak" });
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
    prikaziPovecanuSliku3(slika, index) {
      this.modalniSadrzaj = this.treningProgram3[index].slika;
      this.modalPrikazan = true;
    },

    openPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },

    Odjavi() {
      auth.signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    },
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 4vw;
  box-shadow: 0px 0px 10px 3px #888;
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

#glavni-naslov {
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
  background-color: rgba(0, 0, 0, 0.5);
  /* poluprozirni overlay */
  z-index: 1000;
  /* visok indeks z-ordera da bi bio iznad ostalog sadržaja */
}

/* Stilizacija slike unutar modalnog prozora */
.modal img {
  max-width: 80%;
  max-height: 80%;
  border-radius: 7px;
  /* zaobljeni rubovi slike */
  box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.5);
  /* sjena oko slike */
}

.navbar {
  padding: 1vw 2vw;
}

.btn {
  width: auto !important;
  /* Vraćanje širine na auto */
}

.traka {
  border-radius: 0;
  /* Uklanjanje zaobljenih rubova */
}

.fixed-bottom {
  bottom: 0;
  /* Postavljanje donje trake na dno stranice */
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
  overflow-x: auto;
}

.home {
  background-color: darkgray;
  font-size: medium;
  padding: 0.5vw 1vw;
  width: auto;
  margin: 0.5vw 1.5vw;
}

.odjava {
  font-size: medium;
  padding: 0.5vw 1vw;
  width: auto;
  /* Podešavanje širine na automatsko */
  margin: 0.5vw 1.5vw;
  background-color: darkgrey;
  border: none;
}

.nav-item a {
  transition: transform 0.2s ease;
}

.nav-item a.clicked {
  transform: scale(1.15);
  /* Uvećavamo link kad je kliknut */
}

.navbar-nav .nav-item {
  overflow: hidden;
}

table tr:hover {
  cursor: pointer;
}

.popup-link {
  cursor: pointer;
  color: #137cbd;
  font-size: 2.2vw;
  text-decoration: underline;
}

.popup-link:hover {
  color: #2da6e8;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 1.5vw;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
}

#popup-tekst {
  font-size: 1.8vw;
}

.close-btn {
  position: absolute;
  padding: 0 0.4vw;
  top: 0.5vw;
  right: 0.6vw;
  background: #137cbd;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 2vw;
}

@media (max-width: 1024px) {

  .animacije {
    width: 95px;
    height: 64px;
  }

  .navbar-expand-lg .navbar-collapse {
    flex-basis: 100%;
    display: flex !important;
    flex-basis: auto;
    flex-grow: 1;
    overflow: hidden;
    height: auto;
  }
}

@media (min-width: 800px) {
  .fixed-bottom {
    height: 3vw;
  }
}

@media (max-width: 768px) {
  #navbarNav {
    height: 8vw;
    bottom: 0;
  }

  .home {
    border-radius: 1.5vw;
    margin: 1.2vw 1.5vw;
  }

  .odjava {
    border-radius: 1.5vw;
    margin: 1.2vw 1.5vw;
  }

  .nav-link {
    font-size: small;
  }

  .navbar-nav {
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

  #glavni-naslov {
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

  .popup-link {
    font-size: 3.4vw;
  }

  #popup-tekst {
    font-size: 3vw;
  }

  .close-btn {
    padding: 0.5vw 1.2vw;
    top: 0.7vw;
    right: 0.8vw;
    font-size: 3vw;
    border-radius: 1vw;
  }
}
</style>
