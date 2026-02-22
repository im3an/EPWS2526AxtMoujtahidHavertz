
const map = L.map('map').setView([51.505, -0.09], 13);
var selectedPoligon = null
var drawing = false

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var areas = []

var polygonslate;

var missingReportId

async function getData() {
    missingReportId = await window.location.href.split("/")[4] // !!!!!!!!! HAS TO BE CHANGE WHEN PATH CHANGES !!!!!!!!!!!
    let response = await fetch("/api/v1/missing-reports/".concat("",missingReportId));
    let data = await response.json()
    return data
}

function priorityToCollor(prio){
    switch(prio){
        case "HIGH":
            return "#ff5967";
        case "MEDIUM":
            return "#ff8d41";
        case "LOW":
            return "#50e4ad"
        default:
            return "#cecece"
    }
}

function addAreas(report){
    console.log(report.areas);
    const pointOfLostPet = [report.location.latitude, report.location.latitude]
    map.setView(pointOfLostPet, 13);
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

var areaCoordintsBuffer=[]
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
    map.off("click",onMapClick)
    drawing = false
    map.removeLayer(polygonslate)
    polygonslate = null
    areaCoordintsBuffer =[]
}

function reverseDrawing(){
    var coords = polygonslate.getLatLngs()[0]
    areaCoordintsBuffer.push(coords.pop())
    polygonslate.setLatLngs(coords);
}

function redoDrawing(){
    if(areaCoordintsBuffer.length!=0){
        var coords = polygonslate.getLatLngs()[0]
        coords.push(areaCoordintsBuffer.pop())
        polygonslate.setLatLngs(coords);
    }
}

function onMapClick(e) {
    console.log("on map called");
    //console.log(polygonslate)
    var coords = polygonslate.getLatLngs()[0]
    coords.push(e.latlng);
    console.log("coords")
    polygonslate.setLatLngs(coords);
    areaCoordintsBuffer=[]
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
    document.getElementById("sideNavBtn").style.left = "22%"
    document.getElementById("sideNavBtn").onclick = closeNav
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("map").style.margin = "0";
    document.getElementById("sideNavBtn").style.left = "2%"
    document.getElementById("sideNavBtn").onclick = openNav
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