<?php

include('frontmatter.php');
include('Net/URL2.php');

date_default_timezone_set('America/Los_Angeles');

$updates_dir = "../../src/_langs/en/updates/";

function getUpdates() {

	global $updates_dir;

	$updates = array();

	$d = dir($updates_dir);
	while (false !== ($entry = $d->read())) {
		if(preg_match("/\d{4}\-/", $entry)) {

			$page = new FrontMatter($updates_dir . $entry);
			$updates[] = array(
				'url' => $entry,
				'page' => $page
			);

		}
		
	}
	$d->close();

	return $updates;
	
}

function getUpdate($fileName) {

	global $updates_dir;

	$page = new FrontMatter($updates_dir . $fileName);
	$update = array(
		'url' => $fileName,
		'page' => $page
	);

	return $update;

}

function buildFile() {

	$updated_date = (strtotime($_POST['date']) > time() ? $_POST['date'] : date("Y-m-d"));

	$content = array(
		'rss' => false,
		'layout' => 'update',
		'published' => $_POST['published'] == 'true' ? true : false,
		'title' => $_POST['title'],
		'date' => $_POST['date'],
		'article' => array(
			'written_on' => $_POST['date'],
			'updated_on' => $updated_date
		),
		'authors' => array($_POST['author']),
		'collection' => 'updates',
		'type' => $_POST['type'],
		'category' => ($_POST['product'] == 'none' || $_POST['product'] == 'chrome') ? 'generic' : 'tools',
	);

	$content['product'] = $_POST['product'];

	if($_POST['tags']) {
		$content['tags'] = preg_split("/[\s,]+/", $_POST['tags']);
	}

	if($_POST['description']) {
		$content['description'] = $_POST['description'];
	}

	if($_POST['featured-image']) {
		$content['featured-image'] = $_POST['featured-image'];
	}

	if($_POST['source_name']) {
		$content['source_name'] = $_POST['source_name'];
	}

	if($_POST['source_url']) {
		$content['source_url'] = $_POST['source_url'];
	}

	if(isset($_POST['tb1_heading'])) {
		$content['teaserblocks'] = array(
			array(
				'heading' => $_POST['tb1_heading'],
				'description' => $_POST['tb1_description'],
				'image' => $_POST['tb1_image'],
			),
			array(
				'heading' => $_POST['tb2_heading'],
				'description' => $_POST['tb2_description'],
				'image' => $_POST['tb2_image'],
			),
			array(
				'heading' => $_POST['tb3_heading'],
				'description' => $_POST['tb3_description'],
				'image' => $_POST['tb3_image'],
			)
		);
	}

	$content['permalink'] = '/updates/' . str_replace('-', '/', $_POST['date']) . '/' . slugify($_POST['title']) . '.html';

	$file = yaml_emit($content, YAML_UTF8_ENCODING);

	// we need to replace the weird ... block at bottom with a valid front matter ---
	$file = str_replace('...', '---', $file);

	// additionally, Jekyll doesn't like dates as string, so fix
	$file = str_replace('"'.$_POST['date'].'"', $_POST['date'], $file);
	$file = str_replace('"'.$updated_date.'"', $updated_date, $file);

	return $file . $_POST['content'];

}

function getFileName($date, $title) {
	return $date . '-' . slugify($title) . '.markdown';
}

function slugify($text) { 
  // replace non letter or digits by -
  $text = preg_replace('~[^\\pL\d]+~u', '-', $text);

  // trim
  $text = trim($text, '-');

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // lowercase
  $text = strtolower($text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  if (empty($text))
  {
    return 'n-a';
  }

  return $text;
}