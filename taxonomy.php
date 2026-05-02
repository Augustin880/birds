<?php

declare(strict_types=1);

$dataFile = __DIR__ . '/data/taxonomy.json';

header('Content-Type: application/json; charset=UTF-8');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET') {
    if (!is_file($dataFile) || !is_readable($dataFile)) {
        respondWithJson(['error' => 'Taxonomy file is not readable.'], 500);
    }

    $contents = file_get_contents($dataFile);

    if ($contents === false) {
        respondWithJson(['error' => 'Failed to read taxonomy file.'], 500);
    }

    $decoded = json_decode($contents, true);

    if (!is_array($decoded)) {
        respondWithJson(['error' => 'Taxonomy file contains invalid JSON.'], 500);
    }

    echo json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($method === 'POST') {
    $rawBody = file_get_contents('php://input');

    if ($rawBody === false || trim($rawBody) === '') {
        respondWithJson(['error' => 'Missing request body.'], 400);
    }

    $decoded = json_decode($rawBody, true);

    if (!is_array($decoded)) {
        respondWithJson(['error' => 'Invalid JSON payload.'], 400);
    }

    $encoded = json_encode(
        $decoded,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );

    if ($encoded === false) {
        respondWithJson(['error' => 'Failed to encode taxonomy JSON.'], 500);
    }

    $bytesWritten = file_put_contents($dataFile, $encoded . PHP_EOL, LOCK_EX);

    if ($bytesWritten === false) {
        respondWithJson(['error' => 'Failed to write taxonomy file.'], 500);
    }

    respondWithJson(['ok' => true]);
}

respondWithJson(['error' => 'Method not allowed.'], 405);

function respondWithJson(array $payload, int $statusCode): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}
