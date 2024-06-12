<template>
  <div class="container-fluid bg-img2 vh-100 d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex row justify-content-start align-items-start">
      <img src="../assets/learntotrain1.png" alt="Logo" class="trainLogo2 img-fluid" />
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="pitanje1 mb-3">
          1. Gdje bi htio trenirati?
        </h2>
      </div>
      <div class="col-1"></div>
      <div class="col-5">
        <button class="my-button1">Kod kuće</button>
        <img src="../assets/kod-kuce.png" alt="U teretani" class="img-fluid mt-2 slicice" />
      </div>
      <div class="col-5">
        <button class="my-button1">U teretani</button>
        <img src="../assets/u-teretani.png" alt="U teretani" class="img-fluid mt-2 slicice" />
      </div>
      <div class="col-1"></div>
    </div>
    <p class="potrebne-bucice">(Za trening kod kuće potrebne su samo bučice)</p>
    <button @click="isanswered" id="dalje">Nastavi</button>
  </div>
</template>
  
<script>
import axios from "axios";

export const odgovori = {};

export default {
  data() {
    return {
      prviKliknut: false,
      odgovori,
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

        this.odgovori.prviOdgovor = button.textContent;
      });
    });
  },
  methods: {
    tips() {
      this.$router.push({ name: "Pitanja2" });
      document.querySelectorAll(".my-button1").forEach((b) => {
        b.style.backgroundColor = "#2DA6E8";
        b.style.color = "black";
      });
    },
    isanswered() {
      console.log(this.odgovori);
      if (this.prviKliknut == true) {
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
  transition: transform 0.1s ease;
}

.my-button1:active {
  transform: scale(1.2);
}

#dalje {
  position: absolute;
  bottom: 1.8vw;
  right: 1.8vw;
  font-size: 2.4vw;
  border-radius: 1vw;
  padding: 1.5vw 2.4vw;
}

.pitanje1 {
  font-size: 3vw;
  margin-bottom: 2vw;
}

.potrebne-bucice {
  margin-top: 2.5vw;
  font-size: 2.2vw;
}

.slicice {
  margin-left: 1vw;
  border-radius: 2vw;
  width: 40%;
}

@media (max-width: 768px) {
  body {
    overflow: hidden;
  }

  .pitanje1 {
    font-size: 6vw;
  }

  .my-button1 {
    font-size: 4vw;
    border-radius: 2vw;
    padding: 3vw 4vw;
  }

  #dalje {
    bottom: 6vw;
    right: 4.5vw;
    font-size: 4vw;
    border-radius: 3vw;
    padding: 3.8vw 5.7vw;
  }

  .slicice {
    margin-left: 0;
    width: 80%;
  }

  .potrebne-bucice {
    font-size: medium;
  }
}
</style>
  