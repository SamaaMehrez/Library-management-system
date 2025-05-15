document.getElementById('signupForm').addEventListener('submit', function (event) {

    const password = document.getElementById('password').value;

    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        event.preventDefault(); 
        document.getElementById('errorMessage').innerText = 'Passwords do not match!';
        return;
    }})

