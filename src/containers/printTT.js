export default function printTT(name, table) {
  let html = `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link
			rel="stylesheet"
			href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
			integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
			crossorigin="anonymous"
			/>
		</head>
		<body>
			<div>
				<h4 class="text-center">${name}</h4>
			</div>
			${table}
		</body>
	</html>`;

  var w = window.open("", "timetable", "resizable=1");
  w.moveTo(0, 0);
  w.resizeTo("100%", "100%");
  w.document.writeln(html);
  w.document.close();

  // Print that shit:
  w.print();
}
