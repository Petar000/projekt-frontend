<template>
  <div class="stranica-pitanja">
    <img src="../assets/learntotrain1.png" alt="Logo" class ="trainLogo">
    <h2 style = "margin-top: 150px;">1. Koji dio tijela bi htio znatno više napredovati?</h2>

    <button class = "my-button1">Trup</button>
    <button class = "my-button1">Donji dio</button>
    <button class = "my-button1">Podjednako</button>
    
    <h2>2. Koliko puta tjedno bi htio trenirati? (preporučeno 3 ili 4)</h2>
    <button class = "my-button2">2</button>
    <button class = "my-button2">3</button>
    <button class = "my-button2">4</button>

    <button @click="isanswered" id = "dalje">Nastavi</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      prviKliknut: false,
      drugiKliknut: false
    };
  },

  mounted() {  

document.querySelectorAll('.my-button1').forEach(button => {
  button.addEventListener('click', () => {
    this.prviKliknut = true;
    document.querySelectorAll('.my-button1').forEach(b => {
      b.style.backgroundColor = '';
      b.style.color = '';
    });
    button.style.backgroundColor = '#001BFF';
    button.style.color = 'white';
  });
});
document.querySelectorAll('.my-button2').forEach(button => {
  button.addEventListener('click', () => {
    this.drugiKliknut = true;
    document.querySelectorAll('.my-button2').forEach(b => {
      b.style.backgroundColor = '';
      b.style.color = '';
    });
    button.style.backgroundColor = '#001BFF';
    button.style.color = 'white';
  });
});

  },
  methods: {
    tips() {
      this.$router.push({ name: 'Savjeti' });
    },
    isanswered() {
      if (this.prviKliknut == true && this.drugiKliknut == true){
        this.tips();
      }
    }
  }
};
</script>

<style scoped>
  .my-button1{
  background-color: #2DA6E8;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 20px;
  margin-bottom: 50px;
  border-radius: 4px;
}
.my-button2{
  background-color: #2DA6E8;
  margin:20px 30px;
  border-radius: 4px;
}
.stranica-pitanja{
  background-image: url(../assets/pozadina2.jpg);
  background-size: 100%;
}
#dalje {
  position: fixed;
  padding: 30px 40px;
  border-radius: 8px;
  font-size: 20px;
  bottom: 30px;
  right: 30px;
}
</style>