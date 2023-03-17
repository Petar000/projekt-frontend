<template>
  <div class="container-fluid bg-img vh-100 d-flex align-items-center justify-content-center">
    <div class="container-fluid home-screen">
        <div class="d-flex row justify-content-start align-items-start">
          <img src="../assets/learntotrain1.png" alt="Logo" class="trainLogo img-fluid" />
        </div>
        <div class="row justify-content-center align-items-center">
          <h1 id="naslov">Dobrodošli u aplikaciju za trening</h1>
          <p id="oaplikaciji">
            Ova aplikacija je namijenjena za početnike u treningu s
            opterećenjem. Služi za one kojima je glavni cilj dobiti mišićnu
            masu, ali i onima kojima je glavni cilj smršavjeti, koristi kako bi
            očuvali mišiće.
          </p>
        </div>
        <button @click="idiNaPitanja" id="idipitanja">Kreni</button>
      </div>
    </div>
  
</template>

<script>
export default {
  methods: {
    idiNaPitanja() {
      this.$router.push({ name: "Pitanja" });
    },
  },
};
</script>

<style scoped>
#idipitanja {
  position: absolute;
  bottom: 2vw;
  right: 2vw;
  font-size: 2.6vw;
  border-radius: 1.3vw;
  padding: 1.3vw 3vw;
}
#naslov {
  font-size: 4.3vw;
  font-weight: bold;
  margin-bottom: 3vw;
}
#oaplikaciji {
}
.home-screen {
  color: white;
}
.bg-img {
  background-image: url(../assets/background_2.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
body{
  margin: 0px;
  padding: 0px;
}
.trainLogo{
  width: 16%;
  position: absolute;
  top: 0;
  left: 0;
  }

</style>
