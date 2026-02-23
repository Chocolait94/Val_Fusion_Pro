#!/bin/bash
# Ne pas utiliser set -e : on veut contrôler les erreurs manuellement

echo "=========================================="
echo "  VAL Fusion Pro - Démarrage production"
echo "=========================================="

# ─── Aller dans le répertoire du projet
cd /var/www/html

# ─── Permissions sur var/
mkdir -p var/cache/prod var/log
chown -R www-data:www-data var/
chmod -R 775 var/

# ─── Attendre que la base de données soit prête (max 60 secondes)
echo ">>> Attente de la base de données..."
for i in $(seq 1 20); do
    php bin/console doctrine:query:sql "SELECT 1" --env=prod > /dev/null 2>&1 && echo ">>> BDD prête !" && break
    echo "    Attente BDD ($i/20)..."
    sleep 3
done

# ─── Exécuter les migrations
echo ">>> Exécution des migrations..."
php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration --env=prod
if [ $? -ne 0 ]; then
    echo "[ATTENTION] Les migrations ont échoué, vérifier DATABASE_URL"
fi

# ─── Assets Symfony
echo ">>> Installation des assets..."
php bin/console assets:install public --no-interaction --env=prod

echo ">>> Démarrage Nginx + PHP-FPM via Supervisord..."
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
