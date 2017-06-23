

//Make values that can be called
var pageurl = "/votes";
var data = "";

// adds values to tbody
$.getJSON(pageurl, function(result) {

	$.each(result, function(i, field) {
		// artistlist.push(field);
		console.log('smile1: ' + field.smile1 + ' smile2: ' + field.smile2 + ' smile3: '
				+ field.smile3 + ' smile4: ' + field.smile4 + ' smile5: ' + field.smile5);
		console.log(JSON.stringify(field));
		data += "<tr>";
		data += "<td>" + field.smile1 + "</td>";
		data += "<td>" + field.smile2 + "</td>";
		data += "<td>" + field.smile3 + "</td>";
		data += "<td>" + field.smile4 + "</td>";
		data += "<td>" + field.smile5 + "</td>";

		data += "</tr>";
	});
	$("tbody").html(data);
})

// AJAX method (creates "ajaxRequest" function which lets you access the data)

function ajaxRequests(data, type, callback) {
	$.ajax({
		url : '/votes',
		data : JSON.stringify(data),
		contentType : 'application/json',
		type : type,
		success : callback(),
		error : function(xhr, status, error) {
			console.log('Error: ' + error);
		},
	});
}

// inserts given data into the table
$("#buttoninsert").click(function() {
	var smile1 = $('#smile1field').val();
	var smile2 = $('#smile2field').val();
	var smile3 = $('#smile3field').val();
	var smile4 = $('#smile4field').val();
	var smile5 = $('#smile5field').val();
	// alert(name);
	var data = {
		"smile1" : smile1,
		"smile2" : smile2,
		"smile3" : smile3,
		"smile4" : smile4,
		"smile5" : smile5,
		
	};

	ajaxRequests(data, 'POST', function() {
//		if(data !== data){
//			console.log('Data not stored');
//		}else{
		console.log('Success: ' + "data added")
		console.log(JSON.stringify(data));
//		}
	});
});

// SMILEAPPLICATION CODE BELOW

$(document).ready(function() {
	
					var nimi = "";
					var kysy = 0;
					kysy = getCookie("kysykeksi");

					if (kysy != 1) {
						var nimi = prompt("Name of the class:", "");
						setCookie("kysykeksi", 1, 365);
						setCookie("nimikeksi", nimi, 365);
					}

					// alustetaan alkuarvot
					var yhteispisteet = 0;
					var aanet = 0;
					var keskiarvo = 0;
					var esilla = 0;
					var pisteet1 = 0;
					var pisteet2 = 0;
					var pisteet3 = 0;
					var pisteet4 = 0;
					var pisteet5 = 0;
					// jos arvoja on kekseissä, asetetaan ne muuttujiin
					keskiarvo = getCookie("keskiarvokeksi");
					pisteet1 = getCookie("pisteet1keksi");
					pisteet2 = getCookie("pisteet2keksi");
					pisteet3 = getCookie("pisteet3keksi");
					pisteet4 = getCookie("pisteet4keksi");
					pisteet5 = getCookie("pisteet5keksi");
					yhteispisteet = getCookie("yhteispisteetkeksi");
					aanet = getCookie("aanetkeksi");
					nimi = getCookie("nimikeksi");

					$("#tulos").html(
							"Fiiliksiä annettu: " + aanet
									+ "<br><br> Fiiliskeskiarvo on: "
									+ keskiarvo + "<br> <br> " + pisteet1
									+ "<br>" + pisteet2 + "<br>" + pisteet3
									+ "<br>" + pisteet4 + "<br>" + pisteet5);

					$("#tulos").hide();

					// lisää fiiliksen sen perusteella, mikä buttonin value on
					$('.fiilis')
							.click(
									function() {

										$('.fiilis').prop("disabled", true);

										yhteispisteet = Number(yhteispisteet)
												+ Number($(this).val());

										if (Number($(this).val()) === 1) {
											pisteet1 = Number(pisteet1) + 1;

										} else if (Number($(this).val()) === 2) {
											pisteet2 = Number(pisteet2) + 1;
										} else if (Number($(this).val()) === 3) {
											pisteet3 = Number(pisteet3) + 1;
										} else if (Number($(this).val()) === 4) {
											pisteet4 = Number(pisteet4) + 1;
										} else if (Number($(this).val()) === 5) {
											pisteet5 = Number(pisteet5) + 1;
										}
										$(".fiilis").hide();
										$("#numerorivi").hide();
										$(this).show();

										aanet = Number(aanet) + 1

										$("#kiitos").html("Kiitos!").fadeIn(
												"fast");
										$("#kiitos").css({
											"font-weight" : "bold",
											"font-size" : "80px",
											"color" : "red"
										});

										keskiarvo = yhteispisteet / aanet;
										keskiarvo = keskiarvo.toFixed(2);

										setCookie("keskiarvokeksi", keskiarvo,
												365);
										setCookie("aanetkeksi", aanet, 365);
										setCookie("pisteet1keksi", pisteet1,
												365);
										setCookie("pisteet2keksi", pisteet2,
												365);
										setCookie("pisteet3keksi", pisteet3,
												365);
										setCookie("pisteet4keksi", pisteet4,
												365);
										setCookie("pisteet5keksi", pisteet5,
												365);
										setCookie("yhteispisteetkeksi",
												yhteispisteet, 365);

										$("#tulos")
												.html(
														"Fiiliksiä annettu: "
																+ aanet
																+ "<br><br> Fiiliskeskiarvo on: "
																+ keskiarvo
																+ "<br> <br> "
																+ pisteet1
																+ "<br>"
																+ pisteet2
																+ "<br>"
																+ pisteet3
																+ "<br>"
																+ pisteet4
																+ "<br>"
																+ pisteet5);
										setTimeout(vaihdaTeksti, 1000);

									});

					// vilauttaa kiitostekstin ja palauttaa saman tekstin
					// takaisin
					function vaihdaTeksti() {

						$("#kiitos").fadeOut(function() {
							$(this).text("Anna fiilis!").fadeIn("fast");
							$("#kiitos").css({
								"font-weight" : "normal",
								"font-size" : "40px",
								"color" : "black"
							});
							$('.fiilis').prop("disabled", false);
						});
						$(".fiilis").fadeIn("slow");
						$("#numerorivi").fadeIn("slow");

					}

					// näyttää muuttujien arvot sivulla
					$('#tulokset').click(function() {

						if (esilla == 1) {
							$("#tulos").hide();
							esilla = 0;
							$("#tulokset").text("Näytä tulokset");
						} else {
							$("#tulos").show();
							esilla = 1;
							$("#tulokset").text("Piilota tulokset");
						}

					});

					

					// asettaa keksin
					function setCookie(cname, cvalue, exdays) {
						var d = new Date();
						d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
						var expires = "expires=" + d.toUTCString();
						document.cookie = cname + "=" + cvalue + "; " + expires;
					}
					// hakee keksin
					function getCookie(cname) {
						var name = cname + "=";
						var ca = document.cookie.split(';');
						for (var i = 0; i < ca.length; i++) {
							var c = ca[i];
							while (c.charAt(0) == ' ')
								c = c.substring(1);
							if (c.indexOf(name) == 0)
								return c.substring(name.length, c.length);
						}
						return "";
					}

				}); // document.ready lopetus

