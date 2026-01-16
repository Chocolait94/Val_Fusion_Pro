<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use App\Repository\EntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig');
    }

    #[Route('/a-propos', name: 'app_about')]
    public function about(): Response
    {
        return $this->render('home/about.html.twig');
    }

    #[Route('/val-concept', name: 'app_val_concept')]
    public function valConcept(): Response
    {
        return $this->render('home/val_concept.html.twig');
    }

    #[Route('/val-formation', name: 'app_val_formation')]
    public function valFormation(): Response
    {
        return $this->render('home/val_formation.html.twig');
    }

    #[Route('/val-btp', name: 'app_val_btp')]
    public function valBtp(): Response
    {
        return $this->render('home/val_btp.html.twig');
    }

    #[Route('/val-securikom', name: 'app_val_securikom')]
    public function valSecurikom(): Response
    {
        return $this->render('home/val_securikom.html.twig');
    }

    #[Route('/mentions-legales', name: 'app_mentions_legales')]
    public function mentionsLegales(): Response
    {
        return $this->render('home/mentions_legales.html.twig');
    }

    #[Route('/politique-de-confidentialite', name: 'app_politique')]
    public function politique(): Response
    {
        return $this->render('home/politique.html.twig');
    }

    #[Route('/contact', name: 'app_contact')]
    public function contact(
        Request $request,
        EntityManagerInterface $entityManager
    ): Response {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($contact);
            $entityManager->flush();

            $this->addFlash('success', 'Votre message a été envoyé avec succès !');

            return $this->redirectToRoute('app_contact');
        }

        return $this->render('home/contact.html.twig', [
            'contactForm' => $form->createView(),
        ]);
    }
}
