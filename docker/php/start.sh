#!/bin/bash
set -e

echo "=========================================="
echo "  VAL Fusion Pro - Démarrage production"
echo "=========================================="

# ─── Aller dans le répertoire du projet
cd /var/www/html

# ─── Attendre que la base de données soit prête (max 30 secondes)
echo ">>> Vérification de la base de données..."
for i in {1..15}; do
    php bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1 && break
    echo "    Attente BDD ($i/15)..."
    sleep 2
done

# ─── Nettoyer et reconstruire le cache Symfony en production
echo ">>> Compilation du cache Symfony (prod)..."
APP_ENV=prod php bin/console cache:clear --no-debug --no-interaction 2>/dev/null || true
APP_ENV=prod php bin/console cache:warmup --no-debug --no-interaction 2>/dev/null || true

# ─── Exécuter les migrations
echo ">>> Exécution des migrations..."
APP_ENV=prod php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration 2>/dev/null || true

# ─── Installer les assets Symfony
echo ">>> Installation des assets publics..."
APP_ENV=prod php bin/console assets:install public --no-interaction 2>/dev/null || true

# ─── Permissions finales
chown -R www-data:www-data /var/www/html/var/ 2>/dev/null || true

echo ">>> Démarrage Nginx + PHP-FPM via Supervisord..."
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
