<template>
  <div class="container-fluid bg-img2 vh-100 d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex row justify-content-start align-items-start">
        <img src="../assets/learntotrain1.png" alt="Logo" class="trainLogo2 img-fluid" />
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="pitanje1"> 1. Koji dio tijela bi htio znatno više napredovati?</h2>
      </div>
      <div class="col-4">
        <button class="my-button1" style="margin-left:15vw;">Trup</button>
      </div>
      <div class="col-4">
        <button class="my-button1">Donji dio</button>
      </div>
      <div class="col-4">
        <button class="my-button1" style="margin-right:15vw;">Podjednako</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="pitanje2">2. Koliko puta tjedno bi htio trenirati? (preporučeno 3 ili 4)</h2>
      </div>
      <div class="col-4">
        <button class="my-button2" style="margin-left:15vw;">2</button>
      </div>
      <div class="col-4">
        <button class="my-button2">3</button>
      </div>
      <div class="col-4">
        <button class="my-button2" style="margin-right:15vw;">4</button>
      </div>
    </div>
    <button @click="isanswered" id="dalje">Nastavi</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prviKliknut: false,
      drugiKliknut: false,
    };
  },

  mounted() {
    document.querySelectorAll(".my-button1").forEach((button) => {
      button.addEventListener("click", () => {
        this.prviKliknut = true;
        document.querySelectorAll(".my-button1").forEach((b) => {
          b.style.backgroundColor = "";
          b.style.color = "";
        });
        button.style.backgroundColor = "#001BFF";
        button.style.color = "white";
      });
    });
    document.querySelectorAll(".my-button2").forEach((button) => {
      button.addEventListener("click", () => {
        this.drugiKliknut = true;
        document.querySelectorAll(".my-button2").forEach((b) => {
          b.style.backgroundColor = "";
          b.style.color = "";
        });
        button.style.backgroundColor = "#001BFF";
        button.style.color = "white";
      });
    });
  },
  methods: {
    tips() {
      this.$router.push({ name: "Savjeti" });
    },
    isanswered() {
      if (this.prviKliknut == true && this.drugiKliknut == true) {
        this.tips();
      }
    },
  },
};
</script>

<style scoped>

.my-button1 {
  font-size: 2vw;
  border-radius: 1vw;
  padding: 1.5vw 2.2vw;
}
.my-button2 {
  font-size: 2vw;
  border-radius: 1vw;
  padding: 1.5vw 2.5vw;
}

#dalje {
  position: absolute;
  bottom: 1.8vw;
  right: 1.8vw;
  font-size: 2.4vw;
  border-radius: 1vw;
  padding: 1.5vw 2.4vw;
}
.pitanje1{
  font-size: 3vw;
  margin-bottom: 2vw;
}
.pitanje2{
  font-size: 3vw;
  margin-top: 5vw;
  margin-bottom: 2vw;
}
</style>