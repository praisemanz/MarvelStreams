document.addEventListener("DOMContentLoaded", () => {
    // Initialize the app
    initApp();
});

const apiKey = 'YOUR_MARVEL_API_KEY';
const apiUrl = 'https://gateway.marvel.com/v1/public';

// Initialize the app
function initApp() {
    loadPopularMovies();
    loadPopularSeries();
    loadNewPopular();
    addSearchFunctionality();
    initDarkMode();
    addInteractiveButtons();
    addMovieControls();
    loadDarkModePreference();
    setupLoginForm();
    setupSignUpForm();
    setupHamburgerMenu();
}

// Fetch Marvel API Data
async function fetchMarvelData(endpoint, params = {}) {
    const url = new URL(`${apiUrl}/${endpoint}`);
    url.search = new URLSearchParams({ ...params, apikey: apiKey });

    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
}

// Load Popular Movies
async function loadPopularMovies() {
    const movies = await fetchMarvelData('comics', { limit: 6 });
    const movieContainer = document.querySelector('.movies .row');
    movieContainer.innerHTML = movies.map(movie => createMovieItem(movie)).join('');
}

// Load Popular Series
async function loadPopularSeries() {
    const series = await fetchMarvelData('series', { limit: 6 });
    const seriesContainer = document.querySelector('.series .row');
    seriesContainer.innerHTML = series.map(serie => createSeriesItem(serie)).join('');
}

// Load New & Popular
async function loadNewPopular() {
    const newPopular = await fetchMarvelData('comics', { limit: 6, orderBy: '-onsaleDate' });
    const newPopularContainer = document.querySelector('.new-popular .row');
    newPopularContainer.innerHTML = newPopular.map(item => createMovieItem(item)).join('');
}

// Create Movie Item HTML
function createMovieItem(movie) {
    return `
        <div class="col-md-2 movie-item">
            <img src="${movie.thumbnail.path}.${movie.thumbnail.extension}" alt="${movie.title}" class="img-fluid">
            <p class="text-white">${movie.title}</p>
        </div>
    `;
}

// Create Series Item HTML
function createSeriesItem(series) {
    return `
        <div class="col-md-2 series-item">
            <img src="${series.thumbnail.path}.${series.thumbnail.extension}" alt="${series.title}" class="img-fluid">
            <p class="text-white">${series.title}</p>
        </div>
    `;
}

// Add Search Functionality
function addSearchFunctionality() {
    const searchInput = document.querySelector('.input-group input');
    const searchButton = document.querySelector('.input-group button');

    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

// Perform Search
async function performSearch(query) {
    if (!query) return;

    const searchResults = await fetchMarvelData('comics', { titleStartsWith: query });
    const searchContainer = document.querySelector('.search-results .row');
    searchContainer.innerHTML = searchResults.map(item => createMovieItem(item)).join('');

    if (searchResults.length === 0) {
        searchContainer.innerHTML = '<p class="text-white">No results found</p>';
    }
}

// Initialize Dark Mode
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('btn', 'btn-secondary');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.querySelector('header .header-right').appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

// Load Dark Mode Preference
function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Add Interactive Buttons
function addInteractiveButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('btn-clicked');
            setTimeout(() => {
                button.classList.remove('btn-clicked');
            }, 300);
        });
    });
}

// Add Movie Controls
function addMovieControls() {
    const movieItems = document.querySelectorAll('.movie-item img');
    movieItems.forEach(movie => {
        movie.addEventListener('click', () => {
            openMovieModal(movie);
        });
    });
}

// Open Movie Modal
function openMovieModal(movie) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${movie.alt}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <video controls autoplay>
                        <source src="videos/${movie.alt}.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    $(modal).modal('show');

    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

// Setup Login Form
function setupLoginForm() {
    const signInButton = document.querySelector('.btn-danger.ml-3');
    const signInForm = document.querySelector('#signInModal form');

    signInButton.addEventListener('click', () => {
        openSignInModal();
    });

    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleLogin();
    });
}

// Handle Login
function handleLogin() {
    const username = document.querySelector('#signInModal #username').value;
    const password = document.querySelector('#signInModal #password').value;

    // For demonstration, simply log the credentials
    console.log(`Username: ${username}, Password: ${password}`);

    // Close the modal after login attempt
    closeSignInModal();
}

// Setup Sign Up Form
function setupSignUpForm() {
    const signUpButton = document.querySelector('.btn-danger.signup');
    const signUpForm = document.querySelector('#signUpModal form');

    signUpButton.addEventListener('click', () => {
        openSignUpModal();
    });

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSignUp();
    });
}

// Handle Sign Up
function handleSignUp() {
    const username = document.querySelector('#signUpModal #username').value;
    const email = document.querySelector('#signUpModal #email').value;
    const password = document.querySelector('#signUpModal #password').value;

    // For demonstration, simply log the credentials
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

    // Close the modal after sign up attempt
    closeSignUpModal();
}

// Setup Hamburger Menu
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelector('.navbar-nav');
    const closeMenu = document.querySelector('.close-menu');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        closeMenu.classList.toggle('show');
    });

    closeMenu.addEventListener('click', () => {
        navLinks.classList.remove('open');
        closeMenu.classList.remove('show');
    });
}

// Open Sign In Modal
function openSignInModal() {
    document.getElementById('signInModal').style.display = 'block';
}

// Close Sign In Modal
function closeSignInModal() {
    document.getElementById('signInModal').style.display = 'none';
}

// Open Sign Up Modal
function openSignUpModal() {
    document.getElementById('signUpModal').style.display = 'block';
}

// Close Sign Up Modal
function closeSignUpModal() {
    document.getElementById('signUpModal').style.display = 'none';
}

// Load Dark Mode Preference
function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Enhanced Search Functionality
function addSearchFunctionality() {
    const searchInput = document.querySelector('.input-group input');
    const searchButton = document.querySelector('.input-group button');

    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

// Perform Search
async function performSearch(query) {
    if (!query) return;

    const searchResults = await fetchMarvelData('comics', { titleStartsWith: query });
    const searchContainer = document.querySelector('.search-results .row');
    searchContainer.innerHTML = searchResults.map(item => createMovieItem(item)).join('');

    if (searchResults.length === 0) {
        searchContainer.innerHTML = '<p class="text-white">No results found</p>';
    }
}

// Fetch Marvel Data with Pagination
async function fetchMarvelData(endpoint, params = {}, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const url = new URL(`${apiUrl}/${endpoint}`);
    url.search = new URLSearchParams({ ...params, apikey: apiKey, offset, limit });

    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
}

// Add Pagination to Search Results
function addPagination(searchResults) {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');

    const totalPages = Math.ceil(searchResults.length / 20);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('btn', 'btn-secondary');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            loadPageResults(i);
        });
        paginationContainer.appendChild(pageButton);
    }

    const searchContainer = document.querySelector('.search-results');
    searchContainer.appendChild(paginationContainer);
}

// Load Page Results
async function loadPageResults(page) {
    const query = document.querySelector('.input-group input').value;
    const searchResults = await fetchMarvelData('comics', { titleStartsWith: query }, page);
    const searchContainer = document.querySelector('.search-results .row');
    searchContainer.innerHTML = searchResults.map(item => createMovieItem(item)).join('');
}

// Run the app
initApp();
