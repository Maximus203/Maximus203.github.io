<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title inertia>{{ config('app.name', 'Portfolio') }}</title>

          <!-- SEO Meta Tags -->
          <meta name="description"
                    content="El Hadji Ahmadou Cherif Diouf - Ingénieur Full-Stack & Formateur. Expert Laravel, React & TypeScript.">
          <meta name="keywords"
                    content="Laravel, React, TypeScript, Inertia.js, Full-Stack, Développeur, Formateur, Dakar, Sénégal">
          <meta name="author" content="El Hadji Ahmadou Cherif Diouf">
          <meta name="robots" content="index, follow">

          <!-- Open Graph / Facebook -->
          <meta property="og:type" content="website">
          <meta property="og:url" content="{{ url('/') }}">
          <meta property="og:title" content="Cherif Diouf | Développeur Full-Stack">
          <meta property="og:description"
                    content="Portfolio professionnel d'un ingénieur Full-Stack spécialisé en Laravel & React">
          <meta property="og:image" content="{{ asset('assets/photo.webp') }}">

          <!-- Twitter -->
          <meta property="twitter:card" content="summary_large_image">
          <meta property="twitter:url" content="{{ url('/') }}">
          <meta property="twitter:title" content="Cherif Diouf | Développeur Full-Stack">
          <meta property="twitter:description" content="Portfolio professionnel d'un ingénieur Full-Stack">
          <meta property="twitter:image" content="{{ asset('assets/photo.webp') }}">

          <!-- Favicon -->
          <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
          <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
          <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">
          <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.png') }}">

          <!-- Fonts -->
          <link rel="preconnect" href="https://fonts.bunny.net">
          <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700&display=swap" rel="stylesheet" />

          <!-- Scripts -->
          @routes
          @viteReactRefresh
          @vite(['resources/css/app.css', 'resources/js/app.tsx'])
          @inertiaHead
</head>

<body class="antialiased">
          @inertia
</body>

</html>
