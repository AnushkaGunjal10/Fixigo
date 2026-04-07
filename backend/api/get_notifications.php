<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

$user_id = $_GET['user_id'];

$result = mysqli_query($conn, "SELECT * FROM notifications WHERE user_id='$user_id' ORDER BY id DESC");

$data = [];

while($row = mysqli_fetch_assoc($result)){
  $data[] = $row;
}

echo json_encode($data);
?>
