<?php
include('_header.php');

require_once 'importers/' . $_GET['source'] . '.php';

$post = call_user_func($_GET['source'] . '_get', $_GET['url']);

# Extract and store the assets found in the tip
call_user_func($_GET['source'] . '_extract', $post);

?>

<form action="new.php" method="post">

	<input type="hidden" name="published" value="false">
	<input type="hidden" name="type" value="<?= $post->get('type') ?>">
	<input type="hidden" name="product" value="<?= $post->get('product') ?>">
				
	<input type="hidden" id="title" name="title" value="<?= $post->get('title') ?>">	
	<input type="hidden" id="description" name="description" value="<?= $post->get('description') ?>">
	<input type="hidden" id="featured-image" name="featured-image" value="<?= $post->get('featured-image') ?>">
	<input type="hidden" id="author" name="author" value="<?= $post->get('author') ?>">
	<input type="hidden" id="date" name="date" value="<?= $post->get('date') ?>">
	<input type="hidden" id="tags" name="tags" value="">
	<input type="hidden" id="source_name" name="source_name" value="<?= ${$post->get('source') . "_title"} ?>">
	<input type="hidden" id="source_url" name="source_url" value="<?= $_GET['url'] ?>">
	<textarea name="content" id="content"><?= htmlentities($post->get('content'), ENT_QUOTES, "UTF-8") ?></textarea>

</form>

<script>
	document.forms[0].submit();
</script>

<?php
include('_footer.php');
?>

