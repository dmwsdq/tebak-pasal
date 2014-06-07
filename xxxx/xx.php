<?php
header('Access-Control-Allow-Origin: *'); // just to be on the safe side this have to be replaced to like header('Access-Control-Allow-Origin: www.domain.com');
// this is for yout server, it's not mandatory for the script

// edit below
$host = "yourmysqlhost";
$user = "yourmysqlusername";
$pass = "yourmysqlpass";
$db = "yourmysqldatabase";
// ^ edit these part

$n = $s = $sql = $ip = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if ( empty($_POST["n"]) || empty($_POST["s"]) ) {
    echo "Data kosong dikirim. Kontak @dmwsdq.";
  } else {
  	
    $n = $_POST["n"];
	$s = $_POST["s"];
	
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
    $ip = $_SERVER['REMOTE_ADDR'];
	}
	
	$con = mysqli_connect($host,$user,$pass,$db);
	if (mysqli_connect_errno()) {echo "Gagal menyambung ke MySQL. Kontak @dmwsdq." . mysqli_connect_error();}
	
	$sql = "INSERT INTO highscores (name,ip,score)
			VALUES ('".$n."','".$ip."',".$s.")";
	if (!mysqli_query($con,$sql)) {
  		die('Error: ' . mysqli_error($con));
	} else {
		echo "Data terkirim.";
	}
	mysqli_close($con);
  }}
else {
  	echo "Request Method salah. Kontak @dmwsdq.";
}
 
 // testing here 
 
?>
