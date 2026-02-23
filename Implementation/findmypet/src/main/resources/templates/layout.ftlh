<#macro page_layout>
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FindMyPet</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

        <style>
            :root {
                --primary: #007bff;
                --primary-dark: #0056b3;
                --bg-body: #f4f7f6;
                --white: #ffffff;
                --text: #2d3436;
            }

            body {
                font-family: 'Inter', sans-serif;
                margin: 0;
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background-color: var(--bg-body);
            }

            header {
                background-color: var(--white);
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                padding: 0 30px;
                height: 70px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: sticky;
                top: 0;
                z-index: 1000;
            }

            .header-left, .header-right { display: flex; align-items: center; gap: 25px; }

            .header-center {
                display: flex;
                gap: 30px;
            }

            .logo { font-size: 1.8rem; text-decoration: none; }

            .nav-link {
                text-decoration: none;
                color: var(--text);
                font-weight: 600;
                transition: color 0.2s;
            }
            .nav-link:hover { color: var(--primary); }

            .icon-link {
                text-decoration: none;
                color: var(--text);
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .icon-link:hover { color: var(--primary); }

            main {
                flex: 1;
                padding: 40px 20px;
                max-width: 1200px;
                margin: 0 auto;
                width: 100%;
                box-sizing: border-box;
            }

            footer {
                background-color: #2d3436;
                color: white;
                text-align: center;
                padding: 25px 0;
                margin-top: auto;
            }
        </style>
    </head>
    <body>

    <header>
        <div class="header-left">
            <a href="/" class="logo" title="Zur Startseite">🐾</a>
        </div>

        <nav class="header-center">
            <a href="/search" class="nav-link"><i class="fa-solid fa-magnifying-glass"></i> Suche</a>
            <a href="/missing-reports/create" class="nav-link"><i class="fa-solid fa-plus-circle"></i> Meldung erstellen</a>
        </nav>

        <div class="header-right">
            <a href="#" class="icon-link">
                <i class="fa-solid fa-gear"></i>
                <span>Optionen</span>
            </a>
            <a href="#" class="icon-link">
                <i class="fa-solid fa-circle-user"></i>
                <span>Login</span>
            </a>
        </div>
    </header>

    <main>
        <#nested> </main>

    <footer>
        <p>&copy; 2026 FindMyPet - Gemeinsam bringen wir sie nach Hause.</p>
    </footer>

    </body>
    </html>
</#macro>