<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

$user_id = $_GET['user_id'];

$result = mysqli_query($conn, "SELECT * FROM vehicles WHERE user_id='$user_id'");

$vehicles = [];

while($row = mysqli_fetch_assoc($result)){
    $vehicles[] = $row;
}

echo json_encode($vehicles);
?>
