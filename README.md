# Val Fusion - Site Web Symfony

Reproduction du site web de VAL FUSION avec Symfony 7.2 et Docker.

## 🚀 Technologies utilisées

- **PHP 8.2**
- **Symfony 7.2**
- **MySQL 8.0**
- **Docker & Docker Compose**
- **Nginx**
- **Twig**
- **Doctrine ORM**

## 📋 Prérequis

- Docker Desktop installé
- Docker Compose installé
- Git (optionnel)

## 🔧 Installation

### 1. Cloner le projet (ou naviguer dans le dossier)

```bash
cd "Val Fusion"
```

### 2. Démarrer Docker Desktop

Assurez-vous que Docker Desktop est en cours d'exécution.

### 3. Construire et démarrer les conteneurs

```bash
docker-compose build
docker-compose up -d
```

### 4. Installer les dépendances Symfony

```bash
docker-compose exec php composer install
```

### 5. Créer la base de données

```bash
docker-compose exec php php bin/console doctrine:database:create
```

### 6. Créer les migrations

```bash
docker-compose exec php php bin/console make:migration
```

### 7. Exécuter les migrations

```bash
docker-compose exec php php bin/console doctrine:migrations:migrate
```

## 🌐 Accès à l'application

- **Site web** : http://localhost:8080
- **PHPMyAdmin** : http://localhost:8081
  - Serveur : `database`
  - Utilisateur : `valfusion`
  - Mot de passe : `valfusion`

## 📁 Structure du projet

```
Val Fusion/
├── bin/                    # Scripts Symfony
├── config/                 # Configuration Symfony
│   ├── packages/          # Configuration des bundles
│   ├── routes.yaml        # Routes
│   └── services.yaml      # Services
├── docker/                # Configuration Docker
│   ├── nginx/            # Configuration Nginx
│   └── php/              # Dockerfile PHP
├── migrations/           # Migrations de base de données
├── public/               # Fichiers publics
│   ├── css/             # Fichiers CSS
│   └── js/              # Fichiers JavaScript
├── src/                  # Code source
│   ├── Controller/      # Contrôleurs
│   ├── Entity/          # Entités Doctrine
│   ├── Form/            # Formulaires
│   └── Repository/      # Repositories
├── templates/            # Templates Twig
│   ├── home/           # Templates de la page d'accueil
│   └── partials/       # Composants réutilisables
├── docker-compose.yml   # Configuration Docker Compose
└── .env                 # Variables d'environnement
```

## 🎯 Fonctionnalités

- ✅ Page d'accueil avec hero section
- ✅ Section de présentation de l'entreprise
- ✅ Section des 4 entités (VAL BTP, VAL CONCEPT, VAL SECURIKOM, VAL FORMATION)
- ✅ Formulaire de contact fonctionnel
- ✅ Design responsive
- ✅ Animations au scroll
- ✅ Notice de cookies
- ✅ Liens réseaux sociaux
- ✅ Base de données MySQL

## 🛠️ Commandes utiles

### Arrêter les conteneurs
```bash
docker-compose stop
```

### Redémarrer les conteneurs
```bash
docker-compose restart
```

### Voir les logs
```bash
docker-compose logs -f
```

### Accéder au shell du conteneur PHP
```bash
docker-compose exec php bash
```

### Supprimer tous les conteneurs
```bash
docker-compose down
```

### Supprimer les conteneurs et les volumes
```bash
docker-compose down -v
```

## 📊 Base de données

Le projet utilise deux entités principales :

1. **Contact** : Stocke les messages du formulaire de contact
   - name (nom)
   - email (email)
   - message (message)
   - consent (consentement RGPD)
   - createdAt (date de création)

2. **Entity** : Représente les entités de VAL FUSION
   - name (nom de l'entité)
   - description (description courte)
   - details (détails)
   - icon (icône)
   - displayOrder (ordre d'affichage)

## 🎨 Personnalisation

### Modifier les couleurs

Éditez le fichier [public/css/style.css](public/css/style.css) et modifiez les variables CSS :

```css
:root {
    --primary-color: #1a237e;
    --secondary-color: #ff6f00;
    --accent-color: #00acc1;
    /* ... */
}
```

### Ajouter du contenu

Les templates se trouvent dans le dossier [templates/](templates/). Modifiez les fichiers Twig pour personnaliser le contenu.

## 📧 Configuration de l'envoi d'emails

Pour configurer l'envoi d'emails (formulaire de contact), modifiez la variable `MAILER_DSN` dans le fichier `.env` :

```env
MAILER_DSN=smtp://username:password@smtp.example.com:587
```

## 🔒 Sécurité

- Les données du formulaire sont validées côté serveur
- Protection CSRF activée sur les formulaires
- Consentement RGPD requis pour le formulaire de contact
- Mots de passe en base de données (à configurer si ajout d'authentification)

## 📝 Licence

Projet propriétaire - © VAL FUSION Groupe

## 👥 Auteur

Développé pour VAL FUSION - Spécialiste de la construction et du management

## 🆘 Support

Pour toute question ou problème :
- Email : contact@valfusion.fr
- Téléphone : 02.32.40.58.03
- Adresse : 101 Rue Grande, Val-De-Reuil, 27100, Normandie, France
