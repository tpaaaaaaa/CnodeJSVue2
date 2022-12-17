<template>
  <div id="app">

    <Header></Header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer v-if="this.$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  name: 'App',
  components: {
    Header, Footer
  }

};
</script>

<style>
body {
  background-color: #fff;
  font-size: 14px;
}

html {
  font-size: 62.5%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

a {
  color: black;
  text-decoration: none;
}
</style>
