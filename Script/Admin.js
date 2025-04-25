window.addEventListener("DOMContentLoaded", function () {
    if(!localStorage.getItem("loggedInUser") ||! localStorage.getItem("password") || !localStorage.getItem("status") ){
        window.location.href = "Error404.html";
    }
    else if (localStorage.getItem("status") !== "Admin") {
        window.location.href = "Error404NotAdmin.html";
    }
    document.getElementById('search-bar').addEventListener('keyup', function () {
        const filterValue = this.value.toLowerCase();
        const filter = document.getElementById('filter').value;
        const rows = document.querySelectorAll('table tbody tr');

        rows.forEach(row => {
            let cellText = row.textContent.toLowerCase();
            if (filter === 'id') cellText = row.cells[1].textContent.toLowerCase();
            else if (filter === 'name') cellText = row.cells[2].textContent.toLowerCase();
            else if (filter === 'author') cellText = row.cells[3].textContent.toLowerCase();
            else if (filter === 'category') cellText = row.cells[4].textContent.toLowerCase();
            else if (filter === 'trending') cellText = row.cells[7].textContent.toLowerCase();
            row.style.display = cellText.includes(filterValue) ? '' : 'none';
        });
        
        
    });

    const logout= document.getElementById('LogOut');
        logout.addEventListener('click', function() {
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("password");
            localStorage.removeItem("status");
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
            <td class = "Available"> ${book.Available}</td>
            <td class = "Trending">${book.trending}</td>
            <td></td>
        `;
        const availabilityCell = row.querySelector('.Available');
        if (book.Available === "Available") {
            availabilityCell.style.color = 'green';
        } else if (book.Available === "Not Available") {
            availabilityCell.style.color = 'red';
        }
        const trendingCell = row.querySelector('.Trending');
        if (book.trending === "Yes") {
            trendingCell.style.color = 'green';
        } else if (book.trending === "No") {
            trendingCell.style.color = 'red';
        }
        // Add Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", function () {
            localStorage.setItem('editBookData', JSON.stringify(book));
            window.location.href = 'EditBooks.html';
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function () {
            if (confirm('Are you sure you want to delete this book?')) {
                const updatedBooks = books.filter(b => b.id !== book.id);
                localStorage.setItem('books', JSON.stringify(updatedBooks));
                row.remove();
            }
        });

        const actionCell = row.querySelector("td:last-child");
        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
        tableBody.appendChild(row);
    });
});
