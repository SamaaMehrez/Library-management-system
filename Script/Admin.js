window.addEventListener("DOMContentLoaded", function () {
    document.getElementById('search-bar').addEventListener('keyup', function () {
        const filterValue = this.value.toLowerCase();
        const filter = document.getElementById('filter').value;
        const rows = document.querySelectorAll('table tbody tr');
        let cellText;
        rows.forEach(row => {
            if (filter === 'id') cellText = row.cells[1].textContent.toLowerCase();
            else if (filter === 'name') cellText = row.cells[2].textContent.toLowerCase();
            else if (filter === 'author') cellText = row.cells[3].textContent.toLowerCase();
            else if (filter === 'category') cellText = row.cells[4].textContent.toLowerCase();
            row.style.display = cellText.includes(filterValue) ? '' : 'none';
        });
    });


    // Retrieve books from localStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];

    const tableBody = document.querySelector('table tbody');

    // Clear existing rows before adding the updated books
    tableBody.innerHTML = '';

    // Populate the table with the books data from localStorage
    books.forEach(book => {
        const row = document.createElement('tr');


        row.innerHTML = `
            <td><img src="${book.image}" alt="Cover" width="60" height="80"></td>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.description}</td>
            <td class = "Available"> ${book.Available}</td>
            <td></td> <!-- Empty cell for buttons -->
        `;
        const availabilityCell = row.querySelector('.Available');
        if (book.Available === "Available") {
            availabilityCell.style.color = 'green';
        } else if (book.Available === "Not Available") {
            availabilityCell.style.color = 'red';
        }

        // Add Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", function () {
            // Store the selected book data in localStorage for editing
            localStorage.setItem('editBookData', JSON.stringify(book));
            // Redirect to the EditBooks page
            window.location.href = 'EditBooks.html';
        });

        // Add Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function () {
            if (confirm('Are you sure you want to delete this book?')) {
                // Remove the selected book from the array
                const updatedBooks = books.filter(b => b.id !== book.id);
                // Update localStorage with the new books list
                localStorage.setItem('books', JSON.stringify(updatedBooks));
                // Remove the row from the table
                row.remove();
            }
        });

        // Append buttons to the last cell (actions cell)
        const actionCell = row.querySelector("td:last-child");
        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);

        // Add the row to the table body
        tableBody.appendChild(row);
    });
});
