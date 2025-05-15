function borrowed(button, bookId) {
    if(!localStorage.getItem("loggedInUser") ||! localStorage.getItem("password") || !localStorage.getItem("status") ){
        const msg = document.createElement('p');
        msg.classList.add('borrow-message');
        msg.textContent = "⛔ You are not a user.";
        button.parentElement.appendChild(msg);
        return;
    }
    
    const username = localStorage.getItem("loggedInUser");
    const key = username + "_borrowed";
    let borrowedBooks = JSON.parse(localStorage.getItem(key)) || [];
    let books = JSON.parse(localStorage.getItem('books')) || [];

    const book = books.find(b => b.id === bookId);

    const existingMessage = button.parentElement.querySelector('.borrow-message');
    if (existingMessage) existingMessage.remove();
    if(borrowedBooks.includes(bookId)){
        const msg = document.createElement('p');
        msg.classList.add('borrow-message');
        msg.textContent = " You've already borrowed this book.";
        button.parentElement.appendChild(msg);
        return;
    }
    if (book.Available !== "Available") {
        const msg = document.createElement('p');
        msg.classList.add('borrow-message');
        msg.textContent = "⛔ This book is not available.";
        button.parentElement.appendChild(msg);
        return;
    }
    if (!borrowedBooks.includes(bookId)) {
        borrowedBooks.push(bookId);
        localStorage.setItem(key, JSON.stringify(borrowedBooks));
        book.Available = "Not Available";
        localStorage.setItem('books', JSON.stringify(books));
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const msg = document.createElement('p');
        msg.classList.add('borrow-message');
        msg.textContent = `✔️ Book borrowed for one week (until ${nextWeek.toLocaleDateString(undefined, options)}).`;
        button.parentElement.appendChild(msg);
        button.style.backgroundColor = '#ccc';
        button.style.color = '#333';
        button.disabled = true;
    }
    // else {
    //
    // }
}


function ChangeImage(button, bookId) {
    if(!localStorage.getItem("loggedInUser") ||! localStorage.getItem("password") || !localStorage.getItem("status") ){
        const msg = document.createElement('p');
        msg.classList.add('borrow-message');
        msg.textContent = "⛔ You are not a user.";
        button.parentElement.appendChild(msg);
        return;
    }
    let img = button.querySelector('img');
    const username = localStorage.getItem("loggedInUser");
    const key = username + "_fav";

    let favBooks = JSON.parse(localStorage.getItem(key)) || [];

    if (favBooks.includes(bookId)) {
        favBooks = favBooks.filter(id => id !== bookId);
        img.src = 'Images/like.png';
    }
    else {
        favBooks.push(bookId);
        img.src = 'Images/heart.png';
    }

    localStorage.setItem(key, JSON.stringify(favBooks));
}

document.addEventListener('DOMContentLoaded', function () {

    if(!localStorage.getItem("loggedInUser") ||! localStorage.getItem("status") || !localStorage.getItem("status") ){
        const sign=document.getElementById('Acs');
        sign.innerHTML = 'Sign In';
        sign.href = 'Login.html';
     }
    const booksContainer = document.getElementById('books-container');
    const books = localStorage.getItem('viewedBook') || [];

    if (books.length === 0) {
        booksContainer.innerHTML = "<p>No books available.</p>";
        return;
    }

        const book = JSON.parse(books);
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const image = document.createElement('img');
        image.src = book.image;
        image.alt = book.name;
        image.classList.add('book-image');

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-details');
        bookInfo.innerHTML = `
            <h3>${book.name}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <p class="Available"><strong>Availability:</strong> ${book.Available}</p>
        `;

        const borrowBtn = document.createElement('button');
        borrowBtn.textContent = "Borrow";
        borrowBtn.classList.add('borrow-btn');
        borrowBtn.onclick = function () {
            borrowed(this, book.id);
        };

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        const username = localStorage.getItem("loggedInUser");
        const favKey = username + "_fav";
        const favBooks = JSON.parse(localStorage.getItem(favKey)) || [];
        const isFav = favBooks.includes(book.id);

        likeBtn.innerHTML = `<img src="${isFav ? 'Images/heart.png' : 'Images/like.png'}" alt="Like" style="width:20px;">`;
        likeBtn.onclick = function () {
            ChangeImage(this, book.id);
        };

        bookInfo.appendChild(borrowBtn);
        bookInfo.appendChild(likeBtn);
        bookCard.appendChild(image);
        bookCard.appendChild(bookInfo);
        booksContainer.appendChild(bookCard);
;
});
