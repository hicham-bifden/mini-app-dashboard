<template>
  <ion-card class="aventure-card elevated-card">
    <ion-card-header>
      <div class="card-header-content">
        <div class="card-title-section">
          <ion-card-title class="card-title">{{ aventure.titre }}</ion-card-title>
          <ion-card-subtitle class="card-subtitle">
            <ion-icon :icon="calendarOutline" size="small"></ion-icon>
            {{ formatDate(aventure.date) }}
          </ion-card-subtitle>
        </div>
        <ion-chip :color="getCategorieColor(aventure.categorie)" class="categorie-chip">
          <ion-icon :icon="getCategorieIcon(aventure.categorie)" size="small"></ion-icon>
          {{ aventure.categorie }}
        </ion-chip>
      </div>
    </ion-card-header>

    <ion-card-content class="card-content">
      <p class="description">{{ truncateDescription(aventure.description) }}</p>
      
      <div class="card-footer">
        <div class="metadata">
          <span class="date-created">
            <ion-icon :icon="timeOutline" size="small"></ion-icon>
            Créé le {{ formatDate(aventure.date) }}
          </span>
        </div>
        
        <ion-button 
          fill="clear" 
          size="small" 
          color="primary"
          class="details-button"
          @click.stop="voirDetails"
        >
          Voir plus
          <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
        </ion-button>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
import { 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent,
  IonChip,
  IonIcon,
  IonButton
} from '@ionic/vue'
import { 
  calendarOutline, 
  timeOutline, 
  chevronForwardOutline,
  airplaneOutline,
  peopleOutline,
  briefcaseOutline,
  fitnessOutline,
  restaurantOutline,
  ellipsisHorizontalOutline
} from 'ionicons/icons'
import { useRouter } from 'vue-router'

// Props du composant
const props = defineProps({
  aventure: {
    type: Object,
    required: true
  }
})

const router = useRouter()

// Fonction pour formater la date
const formatDate = (dateString) => {
  if (!dateString) return 'Date non spécifiée'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

// Fonction pour tronquer la description
const truncateDescription = (description) => {
  if (!description) return 'Aucune description'
  return description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description
}

// Fonction pour obtenir la couleur de la catégorie
const getCategorieColor = (categorie) => {
  const colors = {
    'Voyage': 'primary',
    'Famille': 'secondary',
    'Travail': 'tertiary',
    'Sport': 'success',
    'Cuisine': 'warning',
    'Autre': 'medium'
  }
  return colors[categorie] || 'medium'
}

// Fonction pour obtenir l'icône de la catégorie
const getCategorieIcon = (categorie) => {
  const icons = {
    'Voyage': airplaneOutline,
    'Famille': peopleOutline,
    'Travail': briefcaseOutline,
    'Sport': fitnessOutline,
    'Cuisine': restaurantOutline,
    'Autre': ellipsisHorizontalOutline
  }
  return icons[categorie] || ellipsisHorizontalOutline
}

// Fonction pour naviguer vers les détails
const voirDetails = () => {
  router.push(`/details/${props.aventure.id}`)
}
</script>

<style scoped>
.aventure-card {
  margin: 16px;
  border-radius: var(--app-border-radius);
  box-shadow: var(--app-shadow);
  border: 1px solid var(--ion-item-border-color);
  transition: all 0.3s ease;
  overflow: hidden;
}

.aventure-card:hover {
  box-shadow: var(--app-shadow-hover);
  transform: translateY(-4px);
}

.card-header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.card-title-section {
  flex: 1;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--ion-text-color);
  line-height: 1.3;
}

.card-subtitle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--ion-color-medium);
  font-weight: 500;
}

.categorie-chip {
  font-size: 0.8rem;
  height: 28px;
  margin: 0;
  font-weight: 600;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.categorie-chip ion-icon {
  margin-right: 0.25rem;
}

.card-content {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
}

.description {
  color: var(--ion-text-color);
  line-height: 1.6;
  margin: 1rem 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ion-item-border-color);
}

.metadata {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-created {
  font-size: 0.8rem;
  color: var(--ion-color-medium);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
}

.details-button {
  font-weight: 600;
  font-size: 0.9rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.details-button:hover {
  transform: translateX(2px);
  --background: var(--ion-color-primary);
  --color: white;
}

/* Responsive design */
@media (max-width: 768px) {
  .card-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .categorie-chip {
    align-self: flex-start;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .details-button {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .aventure-card {
    margin: 12px;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
  
  .description {
    font-size: 0.9rem;
  }
}
</style>
