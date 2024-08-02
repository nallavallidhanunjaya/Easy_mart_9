<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini Mart</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="auth-container">
        <button onclick="showSignUp()">Sign Up</button>
        <button onclick="showSignIn()">Sign In</button>

        <div id="sign-up-form" class="auth-form">
            <h2>Sign Up</h2>
            <input type="text" id="sign-up-username" placeholder="Username">
            <input type="password" id="sign-up-password" placeholder="Password">
            <button onclick="signUp()">Sign Up</button>
        </div>

        <div id="sign-in-form" class="auth-form">
            <h2>Sign In</h2>
            <input type="text" id="sign-in-username" placeholder="Username">
            <input type="password" id="sign-in-password" placeholder="Password">
            <button onclick="signIn()">Sign In</button>
        </div>
    </div>

    <div id="product-container" style="display:none;">
        <h2>Products</h2>
        <div class="product" id="product1">
            <p>Product 1</p>
            <button onclick="buyProduct('Product 1')">Buy</button>
        </div>
        <div class="product" id="product2">
            <p>Product 2</p>
            <button onclick="buyProduct('Product 2')">Buy</button>
        </div>
        <button onclick="showPurchasedItems()">Show Purchased Items</button>
        <div id="purchased-items"></div>
    </div>

    <script src="scripts.js"></script>
</body>
</html>
