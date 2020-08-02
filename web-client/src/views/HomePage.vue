<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <router-link :to="{ name: 'HomePage' }">
        <img alt="Logo" src="../assets/logo-magali.png" />
      </router-link>
    </div>
    <nav :class="$style.sidebar">
      <router-link :to="{ name: 'AnamnesePage' }">Anamnèse</router-link>
      <button :class="$style.logoutButton" @click="logout">
        <log-out-icon :class="$style.buttonIcon" size="2x" />
        <span>Déconnexion</span>
      </button>
    </nav>
    <div :class="$style.main">
      <p>Salut Mag. Tu es connectée.</p>
    </div>
  </div>
</template>

<script>
import { LogOutIcon } from "vue-feather-icons";
export default {
  name: "HomePage",
  components: {
    LogOutIcon,
  },
  methods: {
    async logout() {
      await this.$store.dispatch("authentication/logout");
      await this.$router.push({ name: "LoginPage" });
    },
  },
};
</script>

<style lang="scss" module>
.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 130px auto;
  grid-template-columns: 200px auto;
}
.header {
  grid-row: 1;
  grid-column: 1 / span 2;
}
.sidebar {
  grid-row: 2;
  grid-column: 1;
  background-color: yellowgreen;
  padding: 20px 10px;

  .logoutButton {
    background-color: yellowgreen;
    color: white;
    font-size: 16px;
    display: flex;
    align-items: center;
    border: none;
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;

    .buttonIcon {
      margin-right: 10px;
    }
  }

  .logoutButton:hover {
    background-color: darken(yellowgreen, 10%);
  }
}
.main {
  grid-row: 2;
  grid-column: 2;
  box-shadow: inset 5px 5px 5px lightgray;
  padding: 20px;
}
</style>
