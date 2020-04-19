# Ergo-One

## Description

Outils pour faciliter la création d'un bilan en ergothérapie.


## Cahier des charges

### Pour le patient

Le patient doit pouvoir:
- accéder à sa fiche de renseignements personnalisée
- remplir sa fiche de renseignements personnalisée
- modifier sa fiche de renseignements personnalisée
- imprimer sa fiche de renseignements pour la remplir à la main


### Pour l'ergothérapeute

L'ergothérapeute doit pouvoir:
- remplir la fiche de renseignements de n'importe quel patient
- remplir l'anamnèse de n'importe quel patient
- remplir la trame de bilan de n'importe quel patient
- remplir le bilan de n'importe quel patient
- accéder et modifier ces données même en l'absence d'une connection - la synchronisation se fait dès la connection rétablie
- envoyer chacun de ces documents par e-mail (pdf, word?)
- envoyer à chaque patient un lien vers sa fiche de renseignements personnalisée
- préremplir le bilan du patient sur base des réponses présentes dans les autres documents


### Sécurité

- Seule la fiche de renseignements peut être accessible sans s'enregistrer


## Liens utiles

- [Offline Storage for Progressive Web Apps](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [marked-forms](https://github.com/jldec/marked-forms)
- [marksup](https://github.com/bosky101/marksup)
- [wmd fork](https://github.com/brikis98/wmd)


## Développement

### Objectif n.1

- L'ergothérapeute peut accéder au site au moyen d'un identifiant + mot de passe
- L'ergothérapeute peut remplir l'anamnèse pour un patient et la sauver
- L'ergothérapeute peut remplir le bilan pour un patient et le sauver


### Objectif n.2

- L'ergothérapeute peut préremplir les champs du bilan sur base des champs de l'anamnèse


### Objectif n.3

- L'ergothérapeute peut modifier le formulaire de l'anamnèse en:
  - ajoutant des champs
  - supprimant des champs
  - changeant la formulation de certaines questions
  - modifiant le type des champs (texte, nombre)
- Un formulaire déjà rempli conserve tous ses champs, même si certains ont été enlevés/modifiés par l'ergothérapeute dans le template
