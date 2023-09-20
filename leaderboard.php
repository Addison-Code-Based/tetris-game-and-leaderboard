<?php
   include('session.php');
?>
<!doctype html>
<html lang ="en">
<head>
	<meta charset="utf-8">
	<title>Final Leaderboard</title>
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
			echo "<h1>Logged in as " . $login_session . "<br><br>";
		}
    ?> 
    <h2><a href = "main.php">Return to the Main Page</a></h2><br>
	<?php //top of page changes based on if a user is logged in
		if(isset($_SESSION['login_user'])){
			echo "<h2><a href = 'leaderboard_personal.php'>Go to Personal Leaderboard</a></h2><br>";
		}
    ?> 
	
	<h1>Global Leaderboard</h1>
	
	<table style="width:100%">
		<tr>
		<th>Game</th>
		<th>Rank</th>
		<th>Score</th>
		<th>Time in Seconds</th>
		<th>Player</th>
		<th>Date</th>
		</tr>
		<?php //https://www.codeandcourse.com/how-to-display-database-data-in-html-table/
			//populate global leaderboard
			$sql ="SELECT userID, username, gameID, gameName, dateCreated, scoreID, score, seconds  FROM ams539.scores INNER JOIN ams539.users ON userID_fk=userID INNER JOIN ams539.games ON gameID_fk=gameID ORDER BY score DESC";
			$result = mysqli_query($connect,$sql);
			
			if (mysqli_num_rows($result) > 0) {
			// output data of each row
				$i = 0;
				while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
					$userName = $row['username'];
					$gameName = $row['gameName'];
					$date = $row['dateCreated'];
					$score = $row['score'];
					$seconds = $row['seconds'];
					$i++;
					// get count of topics
					
					echo "<tr><td>" . $gameName . "</td><td>" . $i . "</td><td>" . $score . "</td><td>" . $seconds . " Seconds" . "</td><td>" . $userName . "</td><td>" . $date . "</td></tr>";
					
				}
	echo "</table>";
			} 
			else { 
				echo "No Scores? Uh oh, that's not good!"; 
				echo $sql;
			}
			
		if(isset($_SESSION['login_user'])){
			echo "</h1><br><h2><a href = 'logout.php'>Log Out</a></h2>";
		}
		?> 
</body>
</html>