<?php
$conn = mysqli_connect("localhost", "root", "", "fixigo", 3306);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>