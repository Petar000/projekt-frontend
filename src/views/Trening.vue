<template>
<h1>Plan treninga</h1>
<h2>Full body A</h2>
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
    <tr v-for="(vježba, index) in treningProgram" :key="index">
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
    treningProgram: {},
    mojiOdgovori: {},
  };
},
mounted() {
  axios.get('http://localhost:3000/odgovori')
    .then(response => {
      const data = JSON.parse(JSON.stringify(response.data));
      this.mojiOdgovori = data;
      console.log("odgovorii nakon json", this.mojiOdgovori);
    })
    .catch(error => {
      console.log(error);
    });

    this.provjeriOdgovore();
  },

methods: {

dohvati() {
  axios.get("http://localhost:3000/fullbody1")
      .then(response => {
      this.treningProgram = response.data;
      console.log(this.treningProgram);
      })
      .catch(error => {
        console.log(error);
  });
},

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

  if (this.mojiOdgovori[0].drugiOdgovor === "2" || this.mojiOdgovori[0].drugiOdgovor === "3") {
    console.log("usli smo u if");
    await this.dohvatiFullBody1();
  } else if (this.mojiOdgovori[0].drugiOdgovor === "4" && this.mojiOdgovori[0].prviOdgovor === "Podjednako") {
    await this.dohvatiFullBody2();
  } else if (this.mojiOdgovori[0].drugiOdgovor === "4" && this.mojiOdgovori[0].prviOdgovor === "Trup") {
    await this.dohvatiUpperBody();
  } else if (this.mojiOdgovori[0].drugiOdgovor === "4" && this.mojiOdgovori[0].prviOdgovor === "Donji dio") {
    await this.dohvatiLowerBody();
  }
},

async dohvatiFullBody1() {
try {
  const response = await axios.get("http://localhost:3000/fullbody1");
  this.treningProgram = response.data;
  console.log(this.treningProgram);
} catch (error) {
  console.log(error);
}
},
async dohvatiFullBody2() {
try {
  const response = await axios.get("http://localhost:3000/fullbody2");
  this.treningProgram = response.data;
  console.log(this.treningProgram);
} catch (error) {
  console.log(error);
}
},
async dohvatiLowerBody() {
try {
  const response = await axios.get("http://localhost:3000/lowerbody");
  this.treningProgram = response.data;
  console.log(this.treningProgram);
} catch (error) {
  console.log(error);
}
},
async dohvatiLowerBodyViseGornji() {
try {
  const response = await axios.get("http://localhost:3000/lowerbody-visegornji");
  this.treningProgram = response.data;
  console.log(this.treningProgram);
} catch (error) {
  console.log(error);
}
},
async dohvatiLowerBodyViseDonji() {
try {
  const response = await axios.get("http://localhost:3000/lowerbody-visedonji");
  this.treningProgram = response.data;
  console.log(this.treningProgram);
} catch (error) {
  console.log(error);
}
},
async dohvatiUpperBody() {
try {
  const response = await axios.get("http://localhost:3000/upperbody");
  this.treningProgram = response.data;
  console.log(this.treningProgram);
} catch (error) {
  console.log(error);
}
},
async dohvatiUpperBodyViseGornji() {
try {
  const response = await axios.get("http://localhost:3000/upperbody-visegornji");
  this.treningProgram = response.data;
  console.log(this.treningProgram);
} catch (error) {
  console.log(error);
}
},
async dohvatiUpperBodyViseDonji() {
try {
  const response = await axios.get("http://localhost:3000/upperbody-visedonji");
  this.treningProgram = response.data;
  console.log(this.treningProgram);
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