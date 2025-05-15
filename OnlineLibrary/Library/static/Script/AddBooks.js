document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-book-form');

    form.addEventListener('submit', function (event) {
        const bookId = document.getElementById('book-id').value.trim();
        const bookName = document.getElementById('book-name').value.trim();
        const author = document.getElementById('author').value.trim();
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value.trim();
        const available = document.getElementById('Available').value;
        const trending = document.getElementById('trending').value;
        const imageInput = document.getElementById('book-cover');

        // Basic form validation
        if (!bookId || !bookName || !author || !category || !description || !available || !trending) {
            event.preventDefault();
            alert('Please fill all fields');
            return;
        }

        if (!imageInput.files.length) {
            event.preventDefault();
            alert('Please choose an image for the book');
            return;
        }
    });
});
