# Makefile pour Val Fusion - Version sécurisée mise à jour

.PHONY: help build up down start stop restart logs shell composer-install composer-update composer-audit db-create db-migrate db-reset cache-clear security-check install

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# =====================================
# Commandes Docker
# =====================================

build: ## Construire les conteneurs Docker
	docker-compose build --no-cache

up: ## Démarrer les conteneurs
	docker-compose up -d

down: ## Arrêter et supprimer les conteneurs
	docker-compose down

start: ## Démarrer les conteneurs existants
	docker-compose start

stop: ## Arrêter les conteneurs
	docker-compose stop

restart: ## Redémarrer les conteneurs
	docker-compose restart nginx php

logs: ## Afficher les logs en temps réel
	docker-compose logs -f

shell: ## Accéder au shell du conteneur PHP
	docker-compose exec php bash

# =====================================
# Commandes Composer
# =====================================

composer-install: ## Installer les dépendances Composer
	docker-compose exec php composer install --no-dev --optimize-autoloader

composer-update: ## Mettre à jour les dépendances
	docker-compose exec php composer update --with-all-dependencies

composer-audit: ## Vérifier les vulnérabilités de sécurité
	docker-compose exec php composer audit

composer-require: ## Installer un package (usage: make composer-require PKG=symfony/rate-limiter)
	docker-compose exec php composer require $(PKG)

# =====================================
# Commandes Base de données
# =====================================

db-create: ## Créer la base de données
	docker-compose exec php php bin/console doctrine:database:create --if-not-exists

db-migrate: ## Exécuter les migrations
	docker-compose exec php php bin/console doctrine:migrations:migrate --no-interaction

db-reset: ## Réinitialiser la base de données (ATTENTION: supprime toutes les données)
	docker-compose exec php php bin/console doctrine:database:drop --force --if-exists
	docker-compose exec php php bin/console doctrine:database:create
	docker-compose exec php php bin/console doctrine:migrations:migrate --no-interaction

db-diff: ## Générer une nouvelle migration
	docker-compose exec php php bin/console doctrine:migrations:diff

# =====================================
# Commandes Cache et Optimisation
# =====================================

cache-clear: ## Vider le cache Symfony
	docker-compose exec php php bin/console cache:clear
	docker-compose exec php php bin/console cache:warmup

cache-prod: ## Vider le cache en mode production
	docker-compose exec php php bin/console cache:clear --env=prod
	docker-compose exec php php bin/console cache:warmup --env=prod

# =====================================
# Commandes de Sécurité
# =====================================

security-check: composer-audit ## Vérification de sécurité complète
	@echo "✅ Vérification des vulnérabilités terminée"

security-headers: ## Tester les headers de sécurité HTTP
	@echo "Headers de sécurité configurés dans nginx/default.conf:"
	@grep "add_header" docker/nginx/default.conf || echo "Aucun header trouvé"

# =====================================
# Installation et Déploiement
# =====================================

install: build up composer-install db-create db-migrate cache-clear ## Installation complète du projet
	@echo "✅ Installation terminée ! Accédez au site sur http://localhost:8001"

install-dev: build up ## Installation en mode développement
	docker-compose exec php composer install
	docker-compose exec php php bin/console doctrine:database:create --if-not-exists
	docker-compose exec php php bin/console doctrine:migrations:migrate --no-interaction
	docker-compose exec php php bin/console cache:clear
	@echo "✅ Installation DEV terminée !"

deploy-prod: ## Déploiement en production (avec optimisations)
	docker-compose exec php composer install --no-dev --optimize-autoloader --classmap-authoritative
	docker-compose exec php php bin/console cache:clear --env=prod
	docker-compose exec php php bin/console cache:warmup --env=prod
	docker-compose restart nginx php
	@echo "✅ Déploiement PROD terminé !"

# =====================================
# Tests et Validation
# =====================================

validate: ## Valider la configuration Symfony
	docker-compose exec php php bin/console debug:container
	docker-compose exec php php bin/console debug:router
	docker-compose exec php php bin/console doctrine:schema:validate

fix-permissions: ## Corriger les permissions des fichiers
	docker-compose exec php chown -R www-data:www-data var/cache var/log
	docker-compose exec php chmod -R 775 var/cache var/log

# =====================================
# Nettoyage
# =====================================

clean: ## Nettoyer les fichiers temporaires
	docker-compose exec php rm -rf var/cache/* var/log/*

clean-all: down clean ## Nettoyer tout (conteneurs + fichiers)
	docker-compose down -v
	@echo "✅ Nettoyage complet effectué"

# =====================================
# Commandes de développement
# =====================================

watch-logs: logs ## Alias pour suivre les logs

ps: ## Afficher l'état des conteneurs
	docker-compose ps

exec-php: ## Exécuter une commande PHP (usage: make exec-php CMD="bin/console debug:router")
	docker-compose exec php $(CMD)

