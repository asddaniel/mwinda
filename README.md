
# Mwinda - Votre Plateforme de Réservation de Trajets

 
<!-- Remplacez le lien ci-dessus par une URL vers un GIF ou une image de présentation de votre application -->

**Mwinda** est une application web moderne et performante qui simule un service de réservation de trajets, inspirée des géants du secteur comme Uber et Yango. 


## Table des Matières

*   [Technologies et Outils](#technologies-et-outils)
*   [Logique de l'Application](#logique-de-lapplication)
*   [Fonctionnalités Clés](#fonctionnalités-clés)
*   [Prérequis](#prérequis)
*   [Installation et Lancement](#installation-et-lancement)
    *   [1. Cloner le Projet](#1-cloner-le-projet)
    *   [2. Configuration de l'Environnement](#2-configuration-de-lenvironnement)
    *   [3. Installation des Dépendances](#3-installation-des-dépendances)
    *   [4. Migration et Données de Test](#4-migration-et-données-de-test)
    *   [5. Lancement des Serveurs](#5-lancement-des-serveurs)
*   [Identifiants de Test](#identifiants-de-test)
*   [Auteur](#auteur)

---

## Technologies et Outils

Ce projet combine le meilleur des écosystèmes PHP et JavaScript pour créer une application web monolithique moderne et réactive.

*   **Backend : [Laravel 12](https://laravel.com/)**
    *   Framework PHP robuste et élégant pour la logique métier, la gestion de l'API et l'authentification.
    *   **Laravel Breeze** : Utilisé comme starter-kit pour une authentification complète et sécurisée.
    *   **Eloquent ORM** : Pour une interaction fluide et intuitive avec la base de données.

*   **Frontend : [React 19](https://react.dev/) avec [TypeScript](https://www.typescriptlang.org/)**
    *   Bibliothèque JavaScript pour construire des interfaces utilisateur dynamiques et composables.
    *   TypeScript pour un code frontend typé, plus sûr et plus facile à maintenir.

*   **Liaison Backend-Frontend : [Inertia.js](https://inertiajs.com/)**
    *   Le pont magique qui permet de créer une application monopage (SPA) avec la simplicité du développement "classique" côté serveur, sans avoir à construire une API REST complète.

*   **Styling : [Tailwind CSS 3](https://tailwindcss.com/)**
    *   Un framework CSS "utility-first" pour un design rapide, sur-mesure et parfaitement responsive. Le mode JIT est activé via Vite pour des performances optimales.

*   **Carte Interactive : [Leaflet](https://leafletjs.com/)**
    *   Bibliothèque JavaScript open-source pour des cartes interactives.
    *   **React-Leaflet** : Wrapper pour une intégration déclarative dans React.
    *   **Leaflet Routing Machine** & **Leaflet Control Geocoder** : Plugins pour le calcul d'itinéraire et la recherche d'adresses (géocodage via Nominatim).

*   **Build Tool : [Vite](https://vitejs.dev/)**
    *   Un outil de développement frontend nouvelle génération qui offre un démarrage de serveur quasi-instantané et un Hot Module Replacement (HMR) extrêmement rapide.



## Logique de l'Application

Le projet est structuré comme un monolithe Laravel, où le frontend React/TypeScript est directement intégré.

1.  **Authentification** : Gérée par Laravel Breeze, les pages de connexion et d'inscription sont des composants React personnalisés, offrant une expérience visuelle soignée.
2.  **Réservation** : L'utilisateur authentifié accède à un tableau de bord. Il peut rechercher un point de départ et de destination via des contrôles sur la carte Leaflet.
3.  **Géocodage** : Le plugin `leaflet-control-geocoder` interroge le service Nominatim pour convertir les adresses en coordonnées GPS.
4.  **Enregistrement** : Une fois les points de départ et de destination confirmés, le formulaire est soumis à un contrôleur Laravel via une requête Inertia. Le contrôleur valide les données (y compris les coordonnées) et crée une nouvelle entrée `Booking` dans la base de données.
5.  **Simulation de Recherche** : Après la création, le statut de la réservation passe à `searching`. Le frontend utilise un mécanisme de *polling* (interrogation à intervalle régulier) pour demander au backend l'état de la réservation. Le backend simule la confirmation d'un conducteur après un court délai.
6.  **Historique** : L'utilisateur peut consulter la liste de tous ses trajets passés sur une page dédiée, récupérés depuis la base de données.

---

## Fonctionnalités Clés

*   ✅ Page d'accueil professionnelle et responsive.
*   ✅ Système d'authentification complet et sécurisé (Inscription, Connexion).
*   ✅ Pages de connexion et d'inscription au design soigné.
*   ✅ Tableau de bord principal avec formulaire de réservation et carte interactive.
*   ✅ Recherche d'adresses de départ/destination directement sur la carte (géocodage).
*   ✅ Affichage dynamique de l'itinéraire et des marqueurs sur la carte.
*   ✅ Simulation de la recherche et de la confirmation d'un conducteur avec mise à jour en quasi-temps réel.
*   ✅ Page d'historique des réservations avec statuts.
*   ✅ Design entièrement responsive et support du thème sombre (dark mode).

---

## Prérequis

Assurez-vous que les logiciels suivants sont installés sur votre machine :

*   **PHP** (>= 8.3)
*   **Composer**
*   **Node.js** (>= 18.0) & **npm**
*   Un serveur de base de données (ex: **MySQL**, **PostgreSQL**)

---

## Installation et Lancement

Suivez ces étapes pour faire fonctionner le projet sur votre machine locale.

### 1. Cloner le Projet

```
git clone https://github.com/votre-repo/mwinda.git
cd mwinda

2. Configuration de l'Environnement

Créez votre fichier d'environnement et configurez la base de données.

``` 
# Copiez le fichier d'exemple
cp .env.example .env

# Générez la clé d'application
php artisan key:generate


Ensuite, ouvrez le fichier .env et mettez à jour les informations de connexion à votre base de données (DB_DATABASE, DB_USERNAME, DB_PASSWORD).

3. Installation des Dépendances

Installez les dépendances PHP (via Composer) et JavaScript (via npm).

``` 
# Installer les paquets PHP
composer install

# Installer les paquets JavaScript
npm install

4. Migration et Données de Test

Exécutez les migrations pour créer la structure de la base de données et peuplez-la avec des données de test (un utilisateur de test avec plusieurs réservations).

``` 
php artisan migrate:fresh --seed


Note : Cette commande efface et recrée la base de données. Utilisez-la avec prudence.

5. Lancement des Serveurs

Vous devez lancer deux serveurs en parallèle dans deux terminaux séparés.

Terminal 1 : Serveur Vite (pour le frontend)

``` 
npm run dev


Terminal 2 : Serveur PHP (pour le backend)

``` 
php artisan serve


Votre application Mwinda est maintenant accessible à l'adresse http://127.0.0.1:8000.

Identifiants de Test

Grâce aux seeders, un utilisateur de test est déjà disponible pour vous permettre d'explorer rapidement les fonctionnalités de l'application connectée.

Email : test@mwinda.com

Mot de passe : password

Auteur

Ce projet a été conçu, développé et réalisé avec passion par :

Daniel Assani

Date : Samedi 12 Juillet 2025


