<?php
include('_header.php');
?>

<table>
	<tr>
		<th>&nbsp;</th>
		<th>Title</th>
		<th>Author</th>
		<th>Type</th>
		<th>Date</th>
		<th>Category</th>
		<th>Product</th>
		<th>Permalink</th>
	</tr>

	<?php

	foreach ($updates as $key => $update) {
		
		$published = $update['page']->fetch('published') == "true";

		if(isset($_GET['filter']) && $_GET['filter'] == 'unpublished' && $published) {
			continue;
		}

		echo "<tr>";
		echo "<td><span class='" . ( $published ? "published" : "not-published" ) . "'></span></td>";
		echo "<td><a href='update.php?file=" . $update['url'] . "'>" . $update['page']->fetch('title') . "</a></td>";
		echo "<td>" . implode(', ', $update['page']->fetch('authors')) . "</td>";
		echo "<td class='type'><span class='" . $update['page']->fetch('type') . "'>" . $update['page']->fetch('type') . "</span></td>";
		echo "<td>" . $update['page']->fetch('date') . "</td>";
		
		echo "<td>" . $update['page']->fetch('category') . "</td>";
		echo "<td>" . $update['page']->fetch('product') . "</td>";
		echo "<td><a target='_blank' href='http://localhost:8081/web" . $update['page']->fetch('permalink') . "'>" . $update['page']->fetch('permalink') . "</a></td>";
		echo "</tr>";

	}

	?>
</table>
			
<?php
include('_footer.php');
?>

