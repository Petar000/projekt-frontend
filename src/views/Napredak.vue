<template>
  <div class="navbar navbar-expand-lg navbar-light traka">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <button @click="idiNaHome" id="idihome">Naslovna stranica</button>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="idiNaTrening()">Povratak na trening</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container-fluid vh-90 d-flex align-items-top justify-content-center">
    <div class="container-fluid">
      <h1>Praćenje podataka o napredku</h1>
      <div style="overflow-x: auto">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-dark table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th class="duzi-th">Opseg natkoljenice</th>
                      <th>Opseg bokova</th>
                      <th>Opseg struka</th>
                      <th>Opseg prsa</th>
                      <th class="duzi-th">Opseg nadlaktice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(mjera, index) in mjere.objekti" :key="index">
                      <td>Tjedan {{ index + 1 }}</td>
                      <td>
                        <input v-model="mjera.natkoljenica" type="number" min="0" id="natkoljenica" />
                      </td>
                      <td>
                        <input v-model="mjera.bokovi" type="number" min="0" id="bokovi" />
                      </td>
                      <td>
                        <input v-model="mjera.struk" type="number" min="0" id="struk" />
                      </td>
                      <td>
                        <input v-model="mjera.prsa" type="number" min="0" id="prsa" />
                      </td>
                      <td>
                        <input v-model="mjera.nadlaktica" type="number" min="0" id="nadlaktica" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="botuni">
            <button @click="spremiMjere" class="btn btn-primary" id="spremanje">
              Spremi mjere
            </button>
            <button @click="izbrisiMjere" class="btn btn-danger" id="brisanje">
              Izbriši podatke o napretku
            </button>
          </div>
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
      mjere: {
        sessionId: this.$sessionId,
        objekti: [
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
          {
            natkoljenica: null,
            bokovi: null,
            struk: null,
            prsa: null,
            nadlaktica: null,
          },
        ],
      },
      dohvaceneMjere: [],
    };
  },
  mounted() {
    console.log('sessionId vrijednost: ', this.$sessionId)
    this.dohvatiMjere();
  },

  methods: {
    async izbrisiMjere() {
      this.mjere.objekti.forEach((mjera) => {
        mjera.natkoljenica = null;
        mjera.bokovi = null;
        mjera.struk = null;
        mjera.prsa = null;
        mjera.nadlaktica = null;
      });
      try {
        const response = await axios.delete("https://learntotrain-backend.onrender.com/izbrisisve", {
          params: {
            sessionId: this.$sessionId
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    spremiMjere() {
      console.log(this.mjere);
      axios
        .post("https://learntotrain-backend.onrender.com/mjere", this.mjere)
        .then((response) => {
          console.log("Objekt spremljen");
          console.log(this.mjere);
          this.dohvatiMjere();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async dohvatiMjere() {
      try {
        const response = await axios.get("https://learntotrain-backend.onrender.com/mjere", {
          params: {
            sessionId: this.$sessionId
          }
        });
        this.dohvaceneMjere = response.data;
        console.log("stigle mjere", this.dohvaceneMjere);
        this.spremiUTablicu();
      } catch (error) {
        console.log(error);
      }
    },

    async spremiUTablicu() {
      console.log('Struktura dohvaceneMjere:', this.dohvaceneMjere);

      const praveMjere = this.dohvaceneMjere.rezultati.objekti;

      for (let i = 0; i < this.mjere.objekti.length; i++) {
        this.mjere.objekti[i].natkoljenica = praveMjere[i].natkoljenica;
        this.mjere.objekti[i].bokovi = praveMjere[i].bokovi;
        this.mjere.objekti[i].struk = praveMjere[i].struk;
        this.mjere.objekti[i].prsa = praveMjere[i].prsa;
        this.mjere.objekti[i].nadlaktica = praveMjere[i].nadlaktica;
      }
    },

    idiNaTrening() {
      this.$router.push({ name: "Trening" });
    },
    idiNaHome() {
      this.$router.push({ name: "home" });
    },
    idiNaMjere() {
      this.$router.push({ name: "Napredak" });
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  box-shadow: 0px 0px 10px #888;
}

.table-responsive {
  overflow-x: auto;
  overflow-y: auto;
}

.table-responsive input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.botuni {
  display: flex;
  justify-content: space-evenly;
}

#brisanje {
  padding: 0.8vw;
  font-size: 1.2vw;
  font-weight: bold;
  margin-left: 1vw;
}

#spremanje {
  padding: 0.8vw;
  font-size: 1.2vw;
  font-weight: bold;
}

#idihome {
  font-weight: bold;
  border-radius: 0.5vw;
  color: white;
  background-color: #001bff;
}

#idihome:hover {
  color: lightgrey;
}

h1 {
  font-weight: bold;
  font-size: 3vw;
  margin-top: 3vw;
  margin-bottom: 1.5vw;
}

@media (max-width: 768px) {
  #idihome{
    margin-top: 3vw;
  }
  th{
    font-size: 2.3vw;
  }
  td{
    font-size: 2.3vw;
  }
  .duzi-th{
    font-size: 2vw;
  }
  h1 {
    font-size: 6.5vw;
    margin-bottom: 5vw;
  }

  #spremanje {
    font-size: 3.2vw;
    padding: 2.3vw;
  }

  #brisanje {
    font-size: 3.2vw;
    padding: 2.3vw;
  }
}
</style>
