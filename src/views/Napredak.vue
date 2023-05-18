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
            <a class="nav-link" href="#" @click="idiNaTrening()"
              >Povratak na trening</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div
    class="container-fluid vh-90 d-flex align-items-top justify-content-center"
  >
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
                      <th>Opseg natkoljenice</th>
                      <th>Opseg bokova</th>
                      <th>Opseg struka</th>
                      <th>Opseg prsa</th>
                      <th>Opseg nadlaktice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(mjera, index) in mjere" :key="index">
                      <td>Tjedan {{ index + 1 }}</td>
                      <td>
                        <input
                          v-model="mjera.natkoljenica"
                          type="number"
                          min="0"
                          id="natkoljenica"
                        />
                      </td>
                      <td>
                        <input
                          v-model="mjera.bokovi"
                          type="number"
                          min="0"
                          id="bokovi"
                        />
                      </td>
                      <td>
                        <input
                          v-model="mjera.struk"
                          type="number"
                          min="0"
                          id="struk"
                        />
                      </td>
                      <td>
                        <input
                          v-model="mjera.prsa"
                          type="number"
                          min="0"
                          id="prsa"
                        />
                      </td>
                      <td>
                        <input
                          v-model="mjera.nadlaktica"
                          type="number"
                          min="0"
                          id="nadlaktica"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mjere: [
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
      dohvaceneMjere: [],
    };
  },
  mounted() {
    this.dohvatiMjere();
  },
  methods: {
    izbrisiMjere() {
      this.mjere.forEach((mjera) => {
        mjera.natkoljenica = null;
        mjera.bokovi = null;
        mjera.struk = null;
        mjera.prsa = null;
        mjera.nadlaktica = null;
      });
      axios
        .delete("https://learntotrain-backend.herokuapp.com/izbrisisve")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    spremiMjere() {
      console.log(this.mjere);
      axios
        .post("https://learntotrain-backend.herokuapp.com/mjere", this.mjere)
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
        const response = await axios.get("https://learntotrain-backend.herokuapp.com/mjere");
        this.dohvaceneMjere = response.data;
        console.log("stigle mjere", this.dohvaceneMjere);
        this.spremiUTablicu();
      } catch (error) {
        console.log(error);
      }
    },

    async spremiUTablicu() {
      const praveMjere = this.dohvaceneMjere[0].rezultati;

      this.mjere.forEach((mjera, index) => {
        mjera.natkoljenica = praveMjere[index].natkoljenica;
        mjera.bokovi = praveMjere[index].bokovi;
        mjera.struk = praveMjere[index].struk;
        mjera.prsa = praveMjere[index].prsa;
        mjera.nadlaktica = praveMjere[index].nadlaktica;
      });
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
  margin-right: 1vw;
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
</style>
