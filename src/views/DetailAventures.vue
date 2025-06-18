<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/liste-aventures" class="back-button"></ion-back-button>
        </ion-buttons>
        <ion-title class="header-title">Détail de l'aventure</ion-title>
        <ion-buttons slot="end">
          <ion-button 
            fill="clear" 
            color="light"
            @click="toggleEditMode"
            class="edit-button"
          >
            <ion-icon :icon="editMode ? closeOutline : createOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div v-if="aventure" class="detail-container fade-in">
        <!-- Mode affichage -->
        <div v-if="!editMode">
          <ion-card class="detail-card elevated-card">
            <ion-card-header class="detail-header">
              <div class="detail-title-section">
                <ion-card-title class="detail-title">{{ aventure.titre }}</ion-card-title>
                <ion-card-subtitle class="detail-subtitle">
                  <ion-icon :icon="calendarOutline" size="small"></ion-icon>
                  {{ formatDate(aventure.date) }}
                </ion-card-subtitle>
              </div>
              <ion-chip :color="getCategorieColor(aventure.categorie)" class="detail-categorie-chip">
                <ion-icon :icon="getCategorieIcon(aventure.categorie)" size="small"></ion-icon>
                {{ aventure.categorie }}
              </ion-chip>
            </ion-card-header>

            <ion-card-content class="detail-content">
              <div class="description-section">
                <h3 class="section-title">
                  <ion-icon :icon="documentTextOutline" class="section-icon"></ion-icon>
                  Description
                </h3>
                <p class="description-text">{{ aventure.description }}</p>
              </div>

              <div class="metadata-section">
                <div class="metadata-item">
                  <ion-icon :icon="timeOutline" class="metadata-icon"></ion-icon>
                  <span class="metadata-label">Créé le :</span>
                  <span class="metadata-value">{{ formatDate(aventure.date) }}</span>
                </div>
                <div class="metadata-item">
                  <ion-icon :icon="folderOutline" class="metadata-icon"></ion-icon>
                  <span class="metadata-label">Catégorie :</span>
                  <span class="metadata-value">{{ aventure.categorie }}</span>
                </div>
              </div>

              <div class="actions-section">
                <ion-button 
                  color="danger" 
                  fill="outline"
                  class="delete-button"
                  @click="supprimerAventureLocale"
                >
                  <ion-icon :icon="trashOutline" slot="start"></ion-icon>
                  Supprimer l'aventure
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Mode édition -->
        <div v-else class="edit-container">
          <ion-card class="edit-card elevated-card">
            <ion-card-header class="edit-header">
              <ion-card-title class="edit-title">
                <ion-icon :icon="createOutline" class="title-icon"></ion-icon>
                Modifier l'aventure
              </ion-card-title>
              <ion-card-subtitle class="edit-subtitle">
                Modifiez les informations de votre aventure
              </ion-card-subtitle>
            </ion-card-header>

            <ion-card-content class="edit-content">
              <!-- Titre -->
              <ion-item class="edit-item">
                <ion-label position="floating" class="edit-label">
                  <ion-icon :icon="createOutline" slot="start"></ion-icon>
                  Titre de l'aventure *
                </ion-label>
                <ion-input 
                  v-model="form.titre" 
                  placeholder="Ex: Mon voyage à Paris"
                  class="edit-input"
                  :class="{ 'ion-invalid': titreError }"
                />
              </ion-item>
              <ion-note v-if="titreError" color="danger" class="error-note">
                {{ titreError }}
              </ion-note>

              <!-- Description -->
              <ion-item class="edit-item">
                <ion-label position="floating" class="edit-label">
                  <ion-icon :icon="documentTextOutline" slot="start"></ion-icon>
                  Description *
                </ion-label>
                <ion-textarea 
                  v-model="form.description" 
                  placeholder="Décrivez votre aventure, vos émotions, les personnes rencontrées..."
                  rows="4"
                  class="edit-textarea"
                  :class="{ 'ion-invalid': descriptionError }"
                />
              </ion-item>
              <ion-note v-if="descriptionError" color="danger" class="error-note">
                {{ descriptionError }}
              </ion-note>

              <!-- Date -->
              <ion-item class="edit-item">
                <ion-label position="floating" class="edit-label">
                  <ion-icon :icon="calendarOutline" slot="start"></ion-icon>
                  Date de l'aventure
                </ion-label>
                <ion-input 
                  v-model="form.date" 
                  type="date"
                  class="edit-input"
                />
              </ion-item>

              <!-- Catégorie -->
              <ion-item class="edit-item">
                <ion-label class="edit-label">
                  <ion-icon :icon="folderOutline" slot="start"></ion-icon>
                  Catégorie
                </ion-label>
                <ion-select
                  v-model="form.categorie"
                  placeholder="Choisissez une catégorie"
                  class="edit-select"
                >
                  <ion-select-option value="Voyage">Voyage</ion-select-option>
                  <ion-select-option value="Famille">Famille</ion-select-option>
                  <ion-select-option value="Travail">Travail</ion-select-option>
                  <ion-select-option value="Sport">Sport</ion-select-option>
                  <ion-select-option value="Cuisine">Cuisine</ion-select-option>
                  <ion-select-option value="Autre">Autre</ion-select-option>
                </ion-select>
              </ion-item>

              <!-- Boutons d'action -->
              <div class="edit-actions">
                <ion-button
                  expand="block"
                  color="success"
                  @click="sauvegarder"
                  class="save-button gradient-button"
                >
                  <ion-icon :icon="saveOutline" slot="start"></ion-icon>
                  Sauvegarder
                </ion-button>

                <ion-button
                  expand="block"
                  color="medium"
                  fill="outline"
                  @click="annulerModification"
                  class="cancel-button"
                >
                  <ion-icon :icon="closeOutline" slot="start"></ion-icon>
                  Annuler
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
      
      <div v-else class="not-found-container fade-in">
        <div class="not-found-icon-container">
          <ion-icon :icon="alertCircleOutline" size="large" class="not-found-icon"></ion-icon>
        </div>
        <h2 class="not-found-title">Aventure non trouvée</h2>
        <p class="not-found-description">L'aventure que vous recherchez n'existe pas ou a été supprimée.</p>
        <ion-button 
          color="primary" 
          router-link="/liste-aventures"
          class="back-to-list-button gradient-button"
        >
          <ion-icon :icon="arrowBackOutline" slot="start"></ion-icon>
          Retour à la liste
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { state, modifierAventure, supprimerAventure } from '../state/state.js'
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonChip,
  IonNote
} from '@ionic/vue'
import { 
  calendarOutline,
  timeOutline,
  documentTextOutline,
  folderOutline,
  trashOutline,
  alertCircleOutline,
  arrowBackOutline,
  createOutline,
  closeOutline,
  saveOutline,
  airplaneOutline,
  peopleOutline,
  briefcaseOutline,
  fitnessOutline,
  restaurantOutline,
  ellipsisHorizontalOutline
} from 'ionicons/icons'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const aventure = state.aventures.find(a => a.id === id)

