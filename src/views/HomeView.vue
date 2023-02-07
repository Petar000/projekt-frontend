<template>
  <div class="home-screen">
    <img src="../assets/learntotrain1.png" alt="Logo" class ="trainLogo">
    <h1 id = "naslov">Dobrodošli u aplikaciju za trening</h1>
    <p id = "oaplikaciji">Ova aplikacija je namijenjena za početnike u treningu s opterećenjem. 
      Služi za one kojima je glavni cilj dobiti mišićnu masu, ali i onima 
      kojima je glavni cilj smršavjeti, služi kako bi očuvali mišiće.</p>
    <button @click="idiNaPitanja" id = "idipitanja">Kreni</button>
  </div>
</template>

<script>
export default {
  methods: {
    idiNaPitanja() {
      this.$router.push({ name: 'Pitanja' });
    }
  }
}
</script>

<style scoped>
  #idipitanja{
    font-size: 20px;
    border-radius: 8px;
    position: fixed;
    padding: 30px 40px;
    bottom: 30px;
    right: 30px;
  }
  #naslov{
    position: fixed;
    top: 200px;
    left: 400px;
    font-size: 50px;
    font-weight: bold;
  }
  #oaplikaciji{
    position:fixed;
    top: 380px;
  }
  .home-screen {
  background-image: url(../assets/background_1.jpg);
  background-size: 100%;
  position: fixed;
  left: 0px;
  top:0px;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  color: white;
  background-color:#34F21A;
}
</style>