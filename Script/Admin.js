document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('add-book-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const bookId = document.getElementById('book-id').value.trim();
        const bookName = document.getElementById('book-name').value.trim();
        const author = document.getElementById('author').value.trim();
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value.trim();
        const imageInput = document.getElementById('book-cover');

        if (!bookId || !bookName || !author || !category || !description) {
            alert('Please fill all fields');
            return;
        }


        if (!imageInput.files[0]) {
            alert('Please choose image for the book');
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
                image: image
            };

            let books = JSON.parse(localStorage.getItem('books')) || [];
            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));

            document.getElementById('add-book-form').reset();
            alert("The book has been added successfully");
        };

        reader.readAsDataURL(imageInput.files[0]);
    });
});