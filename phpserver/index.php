<?php  
header('Content-Type: application/json;charset=utf-8');

$connection = pg_connect("host=postgresdb dbname=aula-docker user=postgres password=123456");
$query = "SELECT *FROM USERS";

$result = pg_query($connection, $query);

$users = pg_fetch_all($result);

echo json_encode($users);

pg_close($connection);