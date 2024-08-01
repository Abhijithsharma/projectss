document.querySelector('#login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from input fields
    var prevpass = document.getElementById('prepassword').value; // Get the previous password from input field
    var passwordnew = document.getElementById('newpassword').value; // Get the new password from input field
    var email = document.getElementById('Email').value; // Get the email from input field

    // Check if all required fields are filled
    if (prevpass && passwordnew && email) {
        // Fetch user data from Firebase Realtime Database
        fetch('https://api-cd-7913f-default-rtdb.asia-southeast1.firebasedatabase.app/students.json')
            .then(response => response.json()) // Parse response as JSON
            .then(data => {
                // Check if user exists and password matches
                const userKey = Object.keys(data).find(key => data[key].email === email && data[key].password === prevpass);
                // Find the key (identifier) of the user whose email and previous password match the entered values

                if (userKey) {
                    // If user exists and password matches, update the password
                    const updatedUserData = {
                        ...data[userKey], // Copy existing user data
                        password: passwordnew // Update the password with the new value
                    };

                    // Send updated user data to Firebase to update the password
                    fetch(`https://api-cd-7913f-default-rtdb.asia-southeast1.firebasedatabase.app/students/${userKey}.json`, {
                        method: 'PUT', // Use PUT method to update data
                        body: JSON.stringify(updatedUserData), // Convert updated user data to JSON string
                        headers: {
                            'Content-Type': 'application/json' // Set Content-Type header to specify JSON data
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            // If password update is successful, show success message
                            alert('Password updated successfully!');
                        } else {
                            // If password update fails, throw an error
                            throw new Error('Failed to update password.');
                        }
                    })
                    .catch(error => {
                        // Handle errors while updating password
                        console.error('Error:', error);
                        alert('An error occurred while updating the password. Please try again later.');
                    });
                } else {
                    // If user does not exist or password does not match, show error message
                    alert('Incorrect email or password.');
                }
            })
            .catch(error => {
                // Handle errors while fetching user data
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    } else {
        // If any required field is empty, show error message
        alert("Please enter all required fields.");
    }
});
