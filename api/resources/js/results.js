//when document loads, the event listeners are activated
$(document).ready(function(){
	
	setCookie("askcookie", 0, 365);
	//when button to empty list is clicked
	$("#emptybutton").click(function() {
		$("#list").empty();
	});
	
	
$("#loadbutton").click(function() {
	
	var pageurl = "/votes";
	//load JSON-data from server
	$.getJSON(pageurl, function( data ) {
		var tableData = '<table><tr><th style="text-align:center;">Lecture name</th><th>Feeling1</th><th>Feeling2</th><th>Feeling3</th><th>Feeling4</th><th>Feeling5</th><th>Average</th><th>Votes</th><th style="text-align:center;">Date</th></tr>';
		$.each( data, function( key, val ) {
			//add data to list
			//name to list	
			tableData += '<tr><td>'+val.name+'</td><td>'+val.feeling1+'</td><td>'+val.feeling2+'</td><td>'+val.feeling3+'</td><td>'+val.feeling4+'</td><td>'+val.feeling5+'</td><td>'+val.average+'</td><td>'+val.votes+'</td><td>'+val.date+'</td></tr>';
		//	$("<h2/>").text(val.id + " " +val.feeling1 + " " +val.feeling2 + " " +val.feeling3 + " " +val.feeling4 + " " +val.feeling5 + " " +val.average + " " +val.votes + " " +val.namei + " " +val.pvm + " ").appendTo(feels);
			$('#list').html(tableData);
		});
	}).error(function() { //error in connection to server
		$("<p class='Error'>Error: Server does not return JSON data. Check database connection.</p>").appendTo("#list");
	});
	
});
$("#new").click(function() {
	setCookie("averagecookie", 0, 365);
	setCookie("votescookie", 0, 365);
	setCookie("points1cookie", 0, 365);
	setCookie("points2cookie", 0, 365);
	setCookie("points3cookie", 0, 365);
	setCookie("points4cookie", 0, 365);
	setCookie("points5cookie", 0, 365);
	setCookie("allpointscookie", 0,
			365);
	setCookie("namecookie", 0, 365);
	window.location.replace("/");
});
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
});