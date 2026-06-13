<?php
$esInicio = basename($_SERVER['PHP_SELF']) === 'index.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRTV</title>
    <link rel="stylesheet" href="./css/main.css">
</head>

<body class="<?php echo $esInicio ? 'con-preloader' : ''; ?>">

    <?php if ($esInicio): ?>
    <div id="loader">
        <div id="countdown">3</div>
    </div>
    <?php endif; ?>

    <div id="contenido" class="page-transition">
        <header>
            <menu>
                <div class="menu-izquierda">
                    <a href="index.php"><img src="./Logos/logo.png" alt="CRTV"></a>
                </div>

                <div class="menu-container">
                    <div class="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div class="menu-derecha">
                    <a href="index.php">INICIO</a>
                    <a href="FLUJO_TV.php">FLUJO TV</a>
                    <a href="CONTACTO.php">CONTACTO</a>
                </div>
            </menu>
        </header>
