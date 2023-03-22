<template>
<h1>Plan treninga</h1>
<h2 id = "naslovtr1"></h2>
<table>
  <thead>
    <tr>
      <th>Ime vježbe</th>
      <th>Broj serija</th>
      <th>Broj ponavljanja</th>
      <th>RPE</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="vježba in treningProgram1" :key="vježba.ime">
      <td>{{ vježba.ime }}</td>
      <td>{{ vježba.serija }}</td>
      <td>{{ vježba.min_ponavljanja }} - {{ vježba.max_ponavljanja }}</td>
      <td>{{ vježba.rpe }}</td>
    </tr>
  </tbody>
</table>
<h2 id = "naslovtr2"></h2>
<table>
  <thead>
    <tr>
      <th>Ime vježbe</th>
      <th>Broj serija</th>
      <th>Broj ponavljanja</th>
      <th>RPE</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="vježba in treningProgram2" :key="vježba.ime">
      <td>{{ vježba.ime }}</td>
      <td>{{ vježba.serija }}</td>
      <td>{{ vježba.min_ponavljanja }} - {{ vježba.max_ponavljanja }}</td>
      <td>{{ vježba.rpe }}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import axios from 'axios'

export default {
data() {
  return {
    treningProgram1: {}, //prvi koji ce se prikazati
    treningProgram2: {}, // drugi koji ce se prikazati
    mojiOdgovori: {},
  };
},
mounted() {
  axios.get('http://localhost:3000/odgovori')
    .then(response => {
      this.mojiOdgovori = response.data;
      console.log("odgovorii nakon json", this.mojiOdgovori);
    })
    .catch(error => {
      console.log(error);
    });

    this.provjeriOdgovore();
  },

methods: {

async provjeriOdgovore() {
  await new Promise(resolve => {
    const checkMojiOdgovori = setInterval(() => {
      if (this.mojiOdgovori) {
        console.log("evo dosli odgovori", this.mojiOdgovori, this.mojiOdgovori[0].drugiOdgovor);
        clearInterval(checkMojiOdgovori);
        resolve();
      }
    }, 100);
  });

  if (this.mojiOdgovori[0].drugiOdgovor === "2") {
    await this.dohvatiFullBody1();
    await this.dohvatiFullBody2();
  } else if (this.mojiOdgovori[0].drugiOdgovor ==="3" && this.mojiOdgovori[0].prviOdgovor === "Podjednako") {
    await this.dohvatiFullBody1();
    await this.dohvatiFullBody2();
  } else if (this.mojiOdgovori[0].drugiOdgovor ==="3" && this.mojiOdgovori[0].prviOdgovor === "Trup") {
    await this.dohvatiLowerBody();
    await this.dohvatiUpperBody();
  } else if (this.mojiOdgovori[0].drugiOdgovor ==="3" && this.mojiOdgovori[0].prviOdgovor === "Donji dio") {
    await this.dohvatiLowerBody();
    await this.dohvatiUpperBody();
  } else if (this.mojiOdgovori[0].drugiOdgovor === "4" && this.mojiOdgovori[0].prviOdgovor === "Podjednako") {
    await this.dohvatiLowerBody();
    await this.dohvatiUpperBody();
  } else if (this.mojiOdgovori[0].drugiOdgovor === "4" && this.mojiOdgovori[0].prviOdgovor === "Trup") {
    await this.dohvatiLowerBodyViseGornji();
    await this.dohvatiUpperBodyViseGornji();
  } else if (this.mojiOdgovori[0].drugiOdgovor === "4" && this.mojiOdgovori[0].prviOdgovor === "Donji dio") {
    await this.dohvatiLowerBodyViseDonji();
    await this.dohvatiUpperBodyViseDonji();
  }
},

async dohvatiFullBody1() {
try {
  const response = await axios.get("http://localhost:3000/fullbody1");
  this.treningProgram1 = response.data;
  console.log("prije kreiranja naslova", this.treningProgram1);
  const imetr1 = this.treningProgram1[9].imetreninga;
  const naslov1 = document.getElementById("naslovtr1")
  naslov1.innerText = imetr1
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
  const naslov2 = document.getElementById("naslovtr2")
  naslov2.innerText = imetr2
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
  const naslov1 = document.getElementById("naslovtr1")
  naslov1.innerText = imetr1
} catch (error) {
  console.log(error);
}
},
async dohvatiLowerBodyViseGornji() {
try {
  const response = await axios.get("http://localhost:3000/lowerbody-visegornji");
  this.treningProgram1 = response.data;
  console.log(this.treningProgram);
  const imetr1 = this.treningProgram1[5].imetreninga;
  const naslov1 = document.getElementById("naslovtr1")
  naslov1.innerText = imetr1
} catch (error) {
  console.log(error);
}
},
async dohvatiLowerBodyViseDonji() {
try {
  const response = await axios.get("http://localhost:3000/lowerbody-visedonji");
  this.treningProgram1 = response.data;
  console.log(this.treningProgram);
  const imetr1 = this.treningProgram1[5].imetreninga;
  const naslov1 = document.getElementById("naslovtr1")
  naslov1.innerText = imetr1
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
  const naslov2 = document.getElementById("naslovtr2")
  naslov2.innerText = imetr2
} catch (error) {
  console.log(error);
}
},
async dohvatiUpperBodyViseGornji() {
try {
  const response = await axios.get("http://localhost:3000/upperbody-visegornji");
  this.treningProgram2 = response.data;
  console.log(this.treningProgram);
  const imetr2 = this.treningProgram2[7].imetreninga;
  const naslov2 = document.getElementById("naslovtr2")
  naslov2.innerText = imetr2
} catch (error) {
  console.log(error);
}
},
async dohvatiUpperBodyViseDonji() {
try {
  const response = await axios.get("http://localhost:3000/upperbody-visedonji");
  this.treningProgram2 = response.data;
  console.log(this.treningProgram);
  const imetr2 = this.treningProgram2[7].imetreninga;
  const naslov2 = document.getElementById("naslovtr2")
  naslov2.innerText = imetr2
} catch (error) {
  console.log(error);
}
},

},
};

</script>

<style scoped>
table {
border-collapse: collapse;
width: 100%;
}

th, td {
text-align: left;
padding: 8px;
border-bottom: 1px solid #ddd;
}

th {
background-color: #f2f2f2;
}

h1 {
margin-top: 10px;
margin-bottom: 15px;
}
</style>