document.addEventListener('DOMContentLoaded', function () {
    const bookData = JSON.parse(localStorage.getItem("editBookData"));

    document.getElementById('edit-book-id').value=bookData.id;
    document.getElementById('edit-book-name').value=bookData.name;
    document.getElementById('edit-author').value=bookData.author;
    document.getElementById('edit-book-id').disabled=true;
    document.getElementById('edit-description').value=bookData.description;
    const fileInput = document.getElementById('book-cover');



        document.getElementById("edit-book-form").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission behavior

            const bookId = document.getElementById("edit-book-id").value;
            const bookName = document.getElementById("edit-book-name").value.trim();
            const author = document.getElementById("edit-author").value.trim();
            const category = document.getElementById("edit-category").value;
            const description = document.getElementById("edit-description").value.trim();
            const imageInput = document.getElementById("book-cover");
            const AvailableBooks = document.getElementById('edit-Available').value;
            // Check if all required fields are filled
            if (!bookName || !author || !category || !description) {
                alert('Please fill all fields');
                return;
            }

            if (imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function () {
                    updatedImage = reader.result; // Set the new image if it's selected

                    const updatedBook = {
                        id: bookId,
                        name: bookName,
                        author: author,
                        category: category,
                        description: description,
                        image: updatedImage,
                        Available: AvailableBooks
                    };

                    // Get the list of books from localStorage
                    let books = JSON.parse(localStorage.getItem('books')) || [];

                    // Update the book in the list
                    books = books.map(book => book.id === updatedBook.id ? updatedBook : book);

                    // Save the updated list back to localStorage
                    localStorage.setItem('books', JSON.stringify(books));

                    // Show success alert and redirect
                    alert("Book updated successfully.");
                    window.location.href = "Admin.html"; // Redirect to the admin page
                };

                reader.readAsDataURL(imageInput.files[0]); // Read the new image file
            }
            else{
                console.log(1);
                const Oimage = bookData.image;
                const updatedBook = {
                    id: bookId,
                    name: bookName,
                    author: author,
                    category: category,
                    description: description,
                    image: Oimage,
                    Available: AvailableBooks
                }
                let books = JSON.parse(localStorage.getItem('books')) || [];

                // Update the book in the list
                books = books.map(book => book.id === updatedBook.id ? updatedBook : book);

                // Save the updated list back to localStorage
                localStorage.setItem('books', JSON.stringify(books));

                // Show success alert and redirect
                alert("Book updated successfully.");
                window.location.href = "Admin.html"; 

            }
        

        });

});
