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
        <li><a href="">Tier Daten ändern</a></li><!-- here links to-->
        <li><a onclick="">Einladung erstellen</a></li>
        <li><a href="">suche beenden</a></li>
    </ul>
</div>

<div id="areanav" class="bottomNav">
    <select name="priority" id="priority" onchange="editPriority(this.value)"> 
        <option value="HIGH">high</option>
        <option value="MEDIUM" selected = "selected">middle</option>
        <option value="LOW">low</option>
    </select>
    <button type="button" onclick="deleteArea()"> Delete Area</button>
    <button type="butten" onclick="areaSearched()"> Searched</button>
    <a id="searchStatus">Not Searched</a>
</div>
<div id="createAreaMenu" class="bottomNav">
    <select name="areaType" id="areaType"> 
        <option value="Poligon">poligon</option>
    </select>
    <button type="button" onclick="postArea()">post area</button>
    <button type="button" onclick="reverseDrawing()">reverse</button>
    <button type="button"onclick="redoDrawing()">redo</button>
    <button type="button" onclick="closeCreateArea()">hide</button>
</div>


<a id="sideNavBtn" href="#" class="float" onclick="openNav()">
<span>PetInfo</span>
</a>

<a id="createAreaBtn" class="float"onclick="createArea()">
    <span>+</span>
</a>



<div id="map" style="width: 100%; height: 100%;"></div>

</body>

<script src="/js/map.js"></script>
</html>
