<?php

namespace App\Repository;

use App\Entity\Entity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Entity>
 */
class EntityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Entity::class);
    }

    public function findAllOrdered(): array
    {
        return $this->createQueryBuilder('e')
            ->orderBy('e.displayOrder', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
