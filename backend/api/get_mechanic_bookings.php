<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

$mechanic_id = $_GET['mechanic_id'];

$query = "
SELECT bookings.*, users.name AS user_name
FROM bookings
JOIN users ON bookings.user_id = users.user_id
WHERE bookings.mechanic_id = '$mechanic_id'
";

$result = mysqli_query($conn, $query);

$data = [];

while($row = mysqli_fetch_assoc($result)){
  $data[] = $row;
}

echo json_encode($data);
?>