// Mode édition
const editMode = ref(false)
const titreError = ref('')
const descriptionError = ref('')

// Formulaire d'édition
const form = reactive({
  titre: aventure ? aventure.titre : '',
  description: aventure ? aventure.description : '',
  date: aventure ? aventure.date : '',
  categorie: aventure ? aventure.categorie : ''
})

// Fonction pour basculer le mode édition
const toggleEditMode = () => {
  if (editMode.value) {
    // Annuler les modifications
    annulerModification()
  } else {
    // Passer en mode édition
    editMode.value = true
    // Initialiser le formulaire avec les valeurs actuelles
    form.titre = aventure.titre
    form.description = aventure.description
    form.date = aventure.date
    form.categorie = aventure.categorie
  }
}

// Fonction de validation
const validerFormulaire = () => {
  let isValid = true
  
  // Validation du titre
  if (!form.titre.trim()) {
    titreError.value = 'Le titre est obligatoire'
    isValid = false
  } else if (form.titre.trim().length < 3) {
    titreError.value = 'Le titre doit contenir au moins 3 caractères'
    isValid = false
  } else {
    titreError.value = ''
  }
  
  // Validation de la description
  if (!form.description.trim()) {
    descriptionError.value = 'La description est obligatoire'
    isValid = false
  } else if (form.description.trim().length < 10) {
    descriptionError.value = 'La description doit contenir au moins 10 caractères'
    isValid = false
  } else {
    descriptionError.value = ''
  }
  
  return isValid
}

// Sauvegarder les modifications
const sauvegarder = () => {
  if (!validerFormulaire()) {
    return
  }

  try {
    modifierAventure(id, { ...form })
    editMode.value = false
    
    // Message de succès
    setTimeout(() => {
      alert('Aventure modifiée avec succès !')
    }, 100)
    
  } catch (error) {
    console.error('Erreur lors de la modification:', error)
    alert('Erreur lors de la modification de l\'aventure')
  }
}

// Annuler les modifications
const annulerModification = () => {
  editMode.value = false
  titreError.value = ''
  descriptionError.value = ''
}

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

// Supprimer l'aventure (nom local différent)
function supprimerAventureLocale() {
  const confirmed = confirm(
    'Êtes-vous sûr de vouloir supprimer cette aventure ?\n\n' +
    'Cette action est irréversible !'
  )
  
  if (confirmed) {
    supprimerAventure(id)
    router.push('/liste-aventures')
  }
}
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

.edit-button {
  color: white;
  --color: white;
  font-size: 1.2rem;
}

.detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.detail-card {
  border-radius: var(--app-border-radius);
  box-shadow: var(--app-shadow);
  border: 1px solid var(--ion-item-border-color);
  overflow: hidden;
}

.detail-header {
  background: var(--ion-color-light);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  border-bottom: 1px solid var(--ion-item-border-color);
}

.detail-title-section {
  margin-bottom: 1rem;
}

.detail-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--ion-text-color);
  line-height: 1.2;
}

