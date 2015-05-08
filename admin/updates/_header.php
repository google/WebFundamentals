<html>
	<head>
		<title>Updates Admin</title>
		<link rel="stylesheet" href="style.css">
		<meta charset="UTF-8">
	</head>
	<body>

	<?php

		include('lib/functions.php');

		$updates = getUpdates();
		$total_count = count($updates);
		$unpublished_count = 0;

		foreach ($updates as $key => $update) {
			
			$published = $update['page']->fetch('published') == "true";
			if(!$published) {
				$unpublished_count++;
			}

		}

	?>

	<header>
		<div class="container">
			<h1>Updates CMS</h1>
		</div>
	</header>

	<div class="container">

		<div class="menu">
			<ul>
				<li><a href="index.php">All (<?= $total_count ?>)</a></li>
				<li><a href="index.php?filter=unpublished">Drafts (<?= $unpublished_count ?>)</a></li>
				<li class="new"><a href="new.php">New</a></li>
			</ul>
		</div>

		<div class="main">