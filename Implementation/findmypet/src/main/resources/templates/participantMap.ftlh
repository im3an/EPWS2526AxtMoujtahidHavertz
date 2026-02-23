<#import "layout.ftlh" as layout>

<@layout.page_layout>
<!DOCTYPE html>
<html lang="de">
<head>
	<base target="_top">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>fmp map owner-view</title>
	
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

    <link rel="stylesheet" href="/css/map.css">
</head>
<body>

<div id="mySidenav" class="sidenav">
    
   <h3><strong>${missingReport.petName}</strong></h3>
   <ul>
      <li>${missingReport.species}</li>
      <li>${missingReport.breed}</li>
      <li>${missingReport.breed}</li>
      <li>${missingReport.primaryColor}</li>
      <li>${missingReport.colorDetails}</li>
      <li>${missingReport.petSize}</li>
      <li>${missingReport.ageRange}</li>
      <li>${missingReport.chipNumber}</li>
      <li>${missingReport.description}</li>
   </ul>
   <ul>
      <li><a href="">sichtung melden</a></li>
   </ul>
</div>

<div id="areanav" class="bottomNav">
    <button type="butten"> Searched</button>
</div>

<a id="sideNavBtn" href="#" class="float" onclick="openNav()">
<span>PetInfo</span>
</a>

<div id="map" style="width: 100%; height: 100%;"></div>

</body>

<script src="/js/map.js"></script>
</html>
</@layout.page_layout>