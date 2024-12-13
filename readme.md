# TP 5 : Recherche de films

## Rendu

Ce projet sera à réaliser en solo. Le rendu peut se faire soit par un dépôt github, soit en le déposant sur l'ide de la 3wa, soit par une archive.

## Objectifs

Réaliser une petite application de recherche de films depuis une api rest en JS natif sans framework.

## Liens utiles

* [Documentation API](https://developer.themoviedb.org/reference/intro/getting-started)
* [Site TMDB](https://www.themoviedb.org/)

## Informations utiles

* Pour pouvoir utiliser cette api, il faut disposer d'un jeton d'accès (access token)

## Instructions

### Récupérer le jeton d'accès

* Créer un compte sur le site *tmdb.org*
* Aller dans "Paramètres" puis dans "API" pour créer le jeton d'accès
* Remplir avec des informations fictives le formulaire (ex "application à titre éducatif"), le jeton est généré immédiatement

### Mettre en place l'interface

* Créer un fichier *index.html*
* Créer un formulaire de recherche avec un label, un champ de recherche et un bouton pour valider la recherche
* Créer une liste dans laquelle on mettra tous les résultats de la recherche

### Classe TmdbApi

* Créer une classe *TmdbApi* dans un fichier *TmdbApi.js*
* Cette classe aura comme propriété le token d'accès
* Cette classe aura une méthode *discoverMovies* qui renvoie une liste de 20 films
* Cette classe aura une méthode *searchMovies* qui prend en paramètre le texte de la recherche et qui renvoie une liste de 20 films correspondants à la recherche

### Affichage des films à découvrir (les recommandations)

Lorsque l'on arrive sur la page du site, récupérer la liste des films à découvrir (juste la première page) et les afficher dans la liste. Ces films sont renvoyés à l'aide du endpoint */discover/movie*.

### Affichage des films de la recherche

Lorsque l'on soumet une recherche avec le formulaire, récupérer la liste des films correspondants à la recherche et les afficher dans la liste. Ces films sont renvoyés à l'aide du endpoint */search/movie*.

### Pagination

Afficher une pagination pour la recherche des films. Le nombre de pages total est indiqué dans la réponse du serveur à chaque fois et le numéro de la page peut être fourni à la requête dans la chaîne de requête.

### [BONUS] Langue

Ajouter un menu déroulant pour que l'on puisse changer la langue des résultats.

## Critères de notation

* Affichage des films
* Propreté du code
* Bien structurer le code pour qu'il soit le plus réutilisable possible (séparation en plusieurs fichiers, classes, fonctions...)
* Utiliser await/async
* Gérer les erreurs