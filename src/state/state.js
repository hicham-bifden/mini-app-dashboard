// src/state/state.js

import { reactive } from 'vue'

export const state = reactive({
  aventures: []
})

export function ajouterAventure(aventure) {
  state.aventures.push({ ...aventure, id: Date.now() })
}

export function modifierAventure(id, nouvellesDonnees) {
  const index = state.aventures.findIndex(a => a.id === id)
  if (index !== -1) {
    state.aventures[index] = { ...state.aventures[index], ...nouvellesDonnees }
  }
}

export function supprimerAventure(id) {
  state.aventures = state.aventures.filter(a => a.id !== id)
}

export function reinitialiserAventures() {
  state.aventures = []
}
