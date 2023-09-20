<?php //https://www.tutorialspoint.com/php/php_mysql_login.htm
   include("config.php");
   session_start();
   
	if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      
		$myusername = mysqli_real_escape_string($connect,$_POST['username']);
		$mypassword = mysqli_real_escape_string($connect,$_POST['password']); 
      
		$sql = "SELECT userID FROM ams539.users WHERE username = '$myusername' and password = '$mypassword'";
		$result = mysqli_query($connect,$sql);
		if (!$result) {
			die("Database query failed.");
		}
		$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
		$active = $row['active'];
		$count = mysqli_num_rows($result);
	  
      // If result matched $myusername and $mypassword, table row must be 1 row
		
        if($count == 1) {
         //session_register("myusername");
			$_SESSION['login_user'] = $myusername;
			$_SESSION['userID'] = $userID;
			header("location: main.php");
		}
		else {
			$error = "Your Login Name or Password is invalid";
		}
    }
?>
<html>
   
   <head>
      <title>Login Page</title>
      <title>Final Project Login</title>
	  <meta name="author" content="Addison Shroyer">
      <style type = "text/css">
         body {
            font-family:Arial, Helvetica, sans-serif;
            font-size:14px;
         }
         label {
            font-weight:bold;
            width:100px;
            font-size:14px;
         }
         .box {
            border:#666666 solid 1px;
         }
      </style>
      
   </head>
   
   <body bgcolor = "#FFFFFF">
	
      <div align = "center">
         <div style = "width:300px; border: solid 1px #333333; " align = "left">
            <div style = "background-color:#333333; color:#FFFFFF; padding:3px;"><b>Login</b></div>
				
            <div style = "margin:30px">
               
               <form action = "" method = "post">
                  <label>UserName  :</label><input type = "text" name = "username" class = "box"/><br /><br />
                  <label>Password  :</label><input type = "password" name = "password" class = "box" /><br/><br />
                  <input type = "submit" value = " Log in! "/><br /> <br>
				  <input type="button" name="guest" value="Or Visit as a Guest!" onClick="window.location.href='main.php'"><br>
               </form>
               
               <div style = "font-size:11px; color:#cc0000; margin-top:10px"><?php echo $error; ?></div>
					
            </div>
				
         </div>
			
      </div>
	  <!--<img src="final EER Diagram.jpg">-->

   </body>
</html>