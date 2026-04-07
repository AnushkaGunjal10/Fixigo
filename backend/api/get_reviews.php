<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

$mechanic_id = $_GET['mechanic_id'];

$result = mysqli_query($conn, "SELECT * FROM reviews WHERE mechanic_id='$mechanic_id'");

$reviews = [];

while($row = mysqli_fetch_assoc($result)){
  $reviews[] = $row;
}

echo json_encode($reviews);
?>
