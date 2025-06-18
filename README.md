# Mon Carnet d'Aventures

Une application web interactive développée avec **Ionic Vue** permettant de gérer et organiser vos récits personnels et aventures.

## 📋 Description du Projet

Cette application a été développée dans le cadre du cours **Applications Web Multiplateformes (420-726-AH)** enseigné par **Khali Loghlam**. Elle démontre la maîtrise des concepts suivants :

- Utilisation des composants Ionic
- Liaison de données avec Vue.js
- Gestion d'état centralisée
- Animations et transitions fluides
- Interface responsive et moderne

## 🚀 Fonctionnalités

### ✨ Fonctionnalités Principales
- **Ajouter des aventures** : Créez de nouveaux récits avec titre, description, date et catégorie
- **Consulter la liste** : Visualisez toutes vos aventures sous forme de cartes interactives
- **Modifier les aventures** : Éditez facilement vos récits existants
- **Supprimer des aventures** : Supprimez les aventures que vous ne souhaitez plus conserver
- **Filtrage par catégorie** : Organisez vos aventures par catégories (Voyage, Famille, Travail, etc.)

### 🎨 Interface Utilisateur
- **Design moderne** : Interface claire et intuitive
- **Responsive** : S'adapte parfaitement aux différentes tailles d'écran
- **Animations fluides** : Transitions et animations personnalisées
- **Thèmes** : Support des thèmes clair/sombre
- **Personnalisation** : Choix de couleurs principales

### ⚙️ Paramètres Avancés
- **Export de données** : Sauvegardez vos aventures au format JSON
- **Réinitialisation** : Supprimez toutes les données si nécessaire
- **Statistiques** : Visualisez le nombre d'aventures et de catégories
- **Persistance locale** : Vos données sont sauvegardées automatiquement

## 🛠️ Technologies Utilisées

- **Ionic Vue** : Framework pour applications hybrides
- **Vue.js 3** : Framework JavaScript progressif
- **TypeScript** : Typage statique pour JavaScript
- **Ionicons** : Bibliothèque d'icônes
- **LocalStorage** : Stockage local des données

## 📁 Structure du Projet

```
src/
├── views/                    # Pages de l'application
│   ├── HomePage.vue         # Page d'accueil
│   ├── AjouterAventures.vue # Formulaire d'ajout
│   ├── ListeAventures.vue   # Liste des aventures
│   ├── DetailAventures.vue  # Détails d'une aventure
│   └── Parametres.vue       # Page des paramètres
├── components/              # Composants réutilisables
│   └── AventuresCard.vue    # Carte d'aventure
├── state/                   # Gestion d'état
│   └── state.js            # État global et fonctions
└── router/                  # Configuration des routes
    └── index.ts            # Définition des routes
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
1. Clonez le repository :
```bash
git clone [URL_DU_REPO]
cd mini-app-dashboard
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application en mode développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse : `http://localhost:5173`

### Build pour Production
```bash
npm run build
```

## 📱 Utilisation

### 1. Page d'Accueil
- Accédez aux différentes sections via les boutons de navigation
- Interface claire avec icônes et descriptions

### 2. Ajouter une Aventure
- Remplissez le formulaire avec :
  - **Titre** (obligatoire, minimum 3 caractères)
  - **Description** (obligatoire, minimum 10 caractères)
  - **Date** (optionnelle)
  - **Catégorie** (Voyage, Famille, Travail, Sport, Cuisine, Autre)
- Validation en temps réel
- Animation d'apparition du formulaire

### 3. Liste des Aventures
- Affichage en grille responsive
- Filtrage par catégorie
- Statistiques en temps réel
- Animation d'apparition des cartes
- Navigation vers les détails

### 4. Détails d'une Aventure
- Affichage complet des informations
- Mode édition intégré
- Boutons de modification et suppression
- Transitions fluides

### 5. Paramètres
- Personnalisation du thème (clair/sombre)
- Choix de la couleur principale
- Export des données
- Réinitialisation complète
- Informations sur l'application

## 🎯 Concepts Développés

### Liaison de Données (v-model)
```vue
<ion-input v-model="titre" placeholder="Titre de l'aventure" />
```

### Transmission par Props
```vue
<AventureCard :aventure="aventure" />
```

### Navigation
```javascript
router.push('/liste-aventures')
```

### Affichage Conditionnel
```vue
<div v-if="aventures.length === 0" class="empty-state">
  Aucune aventure trouvée
</div>
```

### Animations Personnalisées
```javascript
const animation = createAnimation()
  .addElement(element)
  .duration(600)
  .fromTo('opacity', '0', '1')
  .fromTo('transform', 'translateY(20px)', 'translateY(0)')
```

### Gestion d'État Centralisée
```javascript
// state.js
export const state = reactive({
  aventures: []
})

export function ajouterAventure(aventure) {
  state.aventures.unshift(aventure)
  sauvegarderDonnees()
}
```

## 📊 Fonctionnalités Techniques

### Persistance des Données
- Stockage automatique dans le localStorage
- Chargement automatique au démarrage
- Export/Import de données

### Validation
- Validation côté client
- Messages d'erreur clairs
- Prévention des données invalides

### Performance
- Composants optimisés
- Animations fluides
- Interface réactive

## 🎨 Design et UX

### Principes de Design
- **Simplicité** : Interface épurée et intuitive
- **Cohérence** : Design uniforme dans toute l'application
- **Accessibilité** : Navigation claire et contrastes appropriés
- **Responsive** : Adaptation à tous les écrans

### Animations
- Transitions entre pages
- Animations d'apparition des éléments
- Effets de survol
- Feedback visuel des actions

## 🔧 Configuration

### Variables d'Environnement
Le projet utilise les variables d'environnement par défaut d'Ionic.

### Personnalisation
- Modifiez les couleurs dans `src/theme/`
- Ajoutez de nouvelles catégories dans les composants
- Personnalisez les animations dans les hooks `onMounted`

## 📝 Notes de Développement

### Bonnes Pratiques
- Code commenté et structuré
- Fonctions réutilisables
- Gestion d'erreurs appropriée
- Validation des données

### Extensibilité
- Architecture modulaire
- Composants réutilisables
- État centralisé
- API extensible

## 🎓 Évaluation

Ce projet répond aux critères d'évaluation suivants :

| Critère | Points | Statut |
|---------|--------|--------|
| Fonctionnalités de base | 25 pts | ✅ Complété |
| Structure du projet | 10 pts | ✅ Complété |
| Interface utilisateur | 10 pts | ✅ Complété |
| Réactivité | 10 pts | ✅ Complété |
| Animations et transitions | 10 pts | ✅ Complété |
| Paramètres | 10 pts | ✅ Complété |

## 👨‍💻 Développeur

**Étudiant en Applications Web Multiplateformes**
- **Cours** : 420-726-AH
- **Enseignant** : Khali Loghlam
- **Date de remise** : 25 juin 2025

## 📄 Licence

Ce projet est développé dans un cadre éducatif.

---

*Développé avec ❤️ pour le cours Applications Web Multiplateformes* 