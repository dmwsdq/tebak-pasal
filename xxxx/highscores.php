<?php
header('Access-Control-Allow-Origin: *'); // just to be on the safe side this have to be replaced to like header('Access-Control-Allow-Origin: www.domain.com');
// this is for yout server, it's not mandatory for the script


// edit below
$host = "yourmysqlhost";
$user = "yourmysqlusername";
$pass = "yourmysqlpass";
$db = "yourmysqldatabase";
// ^ edit these part

$top = 10;
$count = 0;
$temp = $response = array();
$n = $t ='';
$s = 0;

$con = mysqli_connect($host,$user,$pass,$db);
if (mysqli_connect_errno()) {echo "Gagal menyambung ke MySQL. Kontak @dmwsdq." . mysqli_connect_error();}
	
$sql = "SELECT name,score,timestamp FROM highscores 
		ORDER BY score DESC";
$result = mysqli_query($con,$sql);
if ($result == FALSE) {
	die('Error: ' . mysqli_error($con));
} 

$count = 0;
while($player = mysqli_fetch_array($result)) {
	$n = $player['name'];
	$t = $player['timestamp'];
	$s = $player['score'];
	$temp = array('n'=>$n,'t'=>$t,'s'=>$s);
	array_push($response,$temp);
	$count++;	
	if($count == $top){
		break;
	}
}
$response = json_encode($response);
echo $response;

mysqli_close($con);

?>
