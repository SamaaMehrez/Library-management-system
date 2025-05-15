document.addEventListener('DOMContentLoaded', function () {
    setupSlider();
    setupSearch();
});

function setupSlider() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let scrollAmount = 0;
    const scrollStep = 200; // Adjust if needed

    nextBtn.addEventListener('click', () => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (scrollAmount < maxScroll) {
            scrollAmount += scrollStep;
            slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', () => {
        if (scrollAmount > 0) {
            scrollAmount -= scrollStep;
            slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');
    const filterSelect = document.getElementById('filter');
    const allBooksSection = document.getElementById('All-Books');

    function filterBooks(searchTerm, searchType) {
        const allBooks = document.querySelectorAll('.main .Books');
        allBooks.forEach(book => {
            const title = book.querySelector('.Books-label')?.innerText.toLowerCase() || '';
            const author = book.querySelector('.author-name')?.innerText.toLowerCase() || '';
            const match =
                (searchType === 'name' && title.includes(searchTerm)) ||
                (searchType === 'author' && author.includes(searchTerm)) ||
                (searchType === 'All' && (title.includes(searchTerm) || author.includes(searchTerm)));

            book.style.display = match ? 'flex' : 'none';
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const searchType = filterSelect.value;
        filterBooks(searchTerm, searchType);
        if (searchTerm !== '') {
            allBooksSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
}
