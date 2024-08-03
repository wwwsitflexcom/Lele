<?php
$persons = file_get_contents('persons.json');
header('Content-Type: application/json');
echo $persons;
?>
