<?php

namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom',
                'attr' => [
                    'placeholder' => 'Votre nom',
                    'class' => 'form-control',
                    'maxlength' => 255
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'E-Mail',
                'attr' => [
                    'placeholder' => 'votre.email@exemple.com',
                    'class' => 'form-control',
                    'maxlength' => 255
                ],
            ])
            ->add('message', TextareaType::class, [
                'label' => 'Message',
                'attr' => [
                    'placeholder' => 'Votre message...',
                    'class' => 'form-control',
                    'rows' => 5,
                    'maxlength' => 5000
                ],
            ])
            ->add('consent', CheckboxType::class, [
                'label' => 'Je consens par la présente à ce que ces données soient stockées et traitées dans le but d\'établir un contact. Je sais que je peux révoquer mon consentement à tout moment',
                'constraints' => [
                    new IsTrue([
                        'message' => 'Vous devez accepter nos conditions.',
                    ]),
                ],
                'attr' => [
                    'class' => 'form-check-input'
                ],
                'mapped' => true,
                'required' => true,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }
}
