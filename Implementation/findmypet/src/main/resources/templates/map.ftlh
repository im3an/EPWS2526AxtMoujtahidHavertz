<!DOCTYPE html>
<html lang="en">
<head>
	<base target="_top">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>fmp map owner-view</title>
	
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

	<style>
		html, body {
			height: 99.5%; /* Not a good solution with % */
			width: 99.5%;
		}
        .bottomNav {
            height: 100px;
            z-index: 1000;
            position: fixed;
            background: #CCC;
            bottom: 0;
            align-items: center;
            display: flex;
            justify-content: space-around;
            border-style: solid;

        }
		#areanav {
            left: 20%;
            width: 30%;
            display: none;
        }
        #createAreaMenu{
            left:50%;
            width:50%;
            display: none;
        }
        .sidenav {
        height: 100%; 
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0; 
        left: 0;
        background-color: #FFF; 
        overflow-x: hidden;
        padding-top: 60px; 
        z-index: 2000;
        }

        
        .sidenav a {
        padding: 8px 8px 8px 32px;
        font-size: 25px;
        color: #818181;
        display: block;
        }

    
        .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
        }

        @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
        }
        .leaflet-container {
            margin: 0px;
            display: block;
			height: 400px;
			width: 600px;
			max-width: 100%;
			max-height: 100%;
		}
        #sideNavBtn{
            top:50%;
            left:40px;
        }
        #createAreaBtn{
            bottom: 40px;
            right: 40px;
        }
        .float{
            position:fixed;
            width:60px;
            height:60px;

            background-color:#111;
            color:#FFF;
            border-radius:50px;
            box-shadow: 2px 2px 3px #999;
            z-index: 1000; /* otherwise it will be coverd by the map*/
        }
        .float span {
            margin-top: 18px;
            display: flex;
            text-align:center;
            justify-content: center;
        }

    </style>

	
</head>
<body>

<div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Clients</a>
    <a href="#">Contact</a>
</div>

<div id="areanav" class="bottomNav">
    <select name="priority" id="priority" onchange="editPriority(this.value)"> 
        <option value="HIGH">high</option>
        <option value="MEDIUM" selected = "selected">middle</option>
        <option value="LOW">low</option>
    </select>
    <button type="button" onclick="deleteArea()"> Delete Area</button>
    <button type="butten"> Searched</button>
</div>
<div id="createAreaMenu" class="bottomNav">
    <select name="areaType" id="areaType"> 
        <option value="Poligon">poligon</option>
    </select>
    <button type="button" onclick="postArea()">post area</button>
    <button type="button">reverse</button>
    <button type="button">back to the future</button>
    <button type="button" onclick="closeCreateArea()">hide</button>
</div>


<a id="sideNavBtn" href="#" class="float">
<span onclick="openNav()">open</span>
</a>

<a id="createAreaBtn" class="float">
    <span onclick="createArea()">+</span>
</a>



