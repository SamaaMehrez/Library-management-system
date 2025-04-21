document.addEventListener('DOMContentLoaded', function() {
    displayTrendingBooks(); 
    displayBooks();
    setupSearch(); 
    setupSlider();  
});

function displayTrendingBooks() {
    const slider = document.querySelector('.slider');
    const books = JSON.parse(localStorage.getItem('books')) || [];


    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';

        const img = document.createElement('img');
        img.src = book.image;
        img.alt = book.name;
        img.style.width = '180px';
        img.style.height = '200px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '5px';
        img.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

        const imgLink = document.createElement('a');
        imgLink.href = "BooksDetails.html#${book.id}";
        imgLink.appendChild(img);

        const label = document.createElement('label');
        label.className = 'book-label';
        label.textContent = book.name;
        label.style.display = 'block';
        label.style.marginTop = '8px';
        label.style.fontSize = '14px';
        label.style.color = '#000000';

        const labelLink = document.createElement('a');
        labelLink.href = "BooksDetails.html#${book.id}";
        labelLink.appendChild(label);

        bookItem.appendChild(imgLink);
        bookItem.appendChild(labelLink);
        slider.appendChild(bookItem);
    });
}

function setupSlider() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let scrollAmount = 0;
    const scrollStep = 180;
    nextBtn.addEventListener('click', () => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
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
}

function displayBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const allBooksContainer = document.querySelector('.main');
    allBooksContainer.innerHTML = '';

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('Books');

        bookElement.innerHTML = `
            <a href="BooksDetails.html#${book.id}">
                <img src="${book.image}" alt="${book.name}" style="width:200px;height:260px;object-fit:cover;border-radius:5px;">
            </a>
            <a href="BooksDetails.html#${book.id}">
                <label class="Books-label">${book.name}</label>
            </a>
            <span class="author-name" style="display:none">${book.author}</span>
        `;

        allBooksContainer.appendChild(bookElement);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');
    const filterSelect = document.getElementById('filter'); // The <select> element
    const allBooksSection = document.getElementById('All-Books');

    searchBtn.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const searchType = filterSelect.value; // Get selected option (name or author)
        filterBooks(searchTerm, searchType);
        allBooksSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Optional: Live search as user types
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const searchType = filterSelect.value; // Get selected option (name or author)
        filterBooks(searchTerm, searchType);
        allBooksSection.scrollIntoView({ behavior: 'smooth' });
    });
}

function filterBooks(searchTerm, searchType) {
    const allBooks = document.querySelectorAll('.main .Books');
    allBooks.forEach(book => {
        const title = book.querySelector('.Books-label').innerText.toLowerCase();
        const author = book.querySelector('.author-name').innerText.toLowerCase();

        if (
            (searchType === 'name' && title.includes(searchTerm)) ||
            (searchType === 'author' && author.includes(searchTerm))
        ) {
            book.style.display = 'flex'; // Show the book
        } else {
            book.style.display = 'none'; // Hide the book
        }
    });
}