.detail-subtitle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: var(--ion-color-medium);
  font-weight: 500;
}

.detail-categorie-chip {
  font-size: 0.9rem;
  height: 32px;
  font-weight: 600;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-categorie-chip ion-icon {
  margin-right: 0.25rem;
}

.detail-content {
  padding: 2rem 1.5rem;
}

.description-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--ion-text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  color: var(--ion-color-primary);
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--ion-text-color);
  margin: 0;
  padding: 1rem;
  background: var(--ion-color-light);
  border-radius: 12px;
  border-left: 4px solid var(--ion-color-primary);
}

.metadata-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--ion-color-light);
  border-radius: 12px;
  border: 1px solid var(--ion-item-border-color);
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--ion-card-background);
  border-radius: 8px;
  border: 1px solid var(--ion-item-border-color);
}

.metadata-item:last-child {
  margin-bottom: 0;
}

.metadata-icon {
  color: var(--ion-color-primary);
  font-size: 1.2rem;
}

.metadata-label {
  font-weight: 600;
  color: var(--ion-text-color);
  min-width: 100px;
}

.metadata-value {
  color: var(--ion-color-medium);
  font-weight: 500;
}

.actions-section {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid var(--ion-item-border-color);
}

.delete-button {
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 16px;
  border: 2px solid var(--ion-color-danger);
  transition: all 0.3s ease;
}

.delete-button:hover {
  transform: translateY(-1px);
  background: var(--ion-color-danger);
  color: white;
}

/* Styles pour le mode édition */
.edit-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.edit-card {
  border-radius: var(--app-border-radius);
  box-shadow: var(--app-shadow);
  border: 1px solid var(--ion-item-border-color);
}

.edit-header {
  text-align: center;
  padding: 2rem 1.5rem 1rem 1.5rem;
  background: var(--ion-color-light);
  border-radius: var(--app-border-radius) var(--app-border-radius) 0 0;
}

.edit-title {
  font-size: 1.8rem;
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
  font-size: 1.5rem;
}

.edit-subtitle {
  font-size: 1rem;
  color: var(--ion-color-medium);
  margin: 0;
}

.edit-content {
  padding: 2rem 1.5rem;
}

.edit-item {
  margin-bottom: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--ion-item-border-color);
  transition: all 0.3s ease;
}

.edit-item:hover {
  border-color: var(--ion-color-primary);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}

.edit-label {
  font-weight: 600;
  color: var(--ion-text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-label ion-icon {
  color: var(--ion-color-primary);
}

.edit-input,
.edit-textarea,
.edit-select {
  font-size: 1rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}

.edit-textarea {
  --padding-top: 1.5rem;
  --padding-bottom: 1.5rem;
}

.error-note {
  margin-left: 1rem;
  margin-bottom: 1rem;
  display: block;
  font-weight: 500;
}

.ion-invalid {
  --border-color: var(--ion-color-danger);
  --highlight-color: var(--ion-color-danger);
}

.edit-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button {
  height: 3.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  box-shadow: var(--app-shadow);
  transition: all 0.3s ease;
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--app-shadow-hover);
}

.cancel-button {
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 16px;
  border: 2px solid var(--ion-color-medium);
  transition: all 0.3s ease;
}

.cancel-button:hover {
  transform: translateY(-1px);
  border-color: var(--ion-color-dark);
  color: var(--ion-color-dark);
}

/* Styles pour la page "non trouvée" */
.not-found-container {
  text-align: center;
  padding: 3rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.not-found-icon-container {
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

.not-found-icon {
  font-size: 3rem;
  color: var(--ion-color-medium);
}

.not-found-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--ion-text-color);
}

.not-found-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--ion-color-medium);
  margin-bottom: 2rem;
}

.back-to-list-button {
  height: 3.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  box-shadow: var(--app-shadow);
}

/* Responsive design */
@media (max-width: 768px) {
  .detail-container,
  .edit-container {
    padding: 0.5rem;
  }
  
  .detail-header,
  .edit-header {
    padding: 1.5rem 1rem 1rem 1rem;
  }
  
  .detail-title,
  .edit-title {
    font-size: 1.6rem;
  }
  
  .detail-content,
  .edit-content {
    padding: 1.5rem 1rem;
  }
  
  .description-text {
    font-size: 1rem;
    padding: 0.75rem;
  }
  
  .metadata-section {
    padding: 1rem;
  }
  
  .metadata-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .metadata-label {
    min-width: auto;
  }
  
  .edit-item {
    margin-bottom: 1rem;
  }
  
  .edit-actions {
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .detail-title,
  .edit-title {
    font-size: 1.4rem;
  }
  
  .detail-subtitle {
    font-size: 0.9rem;
  }
  
  .description-text {
    font-size: 0.95rem;
  }
  
  .not-found-title {
    font-size: 1.5rem;
  }
  
  .not-found-description {
    font-size: 1rem;
  }
  
  .save-button,
  .cancel-button {
    height: 3rem;
    font-size: 1rem;
  }
}
</style>
