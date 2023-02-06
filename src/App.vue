<template>
  <nav>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  height: 90vh;
   width: 90vw;
   margin: 0;
   padding: 0;
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

button {
  padding: 20px 30px;
  font-size: 16px;
  background-color: #2DA6E8;
  color: black;
  border: none;
  cursor: pointer;
}

h1 {
  font-weight: bold;
  margin-bottom: 100px;
}

.stranica-pitanja{
  position:fixed;
  height: 100%;
  width: 100%;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #34F21A;
  color: white;
}

.savjeti{
  background-color: #34F21A;
  color: white;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
}

.trainLogo{
    position: fixed;
    width: 200px;
    left: 0px;
  }

p {
  font-size: 30px;
}
</style>


