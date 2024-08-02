require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');

const app = express();
const port = 80;

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const purchaseSchema = new mongoose.Schema({
    username: String,
    productName: String
});

const User = mongoose.model('User', userSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

AWS.config.update({ region: 'us-east-1' });
const sns = new AWS.SNS();

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ success: true });
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({ success: false, message: 'Credentials do not match. Please sign up.' });
    }

    res.json({ success: true });
});

app.post('/buy', async (req, res) => {
    const { productName } = req.body;
    const username = 'testUser'; // Assume a logged-in user for simplicity

    const purchase = new Purchase({ username, productName });
    await purchase.save();

    const params = {
        Message: `You have purchased ${productName}`,
        TopicArn: process.env.AWS_TOPIC_ARN
    };

    sns.publish(params, (err, data) => {
        if (err) console.error(err);
        else console.log('SNS publish success:', data);
    });

    res.json({ success: true });
});

app.get('/purchased-items', async (req, res) => {
    const username = 'testUser'; // Assume a logged-in user for simplicity
    const purchases = await Purchase.find({ username });
    const items = purchases.map(purchase => purchase.productName);

    res.json({ items });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
