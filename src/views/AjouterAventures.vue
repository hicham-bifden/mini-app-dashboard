<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" class="back-button"></ion-back-button>
        </ion-buttons>
        <ion-title class="header-title">Ajouter une Aventure</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div ref="formContainer" class="form-container fade-in">
        <ion-card class="form-card elevated-card">
          <ion-card-header class="form-header">
            <ion-card-title class="form-title">
              <ion-icon :icon="addCircleOutline" class="title-icon"></ion-icon>
              Nouvelle Aventure
            </ion-card-title>
            <ion-card-subtitle class="form-subtitle">
              Partagez vos moments précieux et créez des souvenirs inoubliables
            </ion-card-subtitle>
          </ion-card-header>

          <ion-card-content class="form-content">
            <!-- Titre -->
            <ion-item class="form-item">
              <ion-label position="floating" class="form-label">
                <ion-icon :icon="createOutline" slot="start"></ion-icon>
                Titre de l'aventure *
              </ion-label>
              <ion-input 
                v-model="titre" 
                placeholder="Ex: Mon voyage à Paris"
                class="form-input"
                :class="{ 'ion-invalid': titreError }"
              />
            </ion-item>
            <ion-note v-if="titreError" color="danger" class="error-note">
              {{ titreError }}
            </ion-note>

            <!-- Description -->
            <ion-item class="form-item">
              <ion-label position="floating" class="form-label">
                <ion-icon :icon="documentTextOutline" slot="start"></ion-icon>
                Description *
              </ion-label>
              <ion-textarea 
                v-model="description" 
                placeholder="Décrivez votre aventure, vos émotions, les personnes rencontrées..."
                rows="4"
                class="form-textarea"
                :class="{ 'ion-invalid': descriptionError }"
              />
            </ion-item>
            <ion-note v-if="descriptionError" color="danger" class="error-note">
              {{ descriptionError }}
            </ion-note>

            <!-- Date -->
            <ion-item class="form-item">
              <ion-label position="floating" class="form-label">
                <ion-icon :icon="calendarOutline" slot="start"></ion-icon>
                Date de l'aventure
              </ion-label>
              <ion-input 
                v-model="date" 
                type="date"
                class="form-input"
              />
            </ion-item>

            <!-- Catégorie -->
            <ion-item class="form-item">
              <ion-label class="form-label">
                <ion-icon :icon="folderOutline" slot="start"></ion-icon>
                Catégorie
              </ion-label>
              <ion-select
                v-model="categorie"
                placeholder="Choisissez une catégorie"
                class="form-select"
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
            <div class="button-container">
              <ion-button
                expand="block"
                color="primary"
                @click="ajouter"
                :disabled="isSubmitting"
                class="submit-button gradient-button"
              >
                <ion-icon :icon="saveOutline" slot="start"></ion-icon>
                {{ isSubmitting ? 'Ajout en cours...' : 'Ajouter l\'aventure' }}
              </ion-button>

              <ion-button
                expand="block"
                color="medium"
                fill="outline"
                @click="reinitialiser"
                class="reset-button"
              >
                <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
                Réinitialiser
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createAnimation } from '@ionic/vue'
import { ajouterAventure } from '../state/state.js'
import { useRouter } from 'vue-router'
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
  IonNote
} from '@ionic/vue'
import { 
  addCircleOutline,
  createOutline,
  documentTextOutline,
  calendarOutline,
  folderOutline,
  saveOutline,
  refreshOutline
} from 'ionicons/icons'

const router = useRouter()
const formContainer = ref(null)

// Variables réactives pour le formulaire
const titre = ref('')
const description = ref('')
const date = ref('')
const categorie = ref('')
const isSubmitting = ref(false)

// Variables pour les erreurs
const titreError = ref('')
const descriptionError = ref('')

// Fonction de validation
const validerFormulaire = () => {
  let isValid = true
  
  // Validation du titre
  if (!titre.value.trim()) {
    titreError.value = 'Le titre est obligatoire'
    isValid = false
  } else if (titre.value.trim().length < 3) {
    titreError.value = 'Le titre doit contenir au moins 3 caractères'
    isValid = false
  } else {
    titreError.value = ''
  }
  
  // Validation de la description
  if (!description.value.trim()) {
    descriptionError.value = 'La description est obligatoire'
    isValid = false
  } else if (description.value.trim().length < 10) {
    descriptionError.value = 'La description doit contenir au moins 10 caractères'
    isValid = false
  } else {
    descriptionError.value = ''
  }
  
  return isValid
}

// Fonction pour ajouter une aventure
const ajouter = async () => {
  if (!validerFormulaire()) {
    return
  }

  isSubmitting.value = true

  try {
    // Créer l'objet aventure
    const nouvelleAventure = {
      titre: titre.value.trim(),
      description: description.value.trim(),
      date: date.value || new Date().toISOString().split('T')[0],
      categorie: categorie.value || 'Autre'
    }

    // Ajouter l'aventure au state
    ajouterAventure(nouvelleAventure)

    // Réinitialiser le formulaire
    reinitialiser()

    // Afficher un message de succès et naviguer
    setTimeout(() => {
      router.push('/liste-aventures')
    }, 1000)

  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Fonction pour réinitialiser le formulaire
const reinitialiser = () => {
  titre.value = ''
  description.value = ''
  date.value = ''
  categorie.value = ''
  titreError.value = ''
  descriptionError.value = ''
}

// Animation à l'apparition du formulaire
onMounted(() => {
  const animation = createAnimation()
    .addElement(formContainer.value)
    .duration(800)
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateY(30px)', 'translateY(0)')
    .easing('ease-out')
  
  animation.play()
})
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

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.form-card {
  border-radius: var(--app-border-radius);
  box-shadow: var(--app-shadow);
  border: 1px solid var(--ion-item-border-color);
}

.form-header {
  text-align: center;
  padding: 2rem 1.5rem 1rem 1.5rem;
  background: var(--ion-color-light);
  border-radius: var(--app-border-radius) var(--app-border-radius) 0 0;
}

.form-title {
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

.form-subtitle {
  font-size: 1rem;
  color: var(--ion-color-medium);
  margin: 0;
}

.form-content {
  padding: 2rem 1.5rem;
}

.form-item {
  margin-bottom: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--ion-item-border-color);
  transition: all 0.3s ease;
}

.form-item:hover {
  border-color: var(--ion-color-primary);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}

.form-label {
  font-weight: 600;
  color: var(--ion-text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-label ion-icon {
  color: var(--ion-color-primary);
}

.form-input,
.form-textarea,
.form-select {
  font-size: 1rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}

.form-textarea {
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

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-button {
  height: 3.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  box-shadow: var(--app-shadow);
  transition: all 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--app-shadow-hover);
}

.reset-button {
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 16px;
  border: 2px solid var(--ion-color-medium);
  transition: all 0.3s ease;
}

.reset-button:hover {
  transform: translateY(-1px);
  border-color: var(--ion-color-dark);
  color: var(--ion-color-dark);
}

/* Responsive design */
@media (max-width: 768px) {
  .form-container {
    padding: 0.5rem;
  }
  
  .form-header {
    padding: 1.5rem 1rem 1rem 1rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .form-content {
    padding: 1.5rem 1rem;
  }
  
  .form-item {
    margin-bottom: 1rem;
  }
  
  .button-container {
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .form-title {
    font-size: 1.3rem;
  }
  
  .form-subtitle {
    font-size: 0.9rem;
  }
  
  .submit-button,
  .reset-button {
    height: 3rem;
    font-size: 1rem;
  }
}
</style>
