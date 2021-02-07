<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="css">
html, body{
  overflow-y: hidden;
  height: 100% !important;
  width: 100% !important;
}
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100% !important;
  width: 100% !important;

}

#nav {
  padding: 0;
  display: none;

  a {
    font-weight: bold;
    color: #2c3e50;

    /* &.router-link-exact-active {
      color: #42b983;
    } */
  }
}
.btn_primary {
  background-color: #3f51b5 !important;
  color: #fafafa !important;
  width: 80px;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
 #nav{
   display: none;
 }
  }
</style>
