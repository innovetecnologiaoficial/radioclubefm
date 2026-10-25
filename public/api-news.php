<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=120');

$rss_url = 'https://www.vitrinedosul.com.br/rss.xml';
$xml_content = false;

// 1. Tentar obter via cURL
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $rss_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    $xml_content = curl_exec($ch);
    curl_close($ch);
}

// 2. Fallback via file_get_contents se cURL falhar ou não estiver ativo
if (!$xml_content && ini_get('allow_url_fopen')) {
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    $xml_content = @file_get_contents($rss_url, false, $context);
}

if (!$xml_content) {
    http_response_code(500);
    echo json_encode(['error' => 'Falha ao buscar feed RSS'], JSON_UNESCAPED_UNICODE);
    exit;
}

$xml = @simplexml_load_string($xml_content, 'SimpleXMLElement', LIBXML_NOCDATA);
if (!$xml || !isset($xml->channel->item)) {
    http_response_code(500);
    echo json_encode(['error' => 'Formato XML inválido'], JSON_UNESCAPED_UNICODE);
    exit;
}

$items = [];
$count = 0;

foreach ($xml->channel->item as $item) {
    if ($count >= 9) break;

    $title = (string)$item->title;
    $link = (string)$item->link;
    $pubDate = (string)$item->pubDate;
    $description = (string)$item->description;

    $imageUrl = '';
    
    // Checar namespace media:content
    $namespaces = $item->getNamespaces(true);
    if (isset($namespaces['media'])) {
        $media = $item->children($namespaces['media']);
        if (isset($media->content)) {
            $attrs = $media->content->attributes();
            if (isset($attrs['url'])) {
                $imageUrl = (string)$attrs['url'];
            }
        }
    }

    // Checar enclosure
    if (empty($imageUrl) && isset($item->enclosure)) {
        $attrs = $item->enclosure->attributes();
        if (isset($attrs['url'])) {
            $imageUrl = (string)$attrs['url'];
        }
    }

    // Checar tag img na descrição
    if (empty($imageUrl) && preg_match('/<img[^>]+src=[\'"]([^\'"]+)[\'"]/i', $description, $matches)) {
        $imageUrl = $matches[1];
    }

    if (empty($imageUrl)) {
        $imageUrl = 'https://www.vitrinedosul.com.br/img/sem-foto.jpg';
    }

    $cleanDesc = trim(strip_tags($description));

    $items[] = [
        'title' => $title,
        'link' => $link,
        'pubDate' => $pubDate,
        'description' => $cleanDesc,
        'imageUrl' => $imageUrl
    ];

    $count++;
}

echo json_encode($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
