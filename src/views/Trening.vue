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
      <tr v-for="(vježba, index) in lowerBody" :key="index">
        <td>{{ vježba.ime }}</td>
        <td>{{ vježba.serija }}</td>
        <td>{{ vježba.min_ponavljanja }} - {{ vježba.max_ponavljanja }}</td>
        <td>{{ vježba.rpe }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      lowerBody: {},
    };
  },
  mounted() {
    fetch("http://localhost:3000/fullbody1")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.lowerBody = data;
        console.log(this.lowerBody);
      })
      .catch((error) => console.log(error));
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
