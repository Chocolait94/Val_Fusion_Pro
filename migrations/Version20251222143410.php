<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251222143410 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Utilisation de l'API Schema Doctrine (compatible MySQL et PostgreSQL)
        $businessEntity = $schema->createTable('business_entity');
        $businessEntity->addColumn('id', 'integer', ['autoincrement' => true]);
        $businessEntity->addColumn('name', 'string', ['length' => 255]);
        $businessEntity->addColumn('description', 'text');
        $businessEntity->addColumn('details', 'text', ['notnull' => false]);
        $businessEntity->addColumn('icon', 'string', ['length' => 255, 'notnull' => false]);
        $businessEntity->addColumn('display_order', 'integer');
        $businessEntity->setPrimaryKey(['id']);

        $contact = $schema->createTable('contact');
        $contact->addColumn('id', 'integer', ['autoincrement' => true]);
        $contact->addColumn('name', 'string', ['length' => 255]);
        $contact->addColumn('email', 'string', ['length' => 255]);
        $contact->addColumn('message', 'text');
        $contact->addColumn('consent', 'boolean');
        $contact->addColumn('created_at', 'datetime');
        $contact->setPrimaryKey(['id']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('contact');
        $schema->dropTable('business_entity');
    }
}
