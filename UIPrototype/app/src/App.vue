<template>
  <div id="app">
    <nav class = "navbar navbar-expand navbar-dark bg-primary">
        <router-link to="/xq-events" class="navbar-brand"> XingQiao </router-link>
      <ul class="navbar-nav ml-auto">

        <form class="form-inline"> <!--action="/action_page.php"> -->
          <input class="form-control mr-sm-2 ml-auto" type="text" placeholder="Search">
          <button class="btn btn-success" type="submit">Search</button>
        </form>

        <li class="nav-item custom-font-size">
          <router-link to = "/register" class="nav-link">Register</router-link>
        </li>

        <li class="nav-item custom-font-size">
          <router-link to = "/login" class="nav-link">LogIn</router-link>
        </li>

      </ul>
    </nav>  

    <div class="container mt-3">
      <router-view />
    </div>

  </div>
</template>



<script>
export default {
  name: 'App'
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.custom-font-size .nav-link {
  font-size: 14px;
}
</style>
