document.addEventListener('DOMContentLoaded', function () {

    if(!localStorage.getItem("loggedInUser") ||! localStorage.getItem("password") || !localStorage.getItem("status") ){
        window.location.href = "Error404.html";
    }
    else if (localStorage.getItem("status") !== "Admin") {
        window.location.href = "Error404NotAdmin.html";
    }
    const bookData = JSON.parse(localStorage.getItem("editBookData"));
    document.getElementById('edit-book-id').value = bookData.id;
    document.getElementById('edit-book-name').value = bookData.name;
    document.getElementById('edit-author').value = bookData.author;
    document.getElementById('edit-book-id').disabled = true;
    document.getElementById('edit-description').value = bookData.description;
    document.getElementById('edit-Available').value = bookData.Available;
    document.getElementById('edit-category').value = bookData.category;
    document.getElementById('edit-trending').value=bookData.trending ;


    if (bookData.trending !== undefined) {
        document.getElementById('edit-trending').value = bookData.trending ? 'Yes' : 'No';
    }


    if (bookData.image) {
        const previewDiv = document.createElement('div');
            document.getElementById('edit-book-cover').parentNode.appendChild(previewDiv);
            }

            document.getElementById("edit-book-form").addEventListener("submit", function (event) {
                event.preventDefault();

                const bookId = document.getElementById("edit-book-id").value;
                const bookName = document.getElementById("edit-book-name").value.trim();
                const author = document.getElementById("edit-author").value.trim();
                const category = document.getElementById("edit-category").value;
                const description = document.getElementById("edit-description").value.trim();
                const Availability = document.getElementById('edit-Available').value;
                const trending = document.getElementById('edit-trending').value;
                const imageInput = document.getElementById("edit-book-cover");


                if (!bookName || !author || !category || !description || !trending) {
                alert('Please fill all required fields');
                return;
            }

                const updateBookData = () => {
                const updatedBook = {
                id: bookId,
                name: bookName,
                author: author,
                category: category,
                description: description,
                Available: Availability,
                trending: trending,
                image: bookData.image
            };

                let books = JSON.parse(localStorage.getItem('books')) || [];
                books = books.map(book => book.id === updatedBook.id ? updatedBook : book);
                localStorage.setItem('books', JSON.stringify(books));

                alert("Book updated successfully.");
                window.location.href = "Admin.html";
            };

                if (imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function () {
                bookData.image = reader.result;
                updateBookData();
            };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                updateBookData();
            }
            });
            });
