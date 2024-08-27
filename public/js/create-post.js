document.getElementById('createPostForm').addEventListener('submit', async (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());

	try {
		const response = await fetch('/create-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const messageDiv = document.getElementById('message');
		messageDiv.innerHTML = ''; // Limpiar mensajes previos

		if (response.ok) {
			messageDiv.textContent = 'Post created successfully!';
			messageDiv.style.color = 'green';
			e.target.reset(); // Limpiar los campos del formulario

			// Redirigir al dashboard
			setTimeout(() => {
				window.location.href = 'dashboard.html';
			}, 1000); // mensajitoooo
		} else {
			messageDiv.textContent = 'Failed to create post.';
			messageDiv.style.color = 'red';
		}
	} catch (error) {
		const messageDiv = document.getElementById('message');
		messageDiv.textContent = 'Error: Could not create post.';
		messageDiv.style.color = 'red';
		console.error('Error:', error);
	}
});

// Manejar el evento del botón "Go Back"
document.getElementById('goBackBtn').addEventListener('click', function () {
	window.location.href = 'index.html';
});
