const cookieDelim = ','

// Update based off the server you are testing against.
BaseUrl = "http://localhost:3000"
//BaseUrl = "http://172.20.0.2:3000"
//BaseUrl = "https://ctf02042023.azurewebsites.net"

function setCookie(name, value, options = {}) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (const optionKey in options) {
        if (options.hasOwnProperty(optionKey)) {
            // The standardized delimiter is a semicolon (;), as per the HTTP state management mechanism (RFC 6265).
            // This doesn't work for Chrome or FireFox... ¯\_(ツ)_/¯
            cookieString += `${cookieDelim} ${optionKey}`;
            if (options[optionKey] !== true) {
                cookieString += `=${options[optionKey]}`;
            }
        }
    }

    document.cookie = cookieString;
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(cookieDelim);

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();

        // Check if the cookie starts with the specified name
        if (cookie.indexOf(name + '=') === 0) {
            // Return the value of the cookie
            return cookie.substring(name.length + 1);
        }
    }

    return '';
}

function validateUsername() {
    var username = document.getElementById('username').value;
    var restrictedUsernames = ['admin', 'root', 'superuser', 'your_mom'];
    return !restrictedUsernames.includes(username.toLowerCase());
}


async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        if (! validateUsername()) {
            alert('Invalid username. Please choose a different username.');
            return;
        }

        const response = await fetch(`${BaseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        });
        
        
        if (!response.ok) {
            if (response.status == 400) {
                const res = await response.json();
                alert(res.message)
            }
            throw new Error('Login failed');
        }

        const data = await response.json();
        const jwt = data.token;

        // Set the JWT as a cookie with an expiry time.
        //const expirationTime = 60 * 60; // in seconds
        //const expiryDate = new Date(Date.now() + expirationTime * 1000);
        //setCookie('jwt', jwt, { expires: expiryDate, path: '/' });

        setCookie('jwt', jwt)
        console.log('Login successful! JWT token has been stored as a cookie.');
        alert('Login successful!');
        updatePageContent();
    } catch (error) {
        console.error('Login failed:', error);
        console.log('Login failed. Please check your credentials and try again.');
    }
}


function isLoggedIn() {
    const jwt = getCookie('jwt');
    return jwt !== '';
}


function updatePageContent() {
    const loginStatusDiv = document.getElementById('login');

    if (isLoggedIn()) {
        // User is logged in
        loginStatusDiv.style.display = 'none';

    } else {
        // User is not logged in
        loginStatusDiv.style.display = 'block';
    }
}


function checkJwt() {
    updatePageContent();

    const jwt = getCookie('jwt');
    if (!jwt) {
        return;
    }
    
    fetch(`${BaseUrl}/api/auth/content`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwt,
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch content');
            }
            return response.text(); 
        })
        .then(htmlContent => {
            document.getElementById('content').innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
    
}

// Attach the login function to the button click event
document.getElementById('loginButton').addEventListener('click', login);

window.onload = function () { document.getElementById("username").focus(); };

document.addEventListener('DOMContentLoaded', checkJwt);

