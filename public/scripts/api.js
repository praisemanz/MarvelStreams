const apiUrl = 'http://localhost:5000/api/marvel';

const fetchHomeContent = async () => {
    const response = await fetch(`${apiUrl}/home`);
    const data = await response.json();
    const homeContent = document.getElementById('home-content');
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'content-item';
        div.innerHTML = `
            <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.title}">
            <h2>${item.title}</h2>
        `;
        homeContent.appendChild(div);
    });
}

const fetchSeries = async () => {
    const response = await fetch(`${apiUrl}/series`);
    const data = await response.json();
    const seriesContent = document.getElementById('series-content');
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'content-item';
        div.innerHTML = `
            <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.title}">
            <h2>${item.title}</h2>
        `;
        seriesContent.appendChild(div);
    });
}

const fetchMovie = async (id) => {
    const response = await fetch(`${apiUrl}/movie/${id}`);
    const data = await response.json();
    const movieContent = document.getElementById('movie-content');
    const movie = data;
    movieContent.innerHTML = `
        <h1>${movie.title}</h1>
        <img src="${movie.thumbnail.path}.${movie.thumbnail.extension}" alt="${movie.title}">
        <p>${movie.description}</p>
    `;
}

const performSearch = async () => {
    const query = document.querySelector('.search-input').value;
    const response = await fetch(`${apiUrl}/search?query=${query}`);
    const data = await response.json();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'content-item';
        div.innerHTML = `
            <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.title}">
            <h2>${item.title}</h2>
        `;
        searchResults.appendChild(div);
    });
}
