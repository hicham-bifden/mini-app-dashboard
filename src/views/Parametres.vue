<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Paramètres</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div ref="settingsContainer" class="settings-container">
        
        <!-- Section Apparence -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon :icon="colorPaletteOutline" slot="start"></ion-icon>
              Apparence
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <!-- Sélecteur de thème -->
            <ion-item>
              <ion-label>Thème</ion-label>
              <ion-select
                v-model="settings.theme"
                @ionChange="changerTheme"
                placeholder="Choisir un thème"
              >
                <ion-select-option value="light">Clair</ion-select-option>
                <ion-select-option value="dark">Sombre</ion-select-option>
                <ion-select-option value="auto">Automatique</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Sélecteur de couleur principale -->
            <ion-item>
              <ion-label>Couleur principale</ion-label>
              <ion-select
                v-model="settings.couleurPrincipale"
                @ionChange="changerCouleurPrincipale"
                placeholder="Choisir une couleur"
              >
                <ion-select-option value="primary">Bleu</ion-select-option>
                <ion-select-option value="secondary">Violet</ion-select-option>
                <ion-select-option value="tertiary">Rose</ion-select-option>
                <ion-select-option value="success">Vert</ion-select-option>
                <ion-select-option value="warning">Orange</ion-select-option>
                <ion-select-option value="danger">Rouge</ion-select-option>
              </ion-select>
            </ion-item>

            <!-- Prévisualisation -->
            <div class="preview-section">
              <h4>Aperçu</h4>
              <div class="color-preview" :class="settings.couleurPrincipale">
                <ion-button :color="settings.couleurPrincipale">
                  Bouton exemple
                </ion-button>
                <ion-chip :color="settings.couleurPrincipale">
                  <ion-icon :icon="starOutline"></ion-icon>
                  Chip exemple
                </ion-chip>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Section Données -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon :icon="dataOutline" slot="start"></ion-icon>
              Données
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <!-- Statistiques -->
            <div class="stats-section">
              <ion-item lines="none">
                <ion-icon :icon="bookOutline" slot="start" color="primary"></ion-icon>
                <ion-label>
                  <h4>Total des aventures</h4>
                  <p>{{ state.aventures.length }} aventures enregistrées</p>
                </ion-label>
              </ion-item>

              <ion-item lines="none">
                <ion-icon :icon="folderOutline" slot="start" color="secondary"></ion-icon>
                <ion-label>
                  <h4>Catégories utilisées</h4>
                  <p>{{ categoriesUniques.length }} catégories différentes</p>
                </ion-label>
              </ion-item>
            </div>

            <!-- Actions sur les données -->
            <div class="data-actions">
              <ion-button
                expand="block"
                color="warning"
                fill="outline"
                @click="exporterDonnees"
              >
                <ion-icon :icon="downloadOutline" slot="start"></ion-icon>
                Exporter les données
              </ion-button>

              <ion-button
                expand="block"
                color="danger"
                fill="outline"
                @click="reinitialiserDonnees"
              >
                <ion-icon :icon="trashOutline" slot="start"></ion-icon>
                Réinitialiser toutes les aventures
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Section Informations -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-icon :icon="informationCircleOutline" slot="start"></ion-icon>
              Informations
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-item lines="none">
              <ion-icon :icon="codeOutline" slot="start" color="tertiary"></ion-icon>
              <ion-label>
                <h4>Version</h4>
                <p>1.0.0</p>
              </ion-label>
            </ion-item>

            <ion-item lines="none">
              <ion-icon :icon="personOutline" slot="start" color="success"></ion-icon>
              <ion-label>
                <h4>Développeur</h4>
                <p>Étudiant - Applications Web Multiplateformes</p>
              </ion-label>
            </ion-item>

            <ion-item lines="none">
              <ion-icon :icon="schoolOutline" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h4>Cours</h4>
                <p>420-726-AH - Khali Loghlam</p>
              </ion-label>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { createAnimation } from '@ionic/vue'
