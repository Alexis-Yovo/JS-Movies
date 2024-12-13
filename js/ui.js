import {waitFor} from './utils.js';

// Les éléments html de la page
const elements = {
    searchForm: document.querySelector('#search-form'),
    searchInput: document.querySelector('#search'),
    moviePagination: document.querySelector('#movie-pagination'),
    movieList: document.querySelector('#movie-list'),
    errorText: document.querySelector('#error')
};

// Mise en place de l'événement lorsque l'on soumet le formulaire 
// et appel d'une fonction callback à qui on passe la valeur du champ de recherche
export function addFormSubmitListener(onFormSubmitted) {
    elements.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        onFormSubmitted(elements.searchInput.value);
    });
}

// Affichage de tous les films
export function renderMovies(movies) {
    if (movies.length == 0) {
        elements.movieList.innerHTML = `<li>Aucun résultat trouvé</li>`;
        return;
    }
    
    elements.movieList.innerHTML = movies.map(movie => {
        return `<li>
            <article class="flex">
                <div>
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}</p>
                </div>
                <figure>
                    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">
                </figure>
            </article>
        </li>`;
    }).join('');
}

// Affichage de la pagination et mise en place de l'événement lorsque l'on clique sur un lien de la pagination
export function renderPagination(totalPages, onPageClicked) {
    elements.moviePagination.innerHTML = '';
    
    for (let page = 1; page <= totalPages; page++) {
        const link = document.createElement('a');
        link.href = `?page=${page}`;
        link.textContent = page;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Mise à jour de l'historique de navigation
            const url = new URL(location);
            url.searchParams.set("page", page);
            history.pushState({}, "", url);
            
            // On appelle la fonction callback avec le numéro de la page
            onPageClicked(page);
        });
        
        const listItem = document.createElement('li');  
        listItem.append(link);
        
        elements.moviePagination.append(listItem);
    }
}

export async function showError(errorMessage) {
    elements.errorText.textContent = errorMessage;
    elements.errorText.removeAttribute('hidden');
    
    await waitFor(5);
    
    elements.errorText.setAttribute('hidden', true);
}