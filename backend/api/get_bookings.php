<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

$user_id = $_GET['user_id'];

$query = "
SELECT bookings.*, mechanics.name AS mechanic_name 
FROM bookings
JOIN mechanics ON bookings.mechanic_id = mechanics.mechanic_id
WHERE bookings.user_id = '$user_id'
";

$result = mysqli_query($conn, $query);

$bookings = [];

while($row = mysqli_fetch_assoc($result)){
    $bookings[] = $row;
}

echo json_encode($bookings);
?>
