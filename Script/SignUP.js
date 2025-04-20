document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    let status = "";
    if (document.getElementById('user').checked) {
        status = "User";
    } else if (document.getElementById('admin').checked) {
        status = "Admin";
    }
    const confirmPassword = document.getElementById('confirmPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.some(user => user.email === email);
    const exists1 = users.some(user => user.status === status);
    if (exists && exists1) {
        document.getElementById('errorMessage').innerHTML = 'User already exists!';
        return;
    }
    if( password !== confirmPassword) {
        document.getElementById('errorMessage').innerHTML = 'Passwords do not match!';
        return;
    }
    console.log(users);
    console.log(email);
    console.log(password);
    console.log(username);
    users.push({ username: username , email: email, password: password, status: status });
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('errorMessage').innerText = 'Account created successfully!';



});
