<template>
    <div class = "savjeti">
        <img src="../assets/learntotrain1.png" alt="Logo" class ="trainLogo">
        <p style = "margin-top: 250px;">Uz trening s opterećenjem predlažemo i kardio trening
            1 do 2 puta tjedno ovisno o potrebama,
            zbog kardiovaskularnog zdravlja.
        </p>
        <p id = "savjet2">
            Za najbolje rezultate, predlažemo praćenje unosa kalorija
            i dovoljan unos proteina. Ne preporučamo ekstremno nizak
            unos kalorija te rigorozne dijete.
        </p>
        <button @click="pocetak" id = "pocetak">Započni</button>
    </div>
</template>

<style scoped>
#pocetak{
        position: fixed;
        padding: 30px 40px;
        bottom: 20px;
        right: 20px;
    }
    
.savjeti{
    background-image: url(../assets/pozadina2.jpg);
    background-size: 100%;
}
    #savjet2{
        margin-bottom: 200px;
    }
</style>

<script>
export default {
  methods: {
    pocetak() {
      this.$router.push({ name: 'Trening' });
    }
  }
}
</script>
