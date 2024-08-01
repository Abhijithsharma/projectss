document.querySelector('#login-form').addEventListener('submit', function(event) {
  event.preventDefault();
   
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username && password) {
      // Fetch user data from Firebase
        fetch('https://e-com-10d11-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
          .then(response => response.json())
          .then(data => {
            console.log(data)
              // Check if user exists and password matches
              const user = Object.values(data).find(user => user.username === username && user.password === password);
              if (user) {
                  alert('Login successful!');
                  window.open('s.html','_blank');
              } else {
                  alert('Incorrect username or password.');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('An error occurred. Please try again later.');
          });
  } else {
      alert("Please enter both username and password.");
  }
});