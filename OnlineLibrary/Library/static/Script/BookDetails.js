document.addEventListener("DOMContentLoaded", async function() {
    // Wait for authentication check
    await updateUI();
    
    
});


async function isUserAuthenticated() {
    try {
        const response = await fetch('/userAuthnticated/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Important!
        });

        const data = await response.json();
        return data.authenticated === true;

    } catch (error) {
        console.error('Error during authentication check:', error);
        return false;
    }
};
async function checker() {
    const isAuth = await isUserAuthenticated();
    return isAuth;
}

async function updateUI(){
    const isAuth = await isUserAuthenticated();
    const sign=document.getElementById("Acs");
    const loginUrl = sign.dataset.loginUrl;
    const dashboardUrl = sign.dataset.dashboardUrl;
    if (!isAuth) {
        const sign=document.getElementById('Acs');
        sign.innerHTML = 'Sign In';
        sign.href = loginUrl;
        console.log('User is not authenticated');
    }
    else{
        const sign=document.getElementById('Acs');
        sign.href = dashboardUrl;
        console.log('User is authenticated');
    }
};