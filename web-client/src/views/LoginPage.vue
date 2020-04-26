<template>
  <div :class="$style.pageContainer">
    <form :class="$style.loginForm" @submit.prevent="login">
      <h1 :class="$style.formTitle">Se connecter</h1>
      <div :class="$style.formField">
        <label>Nom d'utilisateur</label>
        <input required v-model="credentials.username" type="text" />
      </div>
      <div :class="$style.formField">
        <label>Mot de passe</label>
        <input required v-model="credentials.password" type="password" />
      </div>
      <div :class="$style.buttonRow">
        <button :class="$style.loginButton" type="submit">
          Connexion
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Credentials } from "../store/authentication/authentication";

export default {
  name: "LoginPage",
  data() {
    return {
      credentials: new Credentials(),
    };
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push({ name: "HomePage" });
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["authentication/isAuthenticated"];
    },
  },
  methods: {
    async login() {
      console.log(this.credentials);
      await this.$store.dispatch("authentication/login", this.credentials);
      await this.$store.dispatch("authentication/authenticate");
    },
  },
  watch: {
    isAuthenticated() {
      console.log("isAuthenticated()");
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>

<style lang="scss" module>
.pageContainer {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.loginForm {
  background-color: #eeeeee;
  padding: 30px;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 2px 2px 10px 2px #ccc;
}

.formTitle {
  text-align: center;
}

.formField {
  label {
    display: block;
  }
  margin-bottom: 20px;
}

.buttonRow {
  display: flex;
  justify-content: flex-end;

  .loginButton {
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    color: white;
    background-color: yellowgreen;
  }
  .loginButton:hover {
    background-color: darken(yellowgreen, 10%);
  }
}

.buttonContents:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
