<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.trainLogo2{
  width: 16%;
  position: absolute;
  top: 0;
  left: 0;
  }

.bg-img2{
color:white;
background-image: url(../src/assets/pozadina3.jpg);
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
}

button {
  background-color: #2DA6E8;
  color: black;
  border: none;
  cursor: pointer;
}

h1 {
  font-weight: bold;
}

p {
  font-size: 2.8vw;
}
</style>


