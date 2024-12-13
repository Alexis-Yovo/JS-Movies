import TmdbApi from './TmdbApi.js';
import {renderMovies, addFormSubmitListener, renderPagination, showError} from './ui.js';

// Au chargement de la page web on affiche les films à découvrir
(async () => {
    try {
        // Votre token d'accès
        const accessToken = "";
        
        if (accessToken.length == 0) {
            throw new Error("Access token cannot be empty");
        }
        
        const tmdbApi = new TmdbApi(accessToken);
        
        // Affiche tous les films de la recherche de la page précisée et renvoie le nombre de pages
        const loadMovies = async (search, page = 1) => {
            try {
                if (search.length == 0) {
                    throw new Error("Search cannot be empty");
                }
                
                const response = await tmdbApi.setParameter('language', TmdbApi.LANG.FR).searchMovies(search, page);
                
                // Affichage des films
                renderMovies(response.results);
                
                // On retourne le nombre de pages ou 0 si aucun résultat
                return response.results.length > 0 ? response.total_pages : 0;
            } catch (error) {
                showError(error.message);
            }
        };
        
        const response = await tmdbApi.setParameter('language', TmdbApi.LANG.FR).discoverMovies();
        renderMovies(response.results);
        
        // Lorsque le formulaire a été soumis on affiche les films correspondants à la recherche
        // et on affiche la pagination
        addFormSubmitListener(async (search) => {
            const totalPages = await loadMovies(search);
            
            // Pas de page ? On ne génère pas la pagination
            if (totalPages == 0) {
                return;
            }
            
            // Affichage de la pagination et mise en place de l'événement lors du clic sur un lien de pagination
            renderPagination(totalPages, async (page) => loadMovies(search, page));
        });
    } catch (error) {
        showError(error.message);
    }
})();