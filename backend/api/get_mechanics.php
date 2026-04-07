<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

$result = mysqli_query($conn, "SELECT * FROM mechanics");

$mechanics = [];

while($row = mysqli_fetch_assoc($result)){
    $mechanics[] = $row;
}

echo json_encode($mechanics);
?>
