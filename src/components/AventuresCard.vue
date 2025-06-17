<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ aventure.titre }}</ion-card-title>
      <ion-card-subtitle>{{ aventure.date }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      {{ aventure.description }}
    </ion-card-content>
  </ion-card>
</template>

<script setup>
defineProps({
  aventure: Object
})
</script>
