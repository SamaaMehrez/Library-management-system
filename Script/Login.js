document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let Status = "";
        if (document.getElementById('user').checked) {
            Status = "User";
        } else if (document.getElementById('admin').checked) {
            Status = "Admin";
        }

        // هنا بنجيب اليوزرز بعد ما المستخدم يدخل بياناته، عشان نضمن إنهم أحدث نسخة
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const matchedUser = users.find(user =>
            user.email === email &&
            user.password === password &&
            user.status === Status
        );

        if (matchedUser) {
            if (Status === 'User') {
                window.location.href = 'User.html';
            } else if (Status === 'Admin') {
                window.location.href = 'Admin.html';
            }
        } else {
            const errorBox = document.getElementById('errorMessage');
            if (errorBox) {
                errorBox.innerHTML = 'Wrong Email or Password';
                errorBox.style.color = 'red';
            }
        }
    });
});
