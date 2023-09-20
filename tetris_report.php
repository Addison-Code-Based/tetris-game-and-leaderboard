<?php //remove user if not logged in
    include('session.php');
    if(!isset($_SESSION['login_user'])){
		header("location: login.php");
		die();
    }
   
    if($_POST) { //validate/sanitize data and insert into database
		date_default_timezone_set('US/Eastern');
		$date=date("h:i:sa m/d/Y");
		
		$score = $_POST['playerScore'];
		$time = $_POST['time'];
		
		$sql = "INSERT INTO ams539.scores (score, userID_fk, dateCreated, gameID_fk, seconds) VALUES ( '{$score}', '{$login_sessionID}', '{$date}', '1', '{$time}' )";
        $resultFromInsert = mysqli_query($connect, $sql);
        if($resultFromInsert){
            echo "<h1>Successfully added score!</h1>";
        }
        else {
            die("Database query failed" . $sql);
        }
    }
?>
<!doctype html>
<html lang ="en">
<head>
	<meta charset="utf-8">
	<title>Game Report</title>
	<meta name="author" content="Addison Shroyer">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
   <h1>Score Report for <?php echo $login_session; ?></h1>
   <h2><?php echo $score; ?> Points</h2>
   <h2><?php echo $time; ?> Seconds</h2><br>
   <h2><a href = "main.php">Return to Main Page</a></h2><br>
   <h2><a href = "logout.php">Log Out</a></h2><br>   
</body>
</html>
	