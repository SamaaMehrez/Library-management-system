document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let status = "";
        if (document.getElementById('user').checked) {
            status = "User";
        } else if (document.getElementById('admin').checked) {
            status = "Admin";
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const matchedUser = users.find(user =>
            user.email === email &&
            user.password === password &&
            user.status === status
        );

        if (matchedUser) {
            window.localStorage.setItem('loggedInUser', matchedUser.username);
            window.localStorage.setItem('status', matchedUser.status);
            window.localStorage.setItem('password', matchedUser.password);

            if (status === 'User') {
                window.location.href = 'User.html';
            } else if (status === 'Admin') {
                window.location.href = 'Admin.html';
            }
        }
        else {
            const errorBox = document.getElementById('errorMessage');
            if (errorBox) {
                errorBox.innerHTML = 'Wrong Email or Password';
                errorBox.style.color = 'red';
            }
        }
    });
});
