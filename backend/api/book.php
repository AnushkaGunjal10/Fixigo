<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$mechanic_id = $data['mechanic_id'];
$service = $data['service'];
$date = $data['date'];
$time = $data['time'];

$query = "INSERT INTO bookings (user_id, mechanic_id, service, status, booking_date, booking_time)
          VALUES ('$user_id', '$mechanic_id', '$service', 'Pending', '$date', '$time')";

if(mysqli_query($conn, $query)){
    echo json_encode([
        "status" => "success",
        "booking_id" => mysqli_insert_id($conn)
    ]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
