$(function(){
	
	$('h3').prepend(function() { return '<a href="#' + $.trim($(this).text()) + '"><i class="glyphicon glyphicon-paperclip"></i></a> '; } );
	$('h4').prepend(function() { return '<a href="#' + $.trim($(this).text()) + '"><i class="glyphicon glyphicon-pushpin"></i></a> '; } );
	
	var $sidebar = $('<ul class="nav nav-1">');
	var $article = $('#article');
	
	var structure = [];
	var prev = '';
	var addToMenu = function($hs, level, $appendTo) {
		if (level > 6) {
			return;
		}
		if ($hs.length > 0) {
			$.each($hs, function(){
				var $li = $('<li>');
				$li.append($('<a>' + $(this).text() + '</a>'));
				$appendTo.append($li);
				addToMenu()
			});
		} else {
			var $li = $('<li>');
			addToMenu(null, level + 1, $li);
		}
	};
	
	addToMenu($article.find('h1'), 1, $sidebar);
});