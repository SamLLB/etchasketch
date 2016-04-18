var fillColor = "black";
var gridSize = 16;

//creates a table for drawing
function generateTable(gridSize){
	gridSize = gridSize || 16;
	$("<table>").appendTo("#drawArea").addClass("drawArea");

	for (var i = 0; i < gridSize; i++) {
		$("<tr>").appendTo(".drawArea");
	}

	for(var n= 0; n < gridSize * 2; n++) {
		$("<td>").appendTo("tr");
	}
}

// trail
function trail() {
	$("td").on("mouseout", function() {
		if ($("#drawArea").hasClass('trail')) {
		var a = $(this);
		a.animate({"backgroundColor": "#d3d6dd"}, 400);
		a.removeClass('colored');
		}
	});
}

//draw
function draw(fillColor) {
	$("#drawArea").on("mouseenter", "td", function(){
		var $this = $(this);
		$this.css("background-color", fillColor);
		$this.addClass("colored");
	});

	while (!$("#drawArea").hasClass("trail")) {
		break;
	}
	trail();
}

function drawChange() {
	$("button").on("click", function() {
		var buttonValue = $(this).data("name");

		switch (buttonValue) {
			// draw in black
			case "drawBlack":
				draw("black");
			break;

			// draw in a random color
			case "drawRandom":
				var randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
				draw(randomColor);
			break;

			// draw in rainbow
			case "drawRainbow":
				$("#drawArea").on("mouseenter", "td", function(){
					fillColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
					var a = $(this);
					a.css("background-color", fillColor);
					a.addClass("colored");
				});
			break;

			// add a trail
			case "trail":
				$("#drawArea").toggleClass('trail');
				draw();
			break;

			// change the size of the grid
			case "lineSize":
				gridSize = prompt("Enter grid size (1-50)");

				if (gridSize >= 1 && gridSize <= 50) {
					$("table").remove();
					generateTable(gridSize);
				}

				else if (gridSize === null) {
					return;
				}

				else {
					alert("Invalid entry");
					return;
				}
				draw();
			break;

			// shake animation and back to original color
			case "shake":
				$('#etchasketch').stop(true, false);

				var toClear = $("#etchasketch td.colored");
				toClear.animate({
					backgroundColor: "#d3d6dd"
					}, 875).removeClass("colored");

				for (var p = 0; p < 8; p++) {
					$('#etchasketch').animate({
						left: "+=15px",
						}, 75, "linear");

					$("#etchasketch").animate({
						left: "-=15px",
						}, 50, "linear");
				}
				break;
		}
	});
}

//calls everything into action when the document is loaded
$(document).ready(function(){
	generateTable();
	draw("black");
	drawChange();
});

