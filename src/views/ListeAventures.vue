<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" class="back-button"></ion-back-button>
        </ion-buttons>
        <ion-title class="header-title">Liste des aventures</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div v-if="state.aventures.length === 0" class="empty-state fade-in">
        <div class="empty-icon-container">
          <ion-icon :icon="bookOutline" size="large" class="empty-icon"></ion-icon>
        </div>
        <h2 class="empty-title">Aucune aventure enregistrée</h2>
        <p class="empty-description">Commencez par ajouter votre première aventure pour créer votre carnet de souvenirs.</p>
        <ion-button 
          color="primary" 
          router-link="/ajouter-aventure"
          class="add-first-button gradient-button">
          <ion-icon :icon="addOutline" slot="start"></ion-icon>
          Ajouter ma première aventure
        </ion-button>
      </div>
      
      <div v-else class="aventures-container fade-in">
        <div class="aventures-header">
          <h2 class="aventures-title">
            <ion-icon :icon="listOutline" class="title-icon"></ion-icon>
            Mes Aventures ({{ state.aventures.length }})
          </h2>
          <p class="aventures-subtitle">Retrouvez tous vos souvenirs et moments précieux</p>
        </div>
        
        <div class="aventures-grid">
          <AventuresCard 
            v-for="aventure in state.aventures" 
            :key="aventure.id" 
            :aventure="aventure"
            class="aventure-item"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { state } from '../state/state.js'
import AventuresCard from '../components/AventuresCard.vue'
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon
} from '@ionic/vue'
import { 
  bookOutline, 
  addOutline, 
  listOutline 
} from 'ionicons/icons'

const router = useRouter()
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

.back-button {
  color: white;
  --color: white;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: var(--ion-color-light);
  border-radius: 50%;
  margin-bottom: 2rem;
  border: 3px solid var(--ion-item-border-color);
}

.empty-icon {
  font-size: 3rem;
  color: var(--ion-color-medium);
}

.empty-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--ion-text-color);
}

.empty-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--ion-color-medium);
  margin-bottom: 2rem;
}

.add-first-button {
  height: 3.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  box-shadow: var(--app-shadow);
}

.aventures-container {
  max-width: 1200px;
  margin: 0 auto;
}

.aventures-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: var(--ion-card-background);
  border-radius: var(--app-border-radius);
  box-shadow: var(--app-shadow);
  border: 1px solid var(--ion-item-border-color);
}

.aventures-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--ion-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.title-icon {
  color: var(--ion-color-primary);
}

.aventures-subtitle {
  font-size: 1.1rem;
  color: var(--ion-color-medium);
  margin: 0;
}

.aventures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.aventure-item {
  animation: fadeInUp 0.6s ease-out;
}

.aventure-item:nth-child(1) { animation-delay: 0.1s; }
.aventure-item:nth-child(2) { animation-delay: 0.2s; }
.aventure-item:nth-child(3) { animation-delay: 0.3s; }
.aventure-item:nth-child(4) { animation-delay: 0.4s; }
.aventure-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
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
  .empty-state {
    padding: 2rem 1rem;
  }
  
  .empty-title {
    font-size: 1.5rem;
  }
  
  .empty-description {
    font-size: 1rem;
  }
  
  .aventures-header {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .aventures-title {
    font-size: 1.6rem;
  }
  
  .aventures-subtitle {
    font-size: 1rem;
  }
  
  .aventures-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
}

@media (max-width: 480px) {
  .empty-icon-container {
    width: 80px;
    height: 80px;
  }
  
  .empty-icon {
    font-size: 2.5rem;
  }
  
  .empty-title {
    font-size: 1.3rem;
  }
  
  .aventures-title {
    font-size: 1.4rem;
  }
  
  .aventures-grid {
    padding: 0;
  }
}
</style>
