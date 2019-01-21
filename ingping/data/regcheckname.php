<?php
  header('Content-type:text/html;charset=utf-8');
  $username = $_GET["username"];

  $con = mysql_connect("localhost","root","136600");
  mysql_select_db("ingping",$con);
  $str = "select * from userinfo where username='".$username."'";
  $result = mysql_query($str,$con);
  mysql_close($con);
  $rows = mysql_num_rows($result);
  if($rows==0){
	  echo -1;
  }else{
	  echo 2;
  }
  
?>