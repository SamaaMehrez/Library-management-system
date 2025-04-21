const slider = document.querySelector('.slider');
const prevBtn=this.document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn');
let scrollAmount = 0;
const scrollStep = 100;
const maxScroll = slider.scrollWidth - slider.clientWidth;
nextBtn.addEventListener('click', () => {
    if (scrollAmount < maxScroll) {
        scrollAmount += scrollStep;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
});

prevBtn.addEventListener('click', () => {
    if (scrollAmount > 0) {
        scrollAmount -= scrollStep;
        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    displayBooks();
    setupSearch(); // <-- add this line
});

function displayBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const allBooksContainer = document.querySelectorAll('.main')[0];

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('Books');

        bookElement.innerHTML = `
            <a href="BooksDetails.html#${book.id}">
                <img src="${book.image}" alt="${book.name}">
            </a>
            <a href="BooksDetails.html#${book.id}">
                <label class="Books-label">${book.name}</label>
            </a>
            <span class="author-name" style="display: none">${book.author}</span>
        `;

        allBooksContainer.appendChild(bookElement);
    });
}



function setupSearch() {
    const searchInput = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterBooks(searchTerm);
    });

    // Optional: Live search as user types
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterBooks(searchTerm);
    });
}

function filterBooks(searchTerm) {
    const allBooks = document.querySelectorAll('.main .Books');
    allBooks.forEach(book => {
        const title = book.querySelector('label').innerText.toLowerCase();
        const author = book.querySelector('.author-name').innerText.toLowerCase();

        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            book.style.display = 'block';

        } else {
            book.style.display = 'none';
        }

    });
}



