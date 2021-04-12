<template>
  <div id="app" data-app>
    <router-view/>
  </div>
</template>
<style lang="scss">
html, body{
 overflow-y: auto!important;
 height:100vh;
 width: 100vw !important;
}
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100vh !important;
  width: 100vw !important;

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
.btn-primary {
  background-color: #002b4b !important;
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
