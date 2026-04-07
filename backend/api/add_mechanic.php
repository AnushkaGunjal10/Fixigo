<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$phone = $data['phone'];
$location = $data['location'];
$lat = $data['latitude'];
$lng = $data['longitude'];

$query = "INSERT INTO mechanics (name, phone, location, availability, latitude, longitude)
VALUES ('$name', '$phone', '$location', 'Available', '$lat', '$lng')";

if(mysqli_query($conn, $query)){
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error"]);
}
?>
