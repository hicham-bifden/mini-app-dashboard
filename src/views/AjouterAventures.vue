<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ajouter une aventure</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div ref="formContainer" class="form-container">

        <ion-item>
          <ion-label position="floating">Titre</ion-label>
          <ion-input
  :value="titre"
  @ionInput="(e) => titre.value = e.detail.value"
/>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea v-model="description" />
        </ion-item>

        <ion-item>
          <ion-label position="floating">Date</ion-label>
          <ion-datetime display-format="YYYY-MM-DD" v-model="date" />
        </ion-item>

        <ion-item>
          <ion-label>Catégorie</ion-label>
          <ion-select v-model="categorie">
            <ion-select-option value="Voyage">Voyage</ion-select-option>
            <ion-select-option value="Famille">Famille</ion-select-option>
            <ion-select-option value="Travail">Travail</ion-select-option>
            <ion-select-option value="Autre">Autre</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-button expand="block" @click="ajouter">Ajouter</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createAnimation } from '@ionic/vue'
import { ajouterAventure } from '../state/state.js'
import { useRouter } from 'vue-router'

const titre = ref('')
const description = ref('')
const date = ref('')
const categorie = ref('')
const router = useRouter()

const ajouter = () => {
  if (!titre.value || !description.value ) {
    alert(titre.value)
    return
  }

  ajouterAventure({
    titre: titre.value,
    description: description.value,
    date: date.value,
    categorie: categorie.value
  })

  // Réinitialiser le formulaire
  //titre.value = ''
  description.value = ''
  date.value = ''
  categorie.value = ''

  // Revenir à la liste des aventures
  router.push('/liste')
}

// Animation à l’apparition du formulaire
const formContainer = ref(null)

onMounted(() => {
  const animation = createAnimation()
    .addElement(formContainer.value)
    .duration(600)
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateY(20px)', 'translateY(0)')
  animation.play()
})
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
