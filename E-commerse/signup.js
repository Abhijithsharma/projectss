document.querySelector('.signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (username && email && password) {
        const userData = {
            username: username,
            email: email,
            password: password
        };

        fetch('https://e-com-10d11-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Successfully updated!');
            } else {
                throw new Error('Failed to store data.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    } else {
        alert("Please enter valid information.");
    }
});
