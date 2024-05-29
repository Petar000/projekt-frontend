<template>
  <div>
    <div class="navbar navbar-expand-lg navbar-dark traka" style="padding: 0; background-color: #444;">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center w-100 gornji-botuni" style="margin: 1vw 0;">
          <a @click="idiNaTrening" href="#" id="trening-povratak">Povratak na trening</a>
          <p style="font-size:small;" class="justify-content-center align-items-center"></p>
          <button class="odjava btn btn-primary btn-md" @click="idiNaLogin">Odjavi se</button>
        </div>
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
                      <th class="col-1">#</th>
                      <th class="col-2">Opseg bedra</th>
                      <th class="col-2">Opseg bokova</th>
                      <th class="col-2">Opseg struka</th>
                      <th class="col-2">Opseg prsa</th>
                      <th class="col-2">Opseg ruke</th>
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
          <div class="botuni-kontenjer">
          <div class="botuni">
            <button @click="spremiMjere" class="btn btn-primary" id="spremanje">
              Spremi mjere
            </button>
          </div>
          <div class="botuni">
            <button @click="izbrisiMjere" class="btn btn-danger" id="brisanje">
              Izbriši podatke o napretku
            </button>
          </div>
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

  // Odaberite sve botune unutar elemenata s klasom .botuni
  const botuni = document.querySelectorAll('.botuni');

// Dodajte event listener za svaki link
botuni.forEach(botun => {
  botun.addEventListener('click', function(event) {
    // Spriječite defaultno ponašanje botuna
    event.preventDefault();

    // Dodajte .clicked klasu samo kliknutom botunu
    this.classList.add('clicked');

    // Postavite timer za uklanjanje .clicked klase nakon 200ms
    setTimeout(() => {
      this.classList.remove('clicked');
    }, 200);
  });
});
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

    idiNaLogin(){
      this.$router.push({ name: "login" })
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

.botuni-kontenjer {
  margin-bottom: 1vw;
  display: flex;
  justify-content: space-evenly;
}
  .botuni.clicked {
    transform: scale(1.15); /* Uvećavamo link kad je kliknut */
    transition: transform 0.2s ease;
  }
.odjava {
  font-size: medium; 
  padding: 0.5vw 1vw;
  width: auto; /* Podešavanje širine na automatsko */
  margin: 0.5vw 1.5vw;
  background-color: dimgray;
  border: none;
}
.odjava:hover{
  margin-right: 2vw;
  color: lightgrey;
}
#trening-povratak {
  width: auto;
  white-space: nowrap;
  font-size: medium; 
  color: white;
  text-decoration: none;
  font-weight: bold;
}
#trening-povratak:hover {
  color: lightgray;
}
.gornji-botuni{
  height: 2vw;
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

h1 {
  font-weight: bold;
  font-size: 3vw;
  margin-top: 3vw;
  margin-bottom: 1.5vw;
}

@media (max-width: 768px) {
  #idihome {
    margin-top: 3vw;
  }

  th {
    font-size: 2.3vw;
  }

  td {
    font-size: 2.1vw;
  }

  h1 {
    font-size: 6.3vw;
    margin-top: 5vw;
    margin-bottom: 4.5vw;
  }

  #spremanje {
    font-size: 2.8vw;
    padding: 1.8vw;
  }

  #brisanje {
    font-size: 2.8vw;
    padding: 1.6vw;
  }
  .botuni-kontenjer {
  margin-bottom: 2vw;
}
.gornji-botuni{
  height: 8vw;
}
}
</style>
