# VAL FUSION - Site Web

## 🎨 Site moderne créé avec Symfony & Tailwind CSS

Ce site web a été créé en reproduisant fidèlement le design et la structure du site officiel [valfusion.fr](https://www.valfusion.fr/).

## 📄 Pages disponibles

1. **Page d'accueil** (`/`)
   - Hero section avec vidéo
   - Présentation du groupe
   - Les 4 entités principales
   - Call-to-action

2. **À propos** (`/a-propos`)
   - Vision et valeurs du groupe
   - Expertise et services
   - Call-to-action

3. **VAL CONCEPT** (`/val-concept`)
   - Présentation du cabinet de gestion
   - Stratégie (Réussite, Innovation, Ambition)
   - Services de conception
   - Témoignages clients

4. **VAL FORMATION** (`/val-formation`)
   - Présentation du centre de formation
   - 4 types de formations :
     - BTP et métiers du bâtiment
     - Sécurité et prévention
     - Transport et Nettoyage
     - Insertion professionnelle
   - Formations complémentaires

5. **Contact** (`/contact`)
   - Formulaire de contact complet
   - Coordonnées (téléphone, email, adresse)
   - Carte interactive
   - Horaires d'ouverture

## 🎨 Technologies utilisées

- **Symfony 7.x** - Framework PHP
- **Tailwind CSS** - Framework CSS utility-first
- **Font Awesome 6.5** - Icônes
- **Google Fonts (Inter)** - Typographie moderne

## 🚀 Fonctionnalités

### Design
- ✅ Design moderne et responsive
- ✅ Animations et transitions fluides
- ✅ Gradient de couleurs professionnels
- ✅ Typographie élégante
- ✅ Icônes Font Awesome

### Navigation
- ✅ Menu sticky avec dropdown
- ✅ Liens vers réseaux sociaux
- ✅ Footer complet avec liens rapides
- ✅ Navigation fluide entre pages

### Formulaire de contact
- ✅ Validation côté client et serveur
- ✅ Messages de confirmation
- ✅ Design moderne avec Tailwind CSS
- ✅ Champs obligatoires marqués

## 🎨 Palette de couleurs

- **Primaire** : Bleu (#3B82F6 à #1D4ED8)
- **Secondaire** : Gris foncé (#111827 à #1F2937)
- **Accent** : Vert (#10B981), Orange (#F97316), Rouge (#EF4444)
- **Fond** : Blanc et gris clair (#F9FAFB)

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à tous les écrans :
- 📱 Mobile (< 640px)
- 📱 Tablette (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🔧 Personnalisation

### Modifier les couleurs
Les couleurs sont configurées dans `templates/base.html.twig` :
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1a1a2e',
                secondary: '#16213e',
                // ...
            }
        }
    }
}
```

### Ajouter une nouvelle page
1. Créer le template dans `templates/home/`
2. Ajouter la route dans `src/Controller/HomeController.php`
3. Ajouter le lien dans le header (`templates/partials/header.html.twig`)

## 📞 Contact

- **Téléphone** : 02.32.40.58.03
- **Email** : contact@valfusion.fr
- **Adresse** : 101 Rue Grande, Val-De-Reuil, 27100, Normandie, France

## 🌟 Caractéristiques principales

### Page d'accueil
- Hero section avec fond dégradé
- Présentation claire et concise
- Cards pour les 4 entités
- Design moderne et professionnel

### Pages entités
- Design cohérent
- Informations détaillées
- Visuels attractifs
- Call-to-action efficaces

### Page contact
- Formulaire intuitif
- Coordonnées complètes
- Design professionnel
- Validation complète

---

**Développé avec ❤️ pour VAL FUSION GROUPE**
