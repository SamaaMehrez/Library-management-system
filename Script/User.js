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

        const bookLink = document.createElement('a');
        bookLink.href = `BooksDetails.html#${book.id}`;
        bookLink.classList.add('book-link');

        const bookImage = document.createElement('img');
        bookImage.src = book.image;
        bookImage.alt = book.name;

        const bookLabelLink = document.createElement('a');
        bookLabelLink.href = `BooksDetails.html#${book.id}`;
        bookLabelLink.classList.add('book-link');

        const bookLabel = document.createElement('label');
        bookLabel.classList.add('Books-label');
        bookLabel.textContent = book.name;

        const authorSpan = document.createElement('span');
        authorSpan.classList.add('author-name');
        authorSpan.style.display = 'none';
        authorSpan.textContent = book.author;

        bookLink.appendChild(bookImage);
        bookLabelLink.appendChild(bookLabel);

        // add event listener to both links
        [bookLink, bookLabelLink].forEach(link => {
            link.addEventListener('click', function () {
                let VBook = {
                    id: book.id,
                    name: book.name,
                    image: book.image,
                    description: book.description,
                    Available: book.Available,
                    author: book.author,
                    category: book.category // typo fixed here too
                };
                window.localStorage.setItem('viewedBook', JSON.stringify(VBook));
            });
        });

        bookElement.appendChild(bookLink);
        bookElement.appendChild(bookLabelLink);
        bookElement.appendChild(authorSpan);

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



