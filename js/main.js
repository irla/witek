$(function(){
	
	$('h3').prepend(function() { return '<a href="#' + $.trim($(this).text()) + '"><i class="glyphicon glyphicon-paperclip"></i></a> '; } );
	$('h4').prepend(function() { return '<a href="#' + $.trim($(this).text()) + '"><i class="glyphicon glyphicon-pushpin"></i></a> '; } );
	
});