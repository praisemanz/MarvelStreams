document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-query').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});
