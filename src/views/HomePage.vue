<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="header-toolbar">
        <ion-title class="header-title">Mon Carnet d'Aventures</ion-title>
        <ion-buttons slot="end">
          <ion-button 
            fill="clear" 
            color="light"
            @click="presentMenu"
            class="menu-button"
          >
            <ion-icon :icon="menuOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <!-- Message d'introduction -->
      <div class="welcome-container fade-in">
        <div class="welcome-icon-container">
          <ion-icon :icon="bookOutline" size="large" class="welcome-icon"></ion-icon>
        </div>
        <h1 class="welcome-title">Bienvenue dans votre Carnet d'Aventures</h1>
        <p class="welcome-description">Capturez et partagez vos moments les plus précieux. 
           Ajoutez vos aventures, organisez-les par catégories et revivez vos souvenirs.</p>
      </div>

      <!-- Boutons de navigation -->
      <div class="navigation-buttons">
        <ion-button 
          expand="block" 
          color="primary" 
          @click="navigateTo('/ajouter-aventure')"
          class="nav-button gradient-button">
          <ion-icon :icon="addOutline" slot="start"></ion-icon>
          Ajouter une Aventure
        </ion-button>

        <ion-button 
          expand="block" 
          color="secondary" 
          @click="navigateTo('/liste-aventures')"
          class="nav-button gradient-button-secondary">
          <ion-icon :icon="listOutline" slot="start"></ion-icon>
          Voir mes Aventures
        </ion-button>

        <ion-button 
          expand="block" 
          color="tertiary" 
          @click="navigateTo('/params')"
          class="nav-button">
          <ion-icon :icon="settingsOutline" slot="start"></ion-icon>
          Paramètres
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonIcon,
  IonButtons,
  actionSheetController
} from '@ionic/vue';
import { 
  bookOutline, 
  addOutline, 
  listOutline, 
  settingsOutline,
  menuOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

// Utilisation du router pour la navigation
const router = useRouter();

// Fonction pour naviguer vers une page spécifique
const navigateTo = (path: string) => {
  router.push(path);
};

// Fonction pour afficher le menu
const presentMenu = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'Menu de Navigation',
    buttons: [
      {
        text: 'Accueil',
        icon: bookOutline,
        handler: () => {
          router.push('/home');
        }
      },
      {
        text: 'Ajouter une Aventure',
        icon: addOutline,
        handler: () => {
          router.push('/ajouter-aventure');
        }
      },
      {
        text: 'Mes Aventures',
        icon: listOutline,
        handler: () => {
          router.push('/liste-aventures');
        }
      },
      {
        text: 'Paramètres',
        icon: settingsOutline,
        handler: () => {
          router.push('/params');
        }
      },
      {
        text: 'Annuler',
        role: 'cancel'
      }
    ]
  });
  await actionSheet.present();
};
</script>

<style scoped>
.header-toolbar {
  background: var(--app-gradient-primary);
  border-radius: 0 0 20px 20px;
  box-shadow: var(--app-shadow);
}

.header-title {
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-button {
  color: white;
  --color: white;
  font-size: 1.2rem;
}

.welcome-container {
  text-align: center;
  margin: 2rem 0 3rem 0;
  padding: 2rem;
  background: var(--ion-card-background);
  border-radius: var(--app-border-radius);
  box-shadow: var(--app-shadow);
  border: 1px solid var(--ion-item-border-color);
}

.welcome-icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--app-gradient-primary);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.welcome-icon {
  font-size: 2.5rem;
  color: white;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--ion-text-color);
  background: var(--app-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--ion-color-medium);
  margin-bottom: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.nav-button {
  margin: 0;
  height: 4rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  box-shadow: var(--app-shadow);
  transition: all 0.3s ease;
}

.nav-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--app-shadow-hover);
}

.nav-button ion-icon {
  margin-right: 0.75rem;
  font-size: 1.3rem;
}

/* Animation d'entrée pour les boutons */
.navigation-buttons .nav-button:nth-child(1) {
  animation: slideInUp 0.6s ease-out 0.1s both;
}

.navigation-buttons .nav-button:nth-child(2) {
  animation: slideInUp 0.6s ease-out 0.2s both;
}

.navigation-buttons .nav-button:nth-child(3) {
  animation: slideInUp 0.6s ease-out 0.3s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .welcome-container {
    margin: 1rem 0 2rem 0;
    padding: 1.5rem;
  }
  
  .welcome-title {
    font-size: 1.6rem;
  }
  
  .welcome-description {
    font-size: 1rem;
  }
  
  .navigation-buttons {
    gap: 1rem;
  }
  
  .nav-button {
    height: 3.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-icon-container {
    width: 60px;
    height: 60px;
  }
  
  .welcome-icon {
    font-size: 2rem;
  }
  
  .welcome-title {
    font-size: 1.4rem;
  }
}
</style>