import { state, reinitialiserAventures } from '../state/state.js'
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonChip
} from '@ionic/vue'
import { 
  colorPaletteOutline,
  settingsOutline,
  bookOutline,
  folderOutline,
  downloadOutline,
  trashOutline,
  informationCircleOutline,
  codeOutline,
  personOutline,
  schoolOutline,
  starOutline
} from 'ionicons/icons'

// Variables réactives pour les paramètres
const settingsContainer = ref(null)
const settings = ref({
  theme: 'light',
  couleurPrincipale: 'primary'
})

// Computed property pour les catégories uniques
const categoriesUniques = computed(() => {
  const categories = state.aventures.map(a => a.categorie)
  return [...new Set(categories)]
})

// Fonction pour changer le thème
const changerTheme = (event) => {
  const theme = event.detail.value
  
  // Appliquer le thème globalement
  document.body.setAttribute('data-theme', theme)
  
  // Sauvegarder dans le localStorage
  localStorage.setItem('theme', theme)
  
  // Animation de transition
  const animation = createAnimation()
    .addElement(document.body)
    .duration(300)
    .fromTo('opacity', '0.8', '1')
  
  animation.play()
}

// Fonction pour changer la couleur principale
const changerCouleurPrincipale = (event) => {
  const couleur = event.detail.value
  
  // Sauvegarder dans le localStorage
  localStorage.setItem('couleurPrincipale', couleur)
  
  // Animation de changement
  const animation = createAnimation()
    .addElement(settingsContainer.value)
    .duration(200)
    .fromTo('transform', 'scale(0.98)', 'scale(1)')
  
  animation.play()
}

// Fonction pour exporter les données
const exporterDonnees = () => {
  try {
    const data = {
      aventures: state.aventures,
      exportDate: new Date().toISOString(),
      totalAventures: state.aventures.length
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aventures-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    // Animation de succès
    const animation = createAnimation()
      .addElement(settingsContainer.value)
      .duration(300)
      .fromTo('transform', 'scale(1.02)', 'scale(1)')
    
    animation.play()
    
  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
    alert('Erreur lors de l\'export des données')
  }
}

// Fonction pour réinitialiser les données
const reinitialiserDonnees = () => {
  const confirmed = confirm(
    'Êtes-vous sûr de vouloir supprimer toutes les aventures ?\n\n' +
    'Cette action est irréversible !'
  )
  
  if (confirmed) {
    try {
      reinitialiserAventures()
      
      // Animation de réinitialisation
      const animation = createAnimation()
        .addElement(settingsContainer.value)
        .duration(500)
        .fromTo('opacity', '0.5', '1')
        .fromTo('transform', 'scale(0.95)', 'scale(1)')
      
      animation.play()
      
      // Message de confirmation
      setTimeout(() => {
        alert('Toutes les aventures ont été supprimées avec succès !')
      }, 500)
      
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error)
      alert('Erreur lors de la réinitialisation des données')
    }
  }
}

// Charger les paramètres sauvegardés
const chargerParametres = () => {
  const theme = localStorage.getItem('theme') || 'light'
  const couleur = localStorage.getItem('couleurPrincipale') || 'primary'
  
  settings.value = {
    theme,
    couleurPrincipale: couleur
  }
  
  // Appliquer le thème
  document.body.setAttribute('data-theme', theme)
}

// Animation à l'entrée de la page
onMounted(() => {
  chargerParametres()
  
  const animation = createAnimation()
    .addElement(settingsContainer.value)
    .duration(600)
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateY(20px)', 'translateY(0)')
    .easing('ease-out')
  
  animation.play()
})
</script>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 0 auto;
}

.preview-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ion-color-light);
}

.preview-section h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--ion-color-dark);
}

.color-preview {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.stats-section {
  margin-bottom: 1.5rem;
}

.stats-section ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.stats-section ion-label h4 {
  font-weight: 600;
  color: var(--ion-color-dark);
  margin-bottom: 0.25rem;
}

.stats-section ion-label p {
  color: var(--ion-color-medium);
  font-size: 0.9rem;
}

.data-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .color-preview {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .data-actions {
    gap: 0.75rem;
  }
}
</style>
