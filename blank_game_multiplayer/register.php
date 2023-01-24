<?php
  session_start();
  
  // Check if user is already authenticated
  if (isset($_SESSION['username'])) {
    header("Location: index.html");
    exit;
  }
  
  // Connect to MySQL database
  $servername = "localhost";
  $username = "game";
  $password = "gamepassword";
  $dbname = "game";
  
  $conn = new mysqli($servername, $username, $password, $dbname);
  
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  // Get form data
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  
  // Hash password
  $password = password_hash($password, PASSWORD_DEFAULT);
  
  // Get current date and time
  $date = date('Y-m-d H:i:s');
  
  // Insert data into MySQL database
  $sql = "INSERT INTO users (username, email, password, created_at) VALUES ('$username', '$email', '$password', '$date')";
  
  if ($conn->query($sql) === TRUE) {
    header("Location: index.html");
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
  $conn->close();
?>
