<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$vehicle_name = $data['vehicle_name'];
$vehicle_number = $data['vehicle_number'];

$query = "INSERT INTO vehicles (user_id, vehicle_name, vehicle_number)
          VALUES ('$user_id', '$vehicle_name', '$vehicle_number')";

if(mysqli_query($conn, $query)){
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
