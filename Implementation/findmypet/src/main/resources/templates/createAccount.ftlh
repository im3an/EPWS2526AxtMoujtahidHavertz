<#import "layout.ftlh" as layout>

<@layout.page_layout>
<!doctype html>
<html lang="de">
   <head>
   	<base target="_top">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
	
	   <title>fmp create account</title>
   </head>
   <body>
      <h2>Neuen User erstellen</h2>

      <form id="userForm">
         <input type="text" id="surname" placeholder="Nachname" required><br>
         <input type="text" id="firstname" placeholder="Vorname" required><br>
         <input type="text" id="phoneNumber" placeholder="Telefonnummer" required><br>

         <h4>Adresse</h4>
         <input type="text" id="street" placeholder="Straße" required><br>
         <input type="text" id="city" placeholder="Stadt" required><br>
         <input type="text" id="zipCode" placeholder="PLZ" required><br>
         <input type="text" id="countryCode" placeholder="Land (DE, AT...)" required><br>

         <input type="text" id="name" placeholder="Username" required><br>
         <input type="email" id="email" placeholder="Email" required><br>
         <input type="password" id="password" placeholder="Passwort" required><br><br>

         <button type="submit">User erstellen</button>
      </form>
      <script src="/js/create-user.js"></script>
   </body>
</html>
</@layout.page_layout>