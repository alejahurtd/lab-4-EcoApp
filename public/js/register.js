document.getElementById('registerForm').addEventListener('submit', async function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value;
	const name = document.getElementById('name').value;
	const password = document.getElementById('password').value;

	const user = {
		username,
		name,
		password,
	};

	try {
		const response = await fetch('/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const messageDiv = document.getElementById('message');
		messageDiv.innerHTML = ''; // Limpiar mensajes previos

		if (response.ok) {
			messageDiv.textContent = 'Registration successful!';
			messageDiv.style.color = 'green';
			document.getElementById('registerForm').reset(); // Limpiar el formulario
		} else {
			const errorData = await response.json();
			messageDiv.textContent = `Error: ${errorData.message}`;
			messageDiv.style.color = 'red';
		}
	} catch (error) {
		const messageDiv = document.getElementById('message');
		messageDiv.textContent = 'Error: Could not register user.';
		messageDiv.style.color = 'red';
		console.error('Error:', error);
	}
});

document.getElementById('goBackBtn').addEventListener('click', function () {
	window.location.href = 'index.html';
});
