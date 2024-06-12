<template>
  <div class="container-fluid bg-img2 vh-100 d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex row justify-content-start align-items-start">
      <img src="../assets/learntotrain1.png" alt="Logo" class="trainLogo2 img-fluid" />
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="pitanje2">
          2. Koji dio tijela bi htio znatno više unaprijediti?
        </h2>
      </div>
      <div class="col-3">
        <button class="my-button1">Trup</button>
      </div>
      <div class="col-4">
        <button class="my-button1">Donji dio</button>
      </div>
      <div class="col-3">
        <button class="my-button1">Podjednako</button>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="pitanje3" v-if="odgovori.prviOdgovor === 'U teretani'">
          3. Koliko puta tjedno bi htio trenirati? (preporučeno 3 ili 4)
        </h2>
        <h2 class="pitanje3" v-if="odgovori.prviOdgovor === 'Kod kuće'">
          3. Koliko puta tjedno bi htio trenirati?
        </h2>
      </div>
      <div v-if="odgovori.prviOdgovor === 'U teretani'">
        <div class="row justify-content-center">
          <div class="col-4">
            <button class="my-button2" style="margin-left: 15vw">2</button>
          </div>
          <div class="col-4">
            <button class="my-button2">3</button>
          </div>
          <div class="col-4">
            <button class="my-button2" style="margin-right: 15vw">4</button>
          </div>
        </div>
      </div>
      <div v-if="odgovori.prviOdgovor === 'Kod kuće'">
        <div class="row justify-content-center">
          <div class="col-4">
            <button class="my-button2" style="margin-left: 15vw">3</button>
          </div>
          <div class="col-4">
            <button class="my-button2">4</button>
          </div>
          <div class="col-4">
            <button class="my-button2" style="margin-right: 15vw">5</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="isanswered" id="dalje">Nastavi</button>
  </div>
</template>

<script>
import axios from "axios";
import router from '../router/index'
import { odgovori } from "../views/Pitanja.vue"

export default {
  data() {
    return {
      drugiKliknut: false,
      treciKliknut: false,
      odgovori,
    };
  },

  mounted() {
    if (router.currentRoute.value.path !== 'Pitanja2'){
      document.querySelectorAll(".my-button1").forEach((b) => {
        b.style.backgroundColor = "#2DA6E8";
        b.style.color = "black";
      });
      document.querySelectorAll(".my-button2").forEach((b) => {
        b.style.backgroundColor = "#2DA6E8";
        b.style.color = "black";
      });
    }

    console.log(this.odgovori);

    document.querySelectorAll(".my-button1").forEach((button) => {
      button.addEventListener("click", () => {
        this.drugiKliknut = true;
        document.querySelectorAll(".my-button1").forEach((b) => {
          b.style.backgroundColor = "";
          b.style.color = "";
        });
        button.style.backgroundColor = "#001BFF";
        button.style.color = "white";

        this.odgovori.drugiOdgovor = button.textContent;
      });
    });
    document.querySelectorAll(".my-button2").forEach((button) => {
      button.addEventListener("click", () => {
        this.treciKliknut = true;
        document.querySelectorAll(".my-button2").forEach((b) => {
          b.style.backgroundColor = "";
          b.style.color = "";
        });
        button.style.backgroundColor = "#001BFF";
        button.style.color = "white";

        this.odgovori.treciOdgovor = button.textContent;
      });
    });
  },
  methods: {
    saveObject() {
      axios
        .put(
          "https://learntotrain-backend.onrender.com/odgovori",
          this.odgovori
        )
        .then((response) => {
          console.log("Objekt ažuriran");
        })
        .catch((error) => {
          console.error(error);
        });

      this.tips();
    },
    tips() {
      this.$router.push({ name: "Savjeti" });
      document.querySelectorAll(".my-button1").forEach((b) => {
        b.style.backgroundColor = "#2DA6E8";
        b.style.color = "black";
      });
      document.querySelectorAll(".my-button2").forEach((b) => {
        b.style.backgroundColor = "#2DA6E8";
        b.style.color = "black";
      });
    },
    isanswered() {
      console.log(this.odgovori);
      if (this.drugiKliknut == true && this.treciKliknut == true) {
        this.saveObject();
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

.my-button2 {
  font-size: 2vw;
  border-radius: 1vw;
  padding: 1.5vw 2.5vw;
  transition: transform 0.2s ease;
}

.my-button2:active {
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

.pitanje2 {
  font-size: 3vw;
  margin-bottom: 2vw;
}

.pitanje3 {
  font-size: 3vw;
  margin-top: 5vw;
  margin-bottom: 2vw;
}

@media (max-width: 768px) {
  body {
    overflow: hidden;
  }

  .pitanje2 {
    font-size: 6vw;
  }

  .pitanje3 {
    font-size: 6vw;
  }

  .my-button1 {
    font-size: 4vw;
    border-radius: 2vw;
    padding: 3vw 4vw;
  }

  .my-button2 {
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
}
</style>
