# Makefile pour Val Fusion

.PHONY: help build up down start stop restart logs shell composer-install db-create db-migrate

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Construire les conteneurs Docker
	docker-compose build

up: ## Démarrer les conteneurs
	docker-compose up -d

down: ## Arrêter et supprimer les conteneurs
	docker-compose down

start: ## Démarrer les conteneurs existants
	docker-compose start

stop: ## Arrêter les conteneurs
	docker-compose stop

restart: ## Redémarrer les conteneurs
	docker-compose restart

logs: ## Afficher les logs
	docker-compose logs -f

shell: ## Accéder au shell du conteneur PHP
	docker-compose exec php bash

composer-install: ## Installer les dépendances Composer
	docker-compose exec php composer install

db-create: ## Créer la base de données
	docker-compose exec php php bin/console doctrine:database:create --if-not-exists

db-migrate: ## Exécuter les migrations
	docker-compose exec php php bin/console doctrine:migrations:migrate --no-interaction

install: build up composer-install db-create db-migrate ## Installation complète du projet
