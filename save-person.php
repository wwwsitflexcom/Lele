<?php
$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() === JSON_ERROR_NONE) {
    $persons = json_decode(file_get_contents('persons.json'), true);
    $data['id'] = time(); // Génère un ID unique basé sur l'horodatage actuel
    $persons[] = $data;
    file_put_contents('persons.json', json_encode($persons));
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la décodage des données JSON.']);
}
?>
