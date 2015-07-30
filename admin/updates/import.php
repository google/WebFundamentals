<?php
include('_header.php');
?>

<h2>Blogs across the web</h2>

<table>
	<tr>
		<th>Type</th>
		<th>Title</th>
		<th>Author</th>
		<th>Date</th>
		<th>Category</th>
		<th>Product</th>
		<th>Import</th>
	</tr>

	<?php

	#
	# Include all custom scrapers and fetch posts, then combine
	#
	$posts = array();

	$d = dir("importers");
	while (false !== ($entry = $d->read())) {
		if(strstr($entry, ".php")) {
			require_once 'importers/' . $entry;
			$entries = call_user_func(str_replace('.php', '', $entry) . "_list");
			$posts = array_merge($posts, $entries);
		}
	}
	$d->close();	


	#
	# Echo out list of all found posts from external sources
	#
	foreach ($posts as $key => $value) {

		foreach ($updates as $key2 => $update) {
			if($update['page']->keyExists('source_url') && ($update['page']->fetch('source_url') == $value->get('url') || $update['page']->fetch('source_url') . "/" == $value->get('url'))) {
				continue 2;
			}
		}

		echo "<tr>";

			echo "<td class='type'><span class='" . $value->get('type') . "'>" . $value->get('type') . "</span></td>";
			echo "<td><a target='_blank' href='" . $value->get('url') . "'>" . $value->get('title') . "</a></td>";
			echo "<td>" . $value->get('author') . "</td>";
			echo "<td>(Unknown)</td>";
			echo "<td>" . $value->get('category') . "</td>";
			echo "<td>" . $value->get('product') . "</td>";
			echo "<td><a href='import_single.php?source=" . urlencode($value->get('source')) . "&url=" . urlencode($value->get('url')) . "' class='button'>Import</a></td>";

		echo "</tr>";

	}


	?>
</table>
			
<?php
include('_footer.php');
?>

