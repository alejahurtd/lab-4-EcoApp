const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const postsFilePath = path.join(__dirname, 'data', 'posts.json');

// Helper functions
function saveData(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function loadData(filePath) {
	if (fs.existsSync(filePath)) {
		return JSON.parse(fs.readFileSync(filePath));
	} else {
		return [];
	}
}

// Register Endpoint
app.post('/register', (req, res) => {
	const { username, name, password } = req.body;
	const users = loadData(usersFilePath);

	const userExists = users.some((user) => user.username === username);

	if (userExists) {
		return res.status(400).json({ message: 'User already exists' });
	}

	const newUser = { username, name, password };
	users.push(newUser);
	saveData(usersFilePath, users);

	res.status(201).json({ message: 'User registered successfully' });
});

// Login Endpoint
app.post('/login', (req, res) => {
	const { username, password } = req.body;
	const users = loadData(usersFilePath);
	const user = users.find((user) => user.username === username && user.password === password);

	if (!user) {
		return res.status(400).json({ message: 'Invalid username or password' });
	}

	res.status(200).json({ message: 'Login successful' });
});

// Create Post Endpoint
app.post('/create-post', (req, res) => {
	const { title, description, imageUrl } = req.body;
	const posts = loadData(postsFilePath);

	const newPost = {
		title,
		description,
		imageUrl,
		date: new Date().toISOString(),
	};
	posts.push(newPost);
	saveData(postsFilePath, posts);

	res.status(201).json({ message: 'Post created successfully' });
});

// Get Posts Endpoint
app.get('/posts', (req, res) => {
	try {
		const posts = loadData(postsFilePath);
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: 'Failed to load posts' });
	}
});

// Servir la página del dashboard
app.get('/dashboard', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// Servir la página de creación de posts
app.get('/create-post', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/create-post.html'));
});

// Iniciar el servidor
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
