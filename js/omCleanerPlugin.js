/**
 * Plugin for clean HTML code content
 * @author Roman Ozana <ozana@omdesign.cz>
 */
var omCleaner = (function () {

	tinymce.create('tinymce.plugins.omCleaner', {

		init: function (editor, url) {


			editor.addButton('omCleaner', {
						title: 'HTML code cleaner',
						cmd: 'omCleaner',
						image: url + '/cleaner.png'
					}
			);

			editor.addCommand('omCleaner', function () {
				var $ = editor.getWin().parent.jQuery; // get jQuery
				var content = tinyMCE.activeEditor.getContent();
				var $content = $('<div/>', {html: content});

				// iterate over all element
				$('*', $content).each(function () {
					// remove style, id, class attributes
					$(this).removeAttr('style id class');

					// unwrap content from span, div
					if ($(this).is('div')) $(this).contents().unwrap();
					if ($(this).is('span')) $(this).contents().unwrap();
				});

				tinyMCE.activeEditor.setContent($content.html());
			});
		},

		getInfo: function () {
			return {
				longname: "HTML code cleaner",
				author: "Roman Ožana",
				authorurl: "https://www.omdesign.cz/",
				infourl: "https://www.omdesign.cz/",
				version: "1.0"
			};
		}
	});

	tinymce.PluginManager.add('omCleaner', tinymce.plugins.omCleaner);

})();
