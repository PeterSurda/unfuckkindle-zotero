{
	"translatorID": "73bbdf4d-44a5-4dea-b862-b6bb0b3ebd6b",
	"label": "UnFuckKindle",
	"creator": "Peter Šurda",
	"target": "/cgi-bin/unfuckkindle\\.pl\\?.*mode=file",
	"minVersion": "2.1.9",
	"maxVersion": "",
	"priority": 100,
	"inRepository": false,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2014-05-07 10:32:00"
}

/**
	Copyright (c) 2014 Peter Šurda

        WTFPL: http://www.wtfpl.net/about/
	
*/

function detectWeb(doc, url) {
	return "webpage";
}

function doWeb(doc, url) {
	var item = new Zotero.Item('webpage');
	item.title = ZU.xpathText(doc, '//meta[@name="DC.title"]/@content');
	var author = ZU.xpathText(doc, '//meta[@name="DC.creator"]/@content');
	item.creators.push(ZU.cleanAuthor(author, "author", false));
	item.date = ZU.xpathText(doc, '//meta[@name="DC.date"]/@content');
	item.url = ZU.xpathText(doc, '//meta[@name="DC.identifier"]/@content');
	
	item.attachments.push({
		url: item.url,
		title: 'Snapshot',
		mimeType: 'text/html',
		snapshot: true
	});

	var hbase = '//table[@id="highlights"]/tbody/tr';
	var highlights = doc.evaluate(hbase, doc, null, XPathResult.ANY_TYPE, null);
        var highlight;

	Zotero.debug(highlights);

        while (highlight = highlights.iterateNext()) {
       	        var text =  ZU.xpathText(highlight, './td[2]');
		item.notes.push (text);
        }

	item.complete();
}
