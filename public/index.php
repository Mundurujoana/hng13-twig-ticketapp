<?php
require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader);

// Map of paths to Twig templates
$routes = [
    '/' => 'landing.twig',
    '/auth/login' => 'login.twig',
    '/login' => 'login.twig',
    '/auth/signup' => 'signup.twig',
    '/signup' => 'signup.twig',
    '/dashboard' => 'dashboard.twig',
    '/tickets' => 'ticketmanagement.twig',
    '/ticket-management' => 'ticketmanagement.twig',
];

// Get the requested path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Render the template based on the path, default to landing page
$template = $routes[$path] ?? 'landing.twig';
echo $twig->render($template);
