<?php

use Goutte\Client;
use Symfony\Component\DomCrawler\Crawler;

$devtips_title = "DevTips";

function devtips_list() {

	$posts = array();
	$client = new Client();
	$crawler = $client->request('GET', 'https://umaar.com/dev-tips/');

	$crawler->filter('ol li a')->each(function ($node) use (&$posts, &$client) {
		
		$post = new DevTip(array(
			"title" => trim($node->text()),
			"url" => $node->link()->getUri()
		)); 

		$posts[] = $post;	

	});

	return $posts;

}

# This function extracts assets and stores
# them in the proper asset folder
function devtips_extract(DevTip $tip) {

	global $updates_dir;

	$assetPath = getFileName($tip->get('date'), $tip->get('title'));
	$assetPath = str_replace(".markdown", "", $assetPath);
	
	# create new asset directory based on new filename
	if(!file_exists($updates_dir . 'images/' . $assetPath)) {
		mkdir($updates_dir . 'images/' . $assetPath);
		chmod($updates_dir . 'images/' . $assetPath, 0777);
	}

	# Download and store each asset
	$assets = $tip->get('assets');
	$featured = null;
	foreach ($assets as $key => $url) {
		

		if(strpos($url, "/sponsor/") !== false) {
			continue;
		}

		$base = new Net_URL2('https://umaar.com/dev-tips/');
		$abs = $base->resolve($url);
		$dest = $updates_dir . 'images/' . $assetPath . '/' . pathinfo($url)['basename'];

		$content = $tip->get('content');
		$tip->set('content', str_replace($url, '/web/updates/images/' . $assetPath . '/' . pathinfo($url)['basename'], $content));

		if(!$featured) {
			$tip->set('featured-image', '/web/updates/images/' . $assetPath . '/' . pathinfo($url)['basename']);
		}

		if(!file_exists($dest)) {

			set_time_limit(0);
			$fp = fopen ($dest, 'w+');//This is the file where we save the information
			$ch = curl_init(str_replace(" ","%20",$abs));//Here is the file we are downloading, replace spaces with %20
			curl_setopt($ch, CURLOPT_TIMEOUT, 50);
			curl_setopt($ch, CURLOPT_FILE, $fp); // write curl response to file
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_exec($ch); // get curl response
			curl_close($ch);
			fclose($fp);

			// set proper chmod
			chmod($dest, 0777);

		}

	}

}

function devtips_get($url) {

	$tip = new DevTip(array(
		"url" => $url
	));

	$client = new Client();
	$crawler = $client->request('GET', $url);

	$crawler
		->filter('div.dt-content')
		->each(function ($node) use (&$tip) {
			$html = trim($node->html());

			// add line breaks
			$html = str_replace("><", ">\n<", $html);

			// remove aside
			$pos = strpos($html, "<aside");
			if($pos !== false) {
				$html = substr($html, 0, $pos);
			}

			// convert <p>'s to just line breaks
			$html = str_replace("<p>", "\n", $html);
			$html = str_replace("</p>", "\n", $html);

			$tip->set('content', $html);
		});

		

	$crawler
		->filter('h3')
		->each(function ($node) use (&$tip) {
			$tip->set('title', $node->text());
		});

	$sources = $crawler
		->filter('div.dt-content *[src]')
		->extract(array('src'));

	$tip->set('assets', $sources);

	return $tip;

}

class DevTip {

	var $data = array(
		"author" => "umarhansa",
		"type" => "tip",
		"category" => "tools",
		"product" => "chrome-devtools",
		"source" => "devtips",
		"description" => "",
		"featured-image" => ""
	);

	function DevTip($data) {
		$this->data = array_merge($this->data, $data);
		$this->data['date'] = date("Y-m-d");
	}

	function get($key) {
		return $this->data[$key];
	}

	function set($key, $value) {
		return $this->data[$key] = $value;
	}
   
}



