function showSignUp() {
    document.getElementById('sign-up-form').style.display = 'block';
    document.getElementById('sign-in-form').style.display = 'none';
}

function showSignIn() {
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('sign-in-form').style.display = 'block';
}

function signUp() {
    const username = document.getElementById('sign-up-username').value;
    const password = document.getElementById('sign-up-password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign-up successful! Please sign in.');
            showSignIn();
        } else {
            alert(data.message);
        }
    });
}

function signIn() {
    const username = document.getElementById('sign-in-username').value;
    const password = document.getElementById('sign-in-password').value;

    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('product-container').style.display = 'block';
        } else {
            alert(data.message);
        }
    });
}

function buyProduct(productName) {
    fetch('/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product purchased successfully!');
        } else {
            alert(data.message);
        }
    });
}

function showPurchasedItems() {
    fetch('/purchased-items', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const purchasedItemsDiv = document.getElementById('purchased-items');
        purchasedItemsDiv.innerHTML = '<h3>Purchased Items</h3>';
        data.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = item;
            purchasedItemsDiv.appendChild(itemDiv);
        });
    });
}
