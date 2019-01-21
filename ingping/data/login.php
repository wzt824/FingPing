<?php
header("Content-type:text/html;charset=utf-8");
$username = $_POST['username'];
$userpass = $_POST['userpass'];
$con = mysql_connect('localhost','root','136600');

mysql_select_db("ingping",$con);
$str = "select * from userinfo where username='$username' and userpass='$userpass';";
$result = mysql_query($str,$con);
mysql_close($con);

$rows = mysql_num_rows($result);

if($rows>0){
    echo '1';
}else{
    echo '0';
}

// create database ingping;
// create table userinfo(
       // id int auto_increment primary key,
       // username char(40),
       // userpass char(20)
// )
// select * from userinfo;
// insert into userinfo(username,userpass) values('666666','666666');
// insert into userinfo(username,userpass) values('7777777','7777777');
?>