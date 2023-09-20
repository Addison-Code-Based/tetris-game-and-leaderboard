<?php //https://www.tutorialspoint.com/php/php_mysql_login.htm
   include('config.php');
   session_start();
   
   $user_check = $_SESSION['login_user'];
   
   $ses_sql = mysqli_query($connect,"SELECT username, userID FROM ams539.users WHERE username = '$user_check' ");
   
   $row = mysqli_fetch_array($ses_sql,MYSQLI_ASSOC);
   
   $login_session = $row['username'];
   $login_sessionID = $row['userID'];
?>