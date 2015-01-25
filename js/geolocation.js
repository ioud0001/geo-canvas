// Anna Ioudovskaya
// MAD9022: Assignment 2 - Geolocation and Canvas 

document.addEventListener("DOMContentLoaded", function(){

  if( navigator.geolocation ){ 
    var parameters = {enableHighAccuracy: false, timeout:3600, maximumAge:60000};
    //enableHighAccuracy means try to use GPS and drain the battery
    //for improved accuracy within a few meters.
    //maximum age is how long to cache the location info
    //timeout is how long to wait for the network to respond after the user says ok
    navigator.geolocation.getCurrentPosition( reportPosition, gpsError, parameters ); 
  }else{
    //browser does not support geolocation api
    alert("We're having trouble finding your location...but perhaps this is what you wanted...")
  }
});

function reportPosition( position ){ 
	// create the canvas area 
	var canvas = document.createElement("canvas"); 
	var context = canvas.getContext("2d");
	var dimensions = 400;
	canvas.height = dimensions;
	canvas.width = dimensions;
	
	// retrieve the google image according to the longitude and latitude 
	var coordinates = position.coords.latitude + ',' + position.coords.longitude;
	
	var mapUrl = "http://maps.google.com/maps/api/staticmap?center=";
	mapUrl = mapUrl + coordinates 
			+ '&zoom=14&size=' + dimensions + 'x' + dimensions 
			+ '&maptype=terrain&sensor=true&markers=size:mid%7Ccolor:red%7C' 
			+ coordinates;

	document.getElementById("canvasdiv").appendChild(canvas);
	// create the image and set the attributes for the image
	var imgsrc = new Image;
	// add the map source to the image source,
	// and draw the image to the canvas area 
	imgsrc.src = mapUrl; 
	
	imgsrc.onload = function() {
    context.drawImage(imgsrc, 0, 0);
	
	};
}


function gpsError( error ){   
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}
