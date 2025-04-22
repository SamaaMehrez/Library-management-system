document.addEventListener('DOMContentLoaded', function() {
    displayTrendingBooks();
    displayBooks();
    setupSearch();
    setupSlider();
});

function displayTrendingBooks() {
    const slider = document.querySelector('.slider');
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const trendingBooks = books.filter(book => book.trending === "Yes");


    trendingBooks.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';

        // إنشاء عنصر الصورة مع إعدادات الحجم والتأثيرات
        const img = document.createElement('img');
        img.src = book.image;
        img.alt = book.name;
        img.style.width = '100px';
        img.style.height = '150px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '5px';
        img.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        img.style.transition = 'transform 0.3s ease'; // إضافة انتقال سلس

        // تأثير التكبير عند التحويم
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transformOrigin = 'right';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });

        // إنشاء الرابط للصورة
        const imgLink = document.createElement('a');
        imgLink.href = "BooksDetails.html#${book.id}";
        imgLink.appendChild(img);

        // إنشاء عنوان الكتاب
        const label = document.createElement('label');
        label.className = 'book-label';
        label.textContent = book.name;
        label.style.display = 'block';
        label.style.marginTop = '8px';
        label.style.fontSize = '12px';
        label.style.color = '#ffffff';
        label.style.fontFamily = 'Arial, sans-serif';
        label.style.textAlign = 'center';
        label.style.fontWeight = 'bold';

        // إنشاء الرابط للعنوان
        const labelLink = document.createElement('a');
        labelLink.href = "BooksDetails.html#${book.id}";
        labelLink.appendChild(label);

        // إضافة العناصر إلى العنصر الرئيسي
        bookItem.appendChild(imgLink);
        bookItem.appendChild(labelLink);
        slider.appendChild(bookItem);
        [bookItem, labelLink].forEach(link => {
            link.addEventListener('click', function () {
                let VBook = {
                    id: book.id,
                    name: book.name,
                    image: book.image,
                    description: book.description,
                    available: book.Available,
                    author: book.author,
                    category: book.category // typo fixed here too
                };
                window.localStorage.setItem('viewedBook', JSON.stringify(VBook));
            });
        });
    });
}


// إعداد أحداث السلايدر
function setupSlider() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let scrollAmount = 0;
    const scrollStep = 180; // يتناسب مع عرض كل كتاب + الهامش

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

// عرض كل الكتب
function displayBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const allBooksContainer = document.querySelector('.main');

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('Books');

        // تطبيق أنماط CSS المحددة
        bookElement.style.display = 'flex';
        bookElement.style.flexDirection = 'column';
        bookElement.style.alignItems = 'center';
        bookElement.style.textAlign = 'center';
        bookElement.style.flexBasis = 'calc(100% / 7 - 20px)';
        bookElement.style.maxWidth = 'calc(100% / 7 - 20px)';
        bookElement.style.boxSizing = 'border-box';

        // إنشاء عنصر الصورة مع الأنماط المطلوبة
        const img = document.createElement('img');
        img.src = book.image;
        img.alt = book.name;

        // تطبيق أنماط الصورة من CSS
        img.style.width = '200px';
        img.style.height = '300px';
        img.style.borderRadius = '5px';
        img.style.margin = '50px';
        img.style.objectFit = 'cover';
        img.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        img.style.transition = 'transform 0.3s ease';

        // تأثير التكبير عند التحويم
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });

        const imgLink = document.createElement('a');
        imgLink.href = "BooksDetails.html#${book.id}";
        imgLink.appendChild(img);

        const label = document.createElement('label');
        label.className = 'Books-label';
        label.textContent = book.name;

        // تنسيق النص
        label.style.display = 'block';
        label.style.marginTop = '8px';
        label.style.fontSize = '14px';
        label.style.color = '#ffffff';
        label.style.fontFamily = 'Arial, sans-serif';
        label.style.textAlign = 'center';
        label.style.fontWeight = 'bold';

        const labelLink = document.createElement('a');
        labelLink.href = "BooksDetails.html#${book.id}";
        labelLink.appendChild(label);

        const authorSpan = document.createElement('span');
        authorSpan.className = 'author-name';
        authorSpan.style.display = 'none';
        authorSpan.textContent = book.author;

        bookElement.appendChild(imgLink);
        bookElement.appendChild(labelLink);
        bookElement.appendChild(authorSpan);
        allBooksContainer.appendChild(bookElement);
        [bookElement, labelLink].forEach(link => {
            link.addEventListener('click', function () {
                let VBook = {
                    id: book.id,
                    name: book.name,
                    image: book.image,
                    description: book.description,
                    available: book.Available,
                    author: book.author,
                    category: book.category // typo fixed here too
                };
                window.localStorage.setItem('viewedBook', JSON.stringify(VBook));
            });
        });
    });
}
// إعداد البحث مع الانتقال التلقائي
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

// تصفية الكتب
function filterBooks(searchTerm, searchType) {
    const allBooks = document.querySelectorAll('.main .Books');
    allBooks.forEach(book => {
        const title = book.querySelector('.Books-label').innerText.toLowerCase();
        const author = book.querySelector('.author-name').innerText.toLowerCase();

        if (
            (searchType === 'name' && title.includes(searchTerm)) ||
            (searchType === 'author' && author.includes(searchTerm)) ||
            searchType === 'All' && (title.includes(searchTerm) || author.includes(searchTerm))) {
            book.style.display = 'flex'; // Show the book
        } else {
            book.style.display = 'none'; // Hide the book
        }
    });
}
