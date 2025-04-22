document.addEventListener('DOMContentLoaded', function () {
    // we want to refresh the page

    if(!localStorage.getItem("loggedInUser") ||! localStorage.getItem("password") || !localStorage.getItem("status") ){
        window.location.href = "Error404.html";
    }
    else if (localStorage.getItem("status") !== "Admin") {
        window.location.href = "Error404NotAdmin.html";
    }
    document.getElementById('add-book-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const bookId = document.getElementById('book-id').value.trim();
        const bookName = document.getElementById('book-name').value.trim();
        const author = document.getElementById('author').value.trim();
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value.trim();
        const Available = document.getElementById('Available').value;
        const trending = document.getElementById('trending').value;
        const imageInput = document.getElementById('book-cover');

        if (!bookId || !bookName || !author || !category || !description || !Available || !trending) {
            alert('Please fill all fields');
            return;
        }

        if (!imageInput.files[0]) {
            alert('Please choose image for the book');
            return;
        }
        let bookss= JSON.parse(localStorage.getItem('books')) || [];
        if(bookss.some(book => book.id === bookId)){
            alert('Book ID already exists! Please choose a different ID.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const image = reader.result;

            const newBook = {
                id: bookId,
                name: bookName,
                author: author,
                category: category,
                description: description,
                Available: Available,
                trending: trending,
                image: image
            };

            let books = JSON.parse(localStorage.getItem('books')) || [];
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));

            document.getElementById('add-book-form').reset();
            alert("The book has been added successfully");
            window.location.href = "Admin.html";
        };

        reader.readAsDataURL(imageInput.files[0]);
    });
});
