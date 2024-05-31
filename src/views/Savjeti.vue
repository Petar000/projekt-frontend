<template>
  <div class="container-fluid bg-img2 vh-100 d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex row justify-content-start align-items-start">
      <img src="../assets/learntotrain1.png" alt="Logo" class="trainLogo2 img-fluid" />
    </div>
    <div class="row justify-content-center align-items-center">
      <p>
        Uz trening s opterećenjem predlažemo i kardio trening 1 do 2 puta tjedno
        ovisno o potrebama, zbog kardiovaskularnog zdravlja.
      </p>
      <p>
        Za najbolje rezultate, savjetujemo praćenje unosa kalorija i dovoljan unos
        proteina. Ne preporučamo ekstremno nizak unos kalorija te rigorozne
        dijete.
      </p>
    </div>
    <button @click="pocetak" id="pocetak">Započni</button>
  </div>
</template>

<style scoped>
#pocetak {
  position: absolute;
  bottom: 1.8vw;
  right: 1.8vw;
  font-size: 2.4vw;
  border-radius: 2vw;
  padding: 1.5vw 2.4vw;
}

@media (max-width: 768px) {
  #pocetak {
    bottom: 6vw;
    right: 4.5vw;
    font-size: 4vw;
    border-radius: 3vw;
    padding: 3.8vw 5.7vw;
  }
  body {
    overflow: hidden;
  }
}
</style>

<script>
export default {
  methods: {
    pocetak() {
      this.$router.push({ name: "Trening" });
    },
  }
};
</script>
