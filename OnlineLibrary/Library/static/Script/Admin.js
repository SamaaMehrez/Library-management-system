window.addEventListener("DOMContentLoaded", function () {
    // شيلنا التحقق من localStorage هنا لأنه غير مستخدم في Django

    // فلترة الكتب في الجدول عند الكتابة في شريط البحث
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

    // حذف زر الـ LogOut لأنه كان بيعتمد على localStorage
});
