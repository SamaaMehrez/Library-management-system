window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('search-bar').addEventListener('keyup', function () {
        let filter = this.value.toLowerCase();
        let rows = document.querySelectorAll('table tbody tr');

        rows.forEach(row => {
            let text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    });


    const books = JSON.parse(localStorage.getItem('books')) || [];


    const tableBody = document.querySelector('table tbody');


    books.forEach(book => {
        const row = document.createElement('tr');

        row.innerHTML = `
    <td><img src="${book.image}" alt="Cover" width="60" height="80"></td>
      <td>${book.id}</td>
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.description}</td>
      
      
      <td>
        <a href="Admin.html#Edit"><button class="edit-btn">Edit</button></a>
        <button class="delete-btn">Delete</button>
      </td>
    `;


        row.querySelector('.delete-btn').addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this book?')) {

                const updatedBooks = books.filter(b => b.id !== book.id);
                localStorage.setItem('books', JSON.stringify(updatedBooks));


                row.remove();
            }
        });


        tableBody.appendChild(row);
    });
});