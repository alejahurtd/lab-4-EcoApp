async function loadPosts() {
	try {
		const response = await fetch('/posts');
		if (response.ok) {
			const posts = await response.json();
			displayPosts(posts);
		} else {
			console.error('Failed to fetch posts');
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

// posts en el DOM
function displayPosts(posts) {
	const postsContainer = document.getElementById('postsContainer');
	postsContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar nuevos posts

	if (posts.length === 0) {
		postsContainer.innerHTML = '<p>No posts available.</p>';
		return;
	}

	posts.forEach((post) => {
		const postElement = document.createElement('div');
		postElement.classList.add('post');

		postElement.innerHTML = `
			<h2>${post.title}</h2>
			<p>${post.description}</p>
			${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" />` : ''}
			<small>Posted on: ${new Date(post.date).toLocaleString()}</small>
		`;

		postsContainer.appendChild(postElement);
	});
}

// "Create New Post
document.getElementById('createPostBtn').addEventListener('click', function () {
	window.location.href = 'create-post.html';
});

document.getElementById('logoutBtn').addEventListener('click', function () {
	window.location.href = 'index.html';
});

// Cargar los posts
window.addEventListener('DOMContentLoaded', loadPosts);
