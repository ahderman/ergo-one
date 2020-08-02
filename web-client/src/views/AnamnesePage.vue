<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <router-link :to="{ name: 'AnamnesePage' }">
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
      <div v-if="isFetchInProgress">Initialisation en cours...</div>
      <div v-else-if="isFetchSuccessful">Initialisation réussie</div>
      <div v-else-if="isFetchFailed">Erreur pendant l'initialisation</div>
      <div v-if="isSaveInProgress">Sauvegarde en cours...</div>
      <div v-else-if="isSaveSuccessful">Sauvegarde réussie</div>
      <div v-else-if="isSaveFailed">Erreur pendant la sauvegarde</div>
      <h1>Anamnèse</h1>
      <div id="anamneseForm" v-html="anamneseHtml"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { LogOutIcon } from "vue-feather-icons";
import { parseMarkdown } from "@/services/mardown-parser";
import { Anamnese } from "@/types";

const markdownDocument = `
## Présentation générale

[Date ??](presentation-generale-date)

[Prénom ??](presentation-generale-prenom)

[Nom ??](presentation-generale-nom)

[Âge ??](presentation-generale-age)

[Classe ??](presentation-generale-classe)

## Cite 3 mots...

[Enfant ??](trois-mots-enfant)

[Parents pour l'enfant ??](trois-mots-parents-pour-enfant)
`;

export default Vue.extend({
  name: "AnamnesePage",
  components: {
    LogOutIcon,
  },
  data() {
    return {
      anamneseHtml: "",
    };
  },
  async beforeMount() {
    this.anamneseHtml = parseMarkdown(markdownDocument);
  },
  async mounted(): Promise<void> {
    await this.$store.dispatch("anamnese/fetchAnamnese");
    this.populateFields(this.getDocument);
    this.setupListeners();
  },
  methods: {
    async logout(): Promise<void> {
      await this.$store.dispatch("authentication/logout");
      await this.$router.push({ name: "LoginPage" });
    },
    createInputListener(el: HTMLInputElement) {
      return () =>
        this.$store.dispatch("anamnese/setField", {
          name: el.id,
          value: el.value,
        });
    },
    setupListeners(): void {
      const anamneseForm = document.getElementById(
        "anamneseForm"
      ) as HTMLElement;
      const inputFields = anamneseForm.querySelectorAll("input");

      inputFields.forEach((el) => {
        el.oninput = this.createInputListener(el);
      });
    },
    populateFields(anamnese: Anamnese): void {
      Object.entries(anamnese).forEach(
        ([elementId, value]) =>
          ((document.getElementById(
            elementId
          ) as HTMLInputElement).value = value)
      );
    },
  },
  computed: {
    ...mapGetters({
      getDocument: "anamnese/getDocument",
      isSaveInProgress: "apiRequestStatus/isSaveAnamneseInProgress",
      isSaveSuccessful: "apiRequestStatus/isSaveAnamneseSuccessful",
      isSaveFailed: "apiRequestStatus/isSaveAnamneseFailed",
      isFetchInProgress: "apiRequestStatus/isFetchAnamneseInProgress",
      isFetchSuccessful: "apiRequestStatus/isFetchAnamneseSuccessful",
      isFetchFailed: "apiRequestStatus/isFetchAnamneseFailed",
    }),
  },
});
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
label {
  display: block;
}
</style>
