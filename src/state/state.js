// src/state/state.js
// Gestion centralisée de l'état de l'application

import { reactive } from 'vue'

// État réactif global de l'application
export const state = reactive({
  aventures: []
})

// Clé pour le stockage local
const STORAGE_KEY = 'carnet-aventures-data'

// Fonction pour charger les données depuis le localStorage
const chargerDonnees = () => {
  try {
    const donneesSauvegardees = localStorage.getItem(STORAGE_KEY)
    if (donneesSauvegardees) {
      const donnees = JSON.parse(donneesSauvegardees)
      state.aventures = donnees.aventures || []
      console.log('Données chargées depuis le stockage local:', state.aventures.length, 'aventures')
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
    state.aventures = []
  }
}

// Fonction pour sauvegarder les données dans le localStorage
const sauvegarderDonnees = () => {
  try {
    const donnees = {
      aventures: state.aventures,
      derniereSauvegarde: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(donnees))
    console.log('Données sauvegardées dans le stockage local')
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error)
  }
}

// Fonction pour ajouter une nouvelle aventure
export function ajouterAventure(aventure) {
  // Validation des données
  if (!aventure.titre || !aventure.description) {
    throw new Error('Le titre et la description sont obligatoires')
  }

  // Créer l'objet aventure avec un ID unique et des métadonnées
  const nouvelleAventure = {
    ...aventure,
    id: Date.now() + Math.random(), // ID unique
    dateCreation: new Date().toISOString(),
    dateModification: new Date().toISOString()
  }

  // Ajouter à l'état
  state.aventures.unshift(nouvelleAventure) // Ajouter au début de la liste
  
  // Sauvegarder dans le localStorage
  sauvegarderDonnees()
  
  console.log('Aventure ajoutée:', nouvelleAventure.titre)
  return nouvelleAventure
}

// Fonction pour modifier une aventure existante
export function modifierAventure(id, nouvellesDonnees) {
  const index = state.aventures.findIndex(a => a.id === id)
  
  if (index === -1) {
    throw new Error('Aventure non trouvée')
  }

  // Validation des données
  if (!nouvellesDonnees.titre || !nouvellesDonnees.description) {
    throw new Error('Le titre et la description sont obligatoires')
  }

  // Mettre à jour l'aventure avec les nouvelles données
  state.aventures[index] = {
    ...state.aventures[index],
    ...nouvellesDonnees,
    dateModification: new Date().toISOString()
  }

  // Sauvegarder dans le localStorage
  sauvegarderDonnees()
  
  console.log('Aventure modifiée:', state.aventures[index].titre)
  return state.aventures[index]
}

// Fonction pour supprimer une aventure
export function supprimerAventure(id) {
  const index = state.aventures.findIndex(a => a.id === id)
  
  if (index === -1) {
    throw new Error('Aventure non trouvée')
  }

  const aventureSupprimee = state.aventures[index]
  
  // Supprimer de l'état
  state.aventures.splice(index, 1)
  
  // Sauvegarder dans le localStorage
  sauvegarderDonnees()
  
  console.log('Aventure supprimée:', aventureSupprimee.titre)
  return aventureSupprimee
}

// Fonction pour réinitialiser toutes les aventures
export function reinitialiserAventures() {
  state.aventures = []
  
  // Supprimer du localStorage
  localStorage.removeItem(STORAGE_KEY)
  
  console.log('Toutes les aventures ont été supprimées')
}

// Fonction pour obtenir une aventure par ID
export function obtenirAventure(id) {
  return state.aventures.find(a => a.id === id)
}

// Fonction pour filtrer les aventures par catégorie
export function filtrerAventuresParCategorie(categorie) {
  if (!categorie) return state.aventures
  return state.aventures.filter(a => a.categorie === categorie)
}

// Fonction pour rechercher dans les aventures
export function rechercherAventures(terme) {
  if (!terme) return state.aventures
  
  const termeRecherche = terme.toLowerCase()
  return state.aventures.filter(a => 
    a.titre.toLowerCase().includes(termeRecherche) ||
    a.description.toLowerCase().includes(termeRecherche) ||
    a.categorie.toLowerCase().includes(termeRecherche)
  )
}

// Fonction pour obtenir les statistiques
export function obtenirStatistiques() {
  const total = state.aventures.length
  const categories = [...new Set(state.aventures.map(a => a.categorie))]
  const categoriesCount = categories.length
  
  // Compter les aventures par catégorie
  const parCategorie = {}
  state.aventures.forEach(a => {
    parCategorie[a.categorie] = (parCategorie[a.categorie] || 0) + 1
  })
  
  return {
    total,
    categoriesCount,
    categories,
    parCategorie
  }
}

// Fonction pour exporter toutes les données
export function exporterDonnees() {
  const donnees = {
    aventures: state.aventures,
    statistiques: obtenirStatistiques(),
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  }
  
  return donnees
}

// Fonction pour importer des données
export function importerDonnees(donnees) {
  try {
    if (!donnees.aventures || !Array.isArray(donnees.aventures)) {
      throw new Error('Format de données invalide')
    }
    
    // Valider chaque aventure
    const aventuresValides = donnees.aventures.filter(a => 
      a.titre && a.description && a.id
    )
    
    state.aventures = aventuresValides
    sauvegarderDonnees()
    
    console.log('Données importées:', aventuresValides.length, 'aventures')
    return aventuresValides.length
  } catch (error) {
    console.error('Erreur lors de l\'import:', error)
    throw error
  }
}

// Charger les données au démarrage de l'application
chargerDonnees()

// Exporter des fonctions utilitaires pour les dates
export const utils = {
  // Formater une date
  formaterDate: (dateString) => {
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
  },
  
  // Obtenir la date relative (il y a X jours)
  dateRelative: (dateString) => {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      const maintenant = new Date()
      const difference = maintenant - date
      const jours = Math.floor(difference / (1000 * 60 * 60 * 24))
      
      if (jours === 0) return 'Aujourd\'hui'
      if (jours === 1) return 'Hier'
      if (jours < 7) return `Il y a ${jours} jours`
      if (jours < 30) return `Il y a ${Math.floor(jours / 7)} semaines`
      if (jours < 365) return `Il y a ${Math.floor(jours / 30)} mois`
      return `Il y a ${Math.floor(jours / 365)} ans`
    } catch (error) {
      return ''
    }
  }
}
