<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';

// Fonction pour appliquer le thème globalement
const appliquerTheme = () => {
  // Récupérer le thème sauvegardé ou utiliser 'light' par défaut
  const theme = localStorage.getItem('theme') || 'light';
  
  // Appliquer le thème au body
  document.body.setAttribute('data-theme', theme);
  
  // Si le thème est 'auto', écouter les changements de préférence système
  if (theme === 'auto') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Appliquer le thème initial basé sur la préférence système
    document.body.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
  }
};

// Appliquer le thème au montage de l'application
onMounted(() => {
  appliquerTheme();
});
</script>
