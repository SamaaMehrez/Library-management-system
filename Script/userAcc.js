
document.addEventListener('DOMContentLoaded', function () {

    if(!localStorage.getItem("loggedInUser") ||! localStorage.getItem("password") || !localStorage.getItem("status") ){
        window.location.href = "Error404.html";
    }
    const username = localStorage.getItem("loggedInUser");
    const favBooks = JSON.parse(localStorage.getItem(`${username}_fav`)) || [];
    const borrowedBooks = JSON.parse(localStorage.getItem(`${username}_borrowed`)) || [];
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];

    displayBooks(favBooks, allBooks, 'shelfFav');
    displayBooks(borrowedBooks, allBooks, 'shelfBorrowed');
    const logout= document.getElementById('LogOut');
    logout.addEventListener('click', function() {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("password");
        localStorage.removeItem("status");
    });
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
                <a href="BooksDetails.html">
                    <img src="${book.image}" alt="${book.name}">
                </a>

            `;
    
            // Add event listener to the link to store book data
            const link = bookDiv.querySelector('a');
            link.addEventListener('click', () => {
                localStorage.setItem('viewedBook', JSON.stringify(book));
            });
    
            container.appendChild(bookDiv);
        }
    });
}
