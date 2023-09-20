<html>
<head>
    <title>Tetris</title>
    <style>
      body {
        background: #202028;
        color: #FFF;
        font-family: sans-serif;
        font-size: 2em;
        text-align: center;
      }
      canvas {
        border: solid .3em #5F06A5;
        height: 90vh;
      }
    </style>
</head>
<body>
	<div id="score"></div>
	<div id="timeShow"></div>
	<!--<div id="report"></div>-->
	<form action='tetris_report.php' method='post'>
	<input type='hidden' id='playerScore' name='playerScore' value='before update'>
	<input type='hidden' id='time' name='time' value='before update'>
	
	<input type='submit' value='Submit Score'>
	</form>
	<!--<input id='score' name='score' />-->
	
    <canvas id="tetris" width="240" height="400" />
	<!--https://www.youtube.com/watch?v=H2aW5V46khA&feature=emb_logo-->
    <script src="tetris.js"></script>
</body>
</html>