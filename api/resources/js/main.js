//SMILEAPPLICATION CODE BELOW

$(document).ready(function() {
	
			
					

					// initial values
					var allpoints = 0;
					var votes = 0;
					var average = 0;
					var shown = 0;
					var points1 = 0;
					var points2 = 0;
					var points3 = 0;
					var points4 = 0;
					var points5 = 0;
					// if cookies got values, set them to variables
					average = getCookie("averagecookie");
					points1 = getCookie("points1cookie");
					points2 = getCookie("points2cookie");
					points3 = getCookie("points3cookie");
					points4 = getCookie("points4cookie");
					points5 = getCookie("points5cookie");
					allpoints = getCookie("allpointscookie");
					votes = getCookie("votescookie");
					name = getCookie("namecookie");

					$("#result").html(
							"Grades given: " + votes
									+ "<br><br> Average of the grades: "
									+ average + "<br> <br> Grade 1 votes: " + points1
									+ "<br> Grade 2 votes: " + points2 + "<br> Grade 3 votes: " + points3
									+ "<br> Grade 4 votes: " + points4 + "<br> Grade 5 votes: " + points5);

					$("#result").hide();

					// adds feeling, depending on the value of the button
					$('.feeling')
							.click(
									function() {

										$('.feeling').prop("disabled", true);

										allpoints = Number(allpoints)
												+ Number($(this).val());

										if (Number($(this).val()) === 1) {
											points1 = Number(points1) + 1;

										} else if (Number($(this).val()) === 2) {
											points2 = Number(points2) + 1;
										} else if (Number($(this).val()) === 3) {
											points3 = Number(points3) + 1;
										} else if (Number($(this).val()) === 4) {
											points4 = Number(points4) + 1;
										} else if (Number($(this).val()) === 5) {
											points5 = Number(points5) + 1;
										}
										$(".feeling").hide();
										$("#numberrow").hide();
										$(this).show();

										votes = Number(votes) + 1

										$("#thanks").html("Thank you!").fadeIn(
												"fast");
										$("#thanks").css({
											"font-weight" : "bold",
											"font-size" : "80px",
											"color" : "green"
										});

										average = allpoints / votes;
										average = average.toFixed(2);

										setCookie("averagecookie", average,
												365);
										setCookie("votescookie", votes, 365);
										setCookie("points1cookie", points1,
												365);
										setCookie("points2cookie", points2,
												365);
										setCookie("points3cookie", points3,
												365);
										setCookie("points4cookie", points4,
												365);
										setCookie("points5cookie", points5,
												365);
										setCookie("allpointscookie",
												allpoints, 365);

										$("#result")
												.html(
														"Grades given: "
																+ votes
																+ "<br><br> Average of the grades: "
																+ average
																+ "<br> <br> Grade 1 votes: "
																+ points1
																+ "<br> Grade 2 votes: "
																+ points2
																+ "<br> Grade 3 votes: "
																+ points3
																+ "<br> Grade 4 votes: "
																+ points4
																+ "<br> Grade 5 votes: "
																+ points5);
										setTimeout(changeText, 1000);

									});

					// shows "thank you"-text and returns the original text
					// back
					function changeText() {

						$("#thanks").fadeOut(function() {
							$(this).text(name).fadeIn("fast");
							$("#thanks").css({
								"font-weight" : "normal",
								"font-size" : "40px",
								"color" : "black"
							});
							$('.feeling').prop("disabled", false);
						});
						$(".feeling").fadeIn("slow");
						$("#numberrow").fadeIn("slow");

					}

					// shows results on page
					$('#results').click(function() {

						if (shown == 1) {
							$("#result").hide();
							shown = 0;
							$("#results").text("Show results");
						} else {
							$("#result").show();
							shown = 1;
							$("#results").text("Hide results");
						}

					});

					//nollaa javascript muuttujien arvot ja keksit
					$('#reset')
							.click(
									function() {

										
										setCookie("averagecookie", "", 365);
										setCookie("votescookie", "", 365);
										setCookie("points1cookie", "", 365);
										setCookie("points2cookie", "", 365);
										setCookie("points3cookie", "", 365);
										setCookie("points4cookie", "", 365);
										setCookie("points5cookie", "", 365);
										setCookie("allpointscookie", "",
												365);

										average = getCookie("averagecookie");
										votes = getCookie("votescookie");
										points1 = getCookie("points1cookie");
										points2 = getCookie("points2cookie");
										points3 = getCookie("points3cookie");
										points4 = getCookie("points4cookie");
										points5 = getCookie("points5cookie");
										allpoints = getCookie("allpointscookie");
										

										$("#result")
												.html(
														"Grades given: "
														+ votes
														+ "<br><br> Average of the grades: "
														+ average
														+ "<br> <br> Grade 1 votes: "
														+ points1
														+ "<br> Grade 2 votes: "
														+ points2
														+ "<br> Grade 3 votes: "
														+ points3
														+ "<br> Grade 4 votes: "
														+ points4
														+ "<br> Grade 5 votes: "
														+ points5);
									});
					

					// sets cookie
					function setCookie(cname, cvalue, exdays) {
						var d = new Date();
						d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
						var expires = "expires=" + d.toUTCString();
						document.cookie = cname + "=" + cvalue + "; " + expires;
					}
					// gets cookie
					function getCookie(cname) {
						var name = cname + "=";
						var ca = document.cookie.split(';');
					    var decodedCookie = decodeURIComponent(document.cookie);
						for (var i = 0; i < ca.length; i++) {
							var c = ca[i];
							while (c.charAt(0) == ' ')
								c = c.substring(1);
							if (c.indexOf(name) == 0)
								return c.substring(name.length, c.length);
						}
						return "";
					}
					// add grade to database
					$('#add').click(
							function() {
								var date = new Date();
								var date = date.getFullYear() + "-"
										+ (date.getMonth() + 1) + "-"
										+ date.getDate();

								var json = {
									"feeling1" : points1,
									"feeling2" : points2,
									"feeling3" : points3,
									"feeling4" : points4,
									"feeling5" : points5,
									"average" : average,
									"votes" : votes,
									"name" : name,
									"date" : date
								};

								$.ajax({
									url : "/votes",
									data : JSON.stringify(json),
									type : "POST",

									beforeSend : function(xhr) {
										xhr.setRequestHeader("Accept",
												"application/json");
										xhr.setRequestHeader("Content-Type",
												"application/json");
									}
								});
								console.log('Success: ' + "data added");
//								console.log(JSON.stringify(data));
								alert("results added to database");
							});

				}); // document.ready ends