#!/bin/bash

echo "=========================================="
echo "  VAL Fusion Pro - Démarrage production"
echo "=========================================="

cd /var/www/html

# ─── Permissions
mkdir -p var/cache/prod var/log
chown -R www-data:www-data var/
chmod -R 775 var/

# ─── Vérification des variables d'environnement obligatoires
if [ -z "$APP_SECRET" ]; then
    echo "[ERREUR] APP_SECRET n'est pas définie dans Render Environment Variables !"
fi

if [ -z "$DATABASE_URL" ]; then
    echo "[ERREUR] DATABASE_URL n'est pas définie dans Render Environment Variables !"
fi

echo ">>> APP_ENV = $APP_ENV"
echo ">>> DATABASE_URL définie : $([ -n "$DATABASE_URL" ] && echo OUI || echo NON)"

# ─── Compilation du cache Symfony avec la VRAIE DATABASE_URL de Render
echo ">>> Compilation du cache Symfony (prod)..."
php bin/console cache:clear --env=prod --no-debug --no-interaction
echo ">>> cache:clear terminé (code: $?)"

php bin/console cache:warmup --env=prod --no-debug --no-interaction
echo ">>> cache:warmup terminé (code: $?)"

# ─── Génération des proxies Doctrine
echo ">>> Génération des proxies Doctrine..."
php bin/console doctrine:orm:generate-proxies --env=prod --no-interaction 2>/dev/null || true

# ─── Attendre la base de données (max 60 secondes)
echo ">>> Attente de la base de données..."
for i in $(seq 1 20); do
    php bin/console doctrine:query:sql "SELECT 1" --env=prod > /dev/null 2>&1 && echo ">>> BDD prête !" && break
    echo "    Tentative $i/20..."
    sleep 3
done

# ─── Migrations
echo ">>> Migrations..."
php bin/console doctrine:migrations:migrate --env=prod --no-interaction --allow-no-migration

# ─── Assets
php bin/console assets:install public --env=prod --no-interaction 2>/dev/null || true

echo ">>> Démarrage Supervisord (Nginx + PHP-FPM)..."
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf

