<?php
   include('session.php');
?>
<!doctype html>
<html lang ="en">
<head>
	<meta charset="utf-8">
	<title>Final Project Main Page</title>
	<meta name="author" content="Addison Shroyer">
	<link rel="stylesheet" type="text/css" href="style.css">
	<style>
		table, th, td {
		border: 1px solid black;
		}
	</style>
	<!--Made with much help from Jacky Joice-->
</head>
<body>
   <?php //top of page changes based on if a user is logged in
		if(isset($_SESSION['login_user'])){
		echo "<h1>Welcome " . $login_session . "<br><br>";
		}
   ?> 
   <h2><a href = "tetris.php">Play Tetris!</a></h2>
   <h2><a href = "leaderboard.php">See the Global Leaderboard!</a></h2>
   <?php
		if(!isset($_SESSION['login_user'])){
			echo "<h2><a href = 'logout.php'>Log In</a></h2>"; 
		}
		else {
			echo "<h2><a href = 'leaderboard_personal.php'>See your Personal Leaderboard!</a></h2><br>" . "</h1><br><h2><a href = 'logout.php'>Log Out</a></h2>";
		}
	?>
</body>
</html>