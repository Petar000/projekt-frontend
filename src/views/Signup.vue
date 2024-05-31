<template>
  <section class="h-100 gradient-form" style="background-color: #f7f7f7;">
    <div class="container py-4">
      <div class="row justify-content-center align-items-center">
        <div class="col-xl-8">
          <div class="card rounded-3 text-black shadow-lg">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-3 mx-md-3">
                  <div class="text-center mb-3">
                    <img src="../assets/learntotrain1.png" class="logo" alt="logo">
                    <h4 class="mt-1 mb-3 pb-1">Registriraj Se Sada!</h4>
                  </div>
                  <form>
                    <p class="text-center mb-3">Izradi korisnički račun</p>
                    <div data-mdb-input-init class="form-outline mb-3">
                      <input type="email" v-model="username" class="form-control" placeholder="Email" />
                    </div>
                    <div data-mdb-input-init class="form-outline mb-3">
                      <input type="password" v-model="password" class="form-control" placeholder="Nova lozinka" />
                    </div>
                    <div data-mdb-input-init class="form-outline mb-3">
                      <input type="password" v-model="passwordRepeat" class="form-control" placeholder="Ponovi lozinku" />
                    </div>
                    <p v-if="passwordsMatch === false || passwordLength === false" style="color: red; font-size: small;">
                      {{ errorMessage }}
                    </p>
                    <div class="text-center pt-1 mb-2">
                      <button data-mdb-button-init data-mdb-ripple-init
                        class="btn btn-primary btn-block gradient-custom-2 mb-3" type="button"
                        @click="registriraj">Registracija</button>
                    </div>
                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2" style="font-size: medium; opacity: 0.8;">Već imate račun?</p>
                      <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-danger"
                        @click="idiLogin">Prijavi se</button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-none d-lg-block d-xl-block">
                <div class="bg-light d-flex align-items-center justify-content-center">
                  <img src="../assets/background-login.jpg" class="img-fluid" alt="slika uz login">
                </div>
              </div>
            </div>
            <!-- Dodatak za mobilne uređaje -->
            <div class="dodatni-dizajn"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
//import { ref } from 'vue';
//import { app, auth } from './firebase';
//import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RouterLink } from 'vue-router';
import { auth } from './firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      username: '',
      password: '',
      passwordRepeat: '',
      passwordsMatch: true,
      passwordLength: true,
      errorMessage: ''
    };
  },

  methods: {
    registriraj() {
      if (this.password === this.passwordRepeat) {
        if (this.password.length >= 6) {
          createUserWithEmailAndPassword(auth, this.username, this.password)
            .then((result) => {
              console.log("Uspješna registracija");
              this.$router.replace({ name: "home" });
            })
            .catch((error) => {
              console.error("Došlo je do greške ", error);
              this.errorMessage = 'Email se već koristi.';
            });
        } else {
          this.errorMessage = 'Lozinka treba imati barem 6 znakova.';
          this.passwordLength = false;
        }
      } else {
        this.errorMessage = 'Lozinke se ne poklapaju.';
        this.passwordsMatch = false;
      }
    },

    idiLogin() {
      this.$router.push({ name: "login" });
    }
  },
};
</script>
  
<style scoped>
.gradient-custom-2 {
  background: linear-gradient(to right, #001bff, #2575fc);
}

.gradient-custom-2:hover {
  color: lightgrey;
}

.card {
  border-radius: 20px;
  overflow: hidden;
}

h4 {
  color: #2da6e8;
}

.form-outline .form-control {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-outline .form-control:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 5px rgba(106, 17, 203, 0.5);
}

.bg-light {
  background-color: #f7f7f7;
}

.text-center a {
  color: #6a11cb;
  text-decoration: none;
}

.text-center a:hover {
  text-decoration: underline;
}

.logo {
  width: 8vw;
}

@media (max-width: 992px) {
  .logo {
    width: 15vw;
  }
}

@media (max-width: 768px) {
  ::placeholder {
    font-size: medium;
  }

  .card-body {
    padding: 56px !important;
  }

  .logo {
    width: 20vw;
    margin-bottom: 5vw;
  }

  .col-lg-6 {
    order: 2;
  }

  .col-lg-6.bg-light {
    order: 1;
  }

  /* Dodatni stil za mobilne uređaje */
  .dodatni-dizajn {
    background-color: #2da6e8;
    height: 60px;
  }
}
</style>