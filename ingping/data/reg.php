<?php
  header('Content-type:text/html;charset=utf-8');
  $username = $_POST['username'];
  $userpass = $_POST['userpass'];
  
  $con = mysql_connect('localhost','root','136600');

  mysql_select_db("ingping", $con);
    
  
  $checkstr ="insert into userinfo(username,userpass) values('".$username."','".$userpass."');";
  $result = mysql_query($checkstr,$con);
  mysql_close($con);
	if($result){
		echo 1;
	}
// 	create database ingping;
// create table userinfo(
//        id int auto_increment primary key,
//        username char(40),
//        userpass char(20)
// )
// select * from userinfo;
// insert into userinfo(username,userpass) values('666666','666666');
// insert into userinfo(username,userpass) values('7777777','7777777');
?>