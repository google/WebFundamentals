<?php
include('_header.php');

if($_POST) {

	$file = buildFile();
	$newFileName = getFileName($_POST['date'], $_POST['title']);

	if(file_exists($updates_dir . $newFileName)) {

		echo "A file with the same title already exists!";

	} else {

		// write new Markdown file
		file_put_contents($updates_dir . $newFileName, $file);
		chmod($updates_dir . $newFileName, 0777);

		echo "<script>location.href = 'update.php?file=". $newFileName ."';</script>";

	}

}

?>

<form action="" method="post">
	<fieldset>
		<legend>Metadata</legend>
		<div>
			<label for="published">Published *</label>
			<div>
				<input type="radio" name="published" value="true"> True
				<input type="radio" name="published" value="false" checked> False
			</div>
		</div>
		<div>
			<label for="type">Type *</label>
			<div>
				<input type="radio" name="type" id="type-news" value="news" checked> News
				<input type="radio" name="type" id="type-tip" value="tip"> Tip
			</div>
		</div>
		<div>
			<label for="product">Product *</label>
			<div>
				<input type="radio" name="product" value="none" checked> None
				<input type="radio" name="product" value="chrome"> Chrome
				<input type="radio" name="product" value="chrome-devtools"> DevTools
				<input type="radio" name="product" value="web-starter-kit"> WSK
				<input type="radio" name="product" value="polymer-starter-kit"> PSK
				<input type="radio" name="product" value="material-design-lite"> MDL
			</div>
		</div>
		<div>
			<label for="title">Title *</label>
			<input type="text" id="title" name="title" value="">
		</div>
		<div id="description-block">
			<label for="description">Description *</label>
			<input type="text" id="description" name="description" value="">
		</div>
		<div id="featured-image-block">
			<label for="featured-image">Featured Image</label>
			<input type="text" id="featured-image" name="featured-image" value="">
		</div>
		<div>
			<label for="author">Author *</label>
			<input type="text" id="author" name="author" value="">
		</div>
		<div>
			<label for="date">Date *</label>
			<input type="date" id="date" name="date" value="">
		</div>
		<div>
			<label for="tags">Tags (Comma separated)</label>
			<input type="text" id="tags" name="tags" value="">
		</div>
		<div>
			<label for="tags">Source Name (i.e. A List Apart)</label>
			<input type="text" id="source_name" name="source_name" value="">
		</div>
		<div>
			<label for="tags">Source URL</label>
			<input type="text" id="source_url" name="source_url" value="">
		</div>

	</fieldset>

	<fieldset>
		<legend>Content</legend>
		<textarea name="content" id="content"></textarea>
	</fieldset>

	<input id="submit" type="submit" value="Save Changes">
</form>


<?php
include('_footer.php');
?>
