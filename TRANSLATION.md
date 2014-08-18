Translations
============

The base content is in english under the "_en" directory. Translations can be added following the same structure with either a two letter or composite language code: e.g. "_es", "_pt-br". 

To test translations set the lang variabe in the _config.yml. For example, to set the mode to French:

    lang: "fr"

Note the underscore is not required here. 

To ensure the content is built when being released onto developers.google.com, ensure that the langs_available list in _config-devsite.yml is updated to include any new language directories being added. For example, to add French:

    langs_available: ["fr"]


Adding a translation
--------------------

1.  Find the article in the original source langauge
2.  Create the root language code in `src/site` if it does not exist for the langauge your 
    are translating.  For example create `src/site/_es` for Spanish.
3.  Create the article in the same directory hierarchy but under this new directory.
4.  Translate the article
5.  Translate the article YAML metadata 
	a.  Localize the title
	b.  Localize the description
	c.  Localize the introduction
	e.  Localize the notes (if present)
	f.  Loalize the key-takeaways (the TLDR's if present).
6.  Give yourself some credit by adding your details to the contributors file and add your 
    name to the "translators:" property.


Licence
-------

All of our content is Creative Commons 3.0.  Contributions and translations are very much appreciated, however you must sign our Contribution Agreement for the code to be pulled back in to the repository.  

Credit
------

We want to make sure that you get the credit for the articles that you translate.

Add your details to `/src/site/_contributors.yaml` and add `- translator` to the `role` attriute.  We use this information to populate our [contributors page](http://developers.gogole.com/web/fundamentals/resources/contributors) and also to attach your name to each article.  For example:

	paulkinlan:
	  name:
	    given: Paul
	    family: Kinlan
	  org:
	    name: Google
	    unit: Developer Relations
	  country: UK
	  role:
	    - author
	    - engineer
	  homepage: http://paul.kinlan.me
	  google: +PaulKinlan
	  twitter: paul_kinlan
	  email: paulkinlan@google.com
	  description: "Paul is a Developer Advocate"

For each article that you translate add your id to `translators:` property.  For example
    translators:
      - paulkinlan
      - petelepage