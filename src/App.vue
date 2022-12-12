<template>
  <div id="app">

    <Header></Header>
    <Home></Home>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/views/Header';
import Home from '@/views/Home';
import Footer from '@/views/Footer';
export default {
  name: 'App',
  components: {
    Header, Footer, Home
  }
};
</script>

<style>
html {
  font-size: 62.5%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
