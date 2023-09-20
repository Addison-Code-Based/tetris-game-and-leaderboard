<?php
//Create the connection
		$host = "localhost"; 
		//Your Pitt username for the Pitt server and "root" for localhost
		$user = "ams539";
		//Your password for the Pitt server or your password, if any, for localhost
		$password = "Student_4034619";
		//Name of your db - Pitt username for Pitt, and whatever you named it for local
		$dbname = "ams539";
	
		$connect = mysqli_connect($host, $user, $password, $dbname);
		if(mysqli_connect_errno()){
			die("Database connection failed: ". mysqli_connect_error() . " (" . mysqli_connect_errno(). ")");
		}
?>