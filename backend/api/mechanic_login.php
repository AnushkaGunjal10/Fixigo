<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Only POST requests are allowed"
    ]);
    exit();
}

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data) || empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Email and password are required"
    ]);
    exit();
}

$email = mysqli_real_escape_string($conn, trim($data['email']));
$password = mysqli_real_escape_string($conn, trim($data['password']));

$query = "SELECT * FROM mechanics WHERE email='$email' AND password='$password'";
$result = mysqli_query($conn, $query);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Mechanic login query failed: " . mysqli_error($conn)
    ]);
    exit();
}

if(mysqli_num_rows($result) == 1){
    $row = mysqli_fetch_assoc($result);

    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "mechanic_id" => $row['mechanic_id'],
        "email" => $row['email'],
        "name" => $row['name']
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid credentials"
    ]);
}
?>
