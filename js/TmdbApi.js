class TmdbApi {
    #accessToken;
    #baseUrl = 'https://api.themoviedb.org/3';
    #config = {};
    
    static LANG = {
        FR: 'fr-FR',
        US: 'en-us'
    };
    
    constructor(accessToken) {
        this.#accessToken = accessToken;
    }
    
    /**
     * Permet d'ajouter/modifier des paramètres globaux (comme la langue) pour les requêtes
     * 
     * @param {string} param Le nom du paramètre à ajouter/modifier
     * @param {any} value La valeur du paramètre à ajouter/modifier
     * @return TmdbApi
     */
    setParameter(param, value) {
        // On vérifie que le paramètre peut être ajouté/modifié
        const parameters = [
            'language'  
        ];
        
        if (!parameters.includes(param)) {
            throw new Error("Parameter does not exist");
        }
        
        this.#config[param] = value;
        
        return this;
    }
    
    /**
     * Permet d'envoyer une requête HTTP vers l'API
     * 
     * @param {string} endpoint Le endpoint vers lequel on envoie la requête
     * @param {object} params Les éventuels paramètres qui seront ajoutés à la chaîne de requête
     * @return {Promise} Une promesse contenant la réponse au format json
     */
    sendRequest(endpoint, params = null) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.#accessToken
            }
        };
        
        // On fusionne les paramètres globaux avec les paramètres spécifiques à la requête
        params = {...params, ...this.#config};
        
        // On génère une chaîne de requêtes basés sur ces paramètres
        const queryString = new URLSearchParams(params);
        
        // Envoi de la requête vers l'API
        return fetch(`${this.#baseUrl}${endpoint}?${queryString}`, options).then(response => response.json());
    }
    
    /**
     * Prépare la requête de recherche de films
     * 
     * @param {string} search Le texte de la recherche
     * @param {Number} page Le numéro de la page dont on veut les résultats
     * @return {Promise}
     */
    searchMovies(search, page = 1) {
        const params = {
            query: search,
            page: page
        };
        
        return this.sendRequest('/search/movie', params);
    }
    
    /**
     * Prépare la requête de récupération des films à découvrir
     * 
     * @return {Promise}
     */
    discoverMovies() {
        return this.sendRequest('/discover/movie');
    }
}

export default TmdbApi;