// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.querySelector('form');
//     form.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         let status = "";

//         if (document.getElementById('user').checked) {
//             status = "User";
//         } else if (document.getElementById('admin').checked) {
//             status = "Admin";
//         }

//         if (!status) {
//             document.getElementById('errorMessage').innerText = 'Please select a user type!';
//             return;
//         }

//         fetch('/login/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': getCookie('csrftoken')
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password,
//                 user_type: status
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === 'ok') {
//                 if (status === 'User') {
//                     window.location.href = '/user_dashboard/';
//                 } else if (status === 'Admin') {
//                     window.location.href = '/admin_dashboard/';
//                 }
//             } else {
//                 const errorBox = document.getElementById('errorMessage');
//                 errorBox.innerHTML = data.error;
//                 errorBox.style.color = 'red';
//             }
//         });
//     });

//     function getCookie(name) {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//             const cookies = document.cookie.split(';');
//             for (let cookie of cookies) {
//                 cookie = cookie.trim();
//                 if (cookie.startsWith(name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
// });

