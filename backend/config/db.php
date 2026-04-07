<?php
mysqli_report(MYSQLI_REPORT_OFF);

$conn = mysqli_connect("localhost", "root", "", "fixigo", 3306);

if (!$conn) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . mysqli_connect_error()
    ]);
    exit();
}
?>
