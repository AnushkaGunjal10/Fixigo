<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['booking_id'];
$status = $data['status'];

$query = "UPDATE bookings SET status='$status' WHERE booking_id='$id'";

if(mysqli_query($conn, $query)){
    $user_query = mysqli_query($conn, "SELECT user_id FROM bookings WHERE booking_id='$id'");
    $user = mysqli_fetch_assoc($user_query);
    $user_id = $user['user_id'];

    $message = "Your booking status is now $status";

    mysqli_query($conn, "INSERT INTO notifications (user_id, message)
    VALUES ('$user_id', '$message')");

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
