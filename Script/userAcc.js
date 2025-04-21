
document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem("loggedInUser");
    const favBooks = JSON.parse(localStorage.getItem(`${username}_fav`)) || [];
    const borrowedBooks = JSON.parse(localStorage.getItem(`${username}_borrowed`)) || [];
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];

    displayBooks(favBooks, allBooks, 'shelfFav');
    displayBooks(borrowedBooks, allBooks, 'shelfBorrowed');
});

function displayBooks(bookIds, allBooks, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    bookIds.forEach(id => {
        const book = allBooks.find(b => b.id === id);
        if (book) {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
                <a href="BooksDetails.html#${book.id}">
                    <img src="${book.image}" alt="${book.name}">
                </a>
            `;
            container.appendChild(bookDiv);
        }
    });
}
