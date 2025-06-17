<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Dashboard secondaire</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>Bienvenue sur le Dashboard</h1>

      <ion-item>
        <ion-label position="floating">Entrez votre prénom</ion-label>
        <ion-input v-model="prenom" placeholder="Votre prénom"></ion-input>
      </ion-item>

      <p>Bonjour {{ prenom }}</p>

      <ion-button @click="showAlert = true"> 
        Dire Bonjour
      </ion-button>

      <ion-alert
        :is-open="showAlert"
        header="Bonjour"
        :message="`Bonjour ${prenom} !`"
        :buttons="['OK']"
        @didDismiss="showAlert = false">
      </ion-alert>

      <ion-list>
        <ion-item v-for="(elements,index) in elements" :key="index">
          {{ elements.nom}} 
           <ion-badge slot="end" color="primary">
            {{ elements.nb }}
          </ion-badge>
          
        </ion-item>
          <ion-label>
            {{ elements.nom }} ({{ elements.nb }})
          </ion-label>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonLabel, IonInput, IonItem,
  IonButton, IonAlert
} from '@ionic/vue';

const prenom = ref('');
const showAlert = ref(false);

const elements = ref([  
  {nom:'message',nb:3},
  { nom: 'Notifications', nb: 2 },
  { nom: 'Mise a jour', nb: 1 },
  { nom: 'Mes taches', nb: 4 }
])
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
}
</style>
