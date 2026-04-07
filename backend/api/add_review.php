<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$mechanic_id = $data['mechanic_id'];
$rating = $data['rating'];
$comment = $data['comment'];

$query = "INSERT INTO reviews (user_id, mechanic_id, rating, comment)
VALUES ('$user_id', '$mechanic_id', '$rating', '$comment')";

if(mysqli_query($conn, $query)){
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error"]);
}
?>
