<template>
  <div v-cloak>
    <ul v-if="lowerBody">
      <li v-for="vjezba in lowerBody.vježbe" :key="vjezba.ime">
        {{ vjezba.ime }} - {{ vjezba.serija }}x{{ vjezba.min_ponavljanja }}-{{
          vjezba.max_ponavljanja
        }}@{{ vjezba.rpe }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lowerBody: null,
    };
  },
  mounted() {
    fetch("http://localhost:3000/lowerbody")
      .then((response) => response.json())
      .then((data) => {
        console.log("objekt");
        console.log(data);
        console.log("objekt");
        alert(data);
        this.lowerBody = data;
        console.log(this.lowerBody);
      });
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
