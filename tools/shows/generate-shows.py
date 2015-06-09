# /usr/bin/python

from apiclient.discovery import build
from apiclient.errors import HttpError

import logging
import httplib2
import argparse
import sys
from string import Template


def read_file(file_name):
	with open(file_name, "r") as f:
		return f.read()

class YouTube():
	YOUTUBE_API_SERVICE_NAME = "youtube"
	YOUTUBE_API_VERSION = "v3"
	DEVELOPER_KEY = "AIzaSyDY6GPaessyfQiKsliTHjbfylqIMra1yPY"
	api = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
		http=httplib2.Http(), developerKey = DEVELOPER_KEY)
	
	def GetPlaylist(self, id):
		return self.api.playlists().list(part="id,snippet,contentDetails", id=id).execute()
		
	def GetPlayListItems(self, playlistId):
		return self.api.playlistItems().list(part="id,snippet,contentDetails", playlistId=playlistId, maxResults=50).execute()
		
		
class ShowPage():
	
	def __init__(self, playlist_item, template, show = None, collection = None):
		self.playlist_item = playlist_item
		self.page_template = Template(template)
		self.show = show
		self.collection = collection
	
	def generate(self):
		
		snippet = self.playlist_item["snippet"]
		resource = self.playlist_item["contentDetails"]
		self.content = self.page_template.substitute(
			show=self.show,
			collection=self.collection,
			title=snippet["title"],
			description=snippet["description"],
			date=snippet["publishedAt"],
			written_on=snippet["publishedAt"],
			updated_on=snippet["publishedAt"],
			video=resource["videoId"]
		)
	
	def save(self):
		pass
	
if __name__ == "__main__":
	
	parser = argparse.ArgumentParser()
	parser.add_argument("--show", required=True)
	parser.add_argument("--collection", required=True)
	args = parser.parse_args()
	
	yt_api = YouTube()
	
	playlist_items = yt_api.GetPlayListItems("PLOU2XLYxmsII8L540LbY5hdC23cmoZMhV")
	
	show_template = read_file("show.tmpl")
	
	for item in playlist_items["items"]:
		show_page = ShowPage(item, show_template, show=args.show, collection=args.collection)
		show_page.generate()
		print show_page.content
	

	