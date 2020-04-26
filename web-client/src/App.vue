<template>
  <div id="app">
    <p v-if="!mustLogin && !isAuthenticated">Loading...</p>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: "App",
  async mounted() {
    await this.$store.dispatch("authentication/authenticate");
  },
  computed: {
    mustLogin() {
      return this.$store.getters["authentication/mustLogin"];
    },
    isAuthenticated() {
      return this.$store.getters["authentication/isAuthenticated"];
    },
  },
  watch: {
    mustLogin(newVal) {
      if (newVal === true) {
        this.$router.push("login");
      }
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
#app {
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
