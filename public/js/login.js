document.getElementById('loginForm').addEventListener('submit', async function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	const user = {
		username,
		password,
	};

	try {
		const response = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const messageDiv = document.getElementById('message');
		messageDiv.innerHTML = ''; // Limpiar mensajes previos

		if (response.ok) {
			messageDiv.textContent = 'Login successful!';
			messageDiv.style.color = 'green';
			window.location.href = 'dashboard.html'; // Redirige
		} else {
			const errorData = await response.json();
			messageDiv.textContent = `Error: ${errorData.message}`;
			messageDiv.style.color = 'red';
		}
	} catch (error) {
		const messageDiv = document.getElementById('message');
		messageDiv.textContent = 'Error: Could not login.';
		messageDiv.style.color = 'red';
		console.error('Error:', error);
	}
});

document.getElementById('goBackBtn').addEventListener('click', function () {
	window.location.href = 'index.html';
});