<div id="map" style="width: 100%; height: 100%;"></div>
<script>

	const map = L.map('map').setView([51.505, -0.09], 13);
    var selectedPoligon = null
    var drawing = false

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

    var areas = [
        L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ],{
            color: "#0088ff",
            data:{
            id: 123,
            active: false,
            priority: "middle"
        }}).addTo(map).on("click", areaOnClick)
    ]

    var polygonslate;

    const missingReportId = "0dc298d8-30cc-4713-a374-844b3e12728e"

    async function getData() {
        let response = await fetch("/api/v1/missing-reports/".concat("",missingReportId));
        let data = await response.json()
        return data
    }

        function priorityToCollor(prio){
        switch(prio){
            case "HIGH":
                return "#FF8B94";
            case "MEDIUM":
                return "FFD3B6";
            case "LOW":
                return "#A8E6CF"
            default:
                return "#FFFFFF"
        }
    }

    function addAreas(report){
        console.log(report.areas);
        report.areas.forEach(element => {
            coordinates=[];
            element.coordinates.forEach(element => {
                coordinates.push([element.latitude,element.longitude]);
            });
            console.log(JSON.stringify(coordinates))
            areas.push(
                L.polygon(coordinates,{
                    color: priorityToCollor(element.priority),
                    data:{
                        id: element.id,
                        active: false,
                        priority: element.priority
                    }
                }).addTo(map).on("click", areaOnClick)
            )
            console.log(JSON.stringify(areas[areas.length-1].options.data))
        });
    }
    function loadArea(){
        try{
        
        areas.forEach(p => map.removeLayer(p));
        areas=[];
        console.log("cleared")
        const missingReport = getData()
        console.log(missingReport.then((data) => {
            console.log(data)
            addAreas(data)
        }))
        }catch(err){
            console.log(err)
        }
    }
    loadArea();


    function activateDrawing(){
        console.log(areas.length)
        drawing = true
        polygonslate = L.polygon([[]],{
            color: priorityToCollor("MEDIUM"),
            data:{
            id: null,
            active: false,
            priority: "MEDIUM"}
        })
        polygonslate.addTo(map)
        console.log("slate created")
        //console.log(JSON.stringify(polygonslate))
        map.on("click",onMapClick)
    }

    function deactivateDrawing(){
        map.off()
        drawing = false
        map.removeLayer(polygonslate)
        polygonslate = null
    }

    function onMapClick(e) {
        console.log("on map called");
        //console.log(polygonslate)
        var coords = polygonslate.getLatLngs()[0]
        coords.push(e.latlng);
        console.log("coords")
        polygonslate.setLatLngs(coords);
    }

    function areaOnClick(e){
        
        if (e!=null && !drawing){
            if(!e.target.options.data.active){
                activateArea(e)
            } else {
                deactivateArea(e)
            }
        }
    }



    function areaToAPIconverter(area){
        coordinates = []
        console.log(area.getLatLngs()[0])
        area.getLatLngs()[0].forEach((element)=>{coordinates.push({
            "latitude": element.lat,
            "longitude": element.lng
        })})
        json = {
            id: area.options.data.id,
            searched: true,
            lastSearch: null,
            coordinates: coordinates,
            missingReportId: missingReportId,
            priority : area.options.data.priority,
            radius: 0,
            areaType: "POLYGON"
        }
        return json
    }

    async function deleteArea(){
        try{
            console.log(selectedPoligon.target.options.data.id)
            url = "/api/v1/missing-reports/".concat("",missingReportId).concat("","/areas/").concat("",selectedPoligon.target.options.data.id)
            console.log(url)
            const response = await fetch(url,{
                method: "DELETE",
                }
            );
            deactivateArea(selectedPoligon)
            loadArea()
        }catch(err){
            console.log(err)
        }
    }

    async function postArea(){
        if(polygonslate.getLatLngs()[0].length>2){
            try{
                url = "/api/v1/missing-reports/".concat("",missingReportId).concat("","/areas")
                json=areaToAPIconverter(polygonslate)
                const response = await fetch(url,{
                    method: "POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(json)
                    }
                );
                areas.push(polygonslate)
                closeCreateArea()
                areas[areas.length-1].addTo(map).on("click", areaOnClick)
            }catch(err){
                console.log(err)
            }
        }
    }

    async function editPriority(prio){
            try{
                console.log(prio)
                url = url = "/api/v1/missing-reports/".concat("",missingReportId).concat("","/areas/").concat("",selectedPoligon.target.options.data.id)
                
                selectedPoligon.target.options.data.priority = prio
                selectedPoligon.target.setStyle({color:priorityToCollor(selectedPoligon.target.options.data.priority)})
                json=areaToAPIconverter(selectedPoligon.target)
                console.log(json)
                const response = await fetch(url,{
                    method: "PUT",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(json)
                    }
                );
            }catch(err){
                console.log(err)
            }
        
    }
    
    function activateArea(e){
        if(selectedPoligon!=null){deactivateArea(selectedPoligon)}
        e.target.options.data.active = true
        e.target.setStyle({color:"#00ff33"})
        document.getElementById("areanav").style.display = "flex"
        selectedPoligon = e
    }
    
    function deactivateArea(e){
        e.target.setStyle({color:priorityToCollor(e.target.options.data.priority)})
        e.target.options.data.active = false
        document.getElementById("areanav").style.display = "none"
        selectedPoligon = null
    }

    function openNav() {
        document.getElementById("mySidenav").style.width = "20%";
        document.getElementById("sideNavBtn").style.display = "none"
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("map").style.margin = "0";
        document.getElementById("sideNavBtn").style.display = "block"
    }

    function closeCreateArea(){
        document.getElementById("createAreaMenu").style.display = "none"
        document.getElementById("createAreaBtn").style.display = "block"
        deactivateDrawing()
    }
    function createArea(){
        document.getElementById("createAreaBtn").style.display = "none"
        document.getElementById("createAreaMenu").style.display = "flex"
        activateDrawing()
    }
</script>



</body>
</html>
