$(function(){
	
	var icons = {
		H1: 'briefcase',
		H2: 'list-alt',
		H3: 'pushpin',
		H4: 'paperclip',
		H5: 'pencil',
		H6: 'tag'
	};
	
	var $hs = $('#article').find('h1, h2, h3, h4, h5, h6');
	var $sidebar = $('#sidebar');
	
	$.each($hs, function(){
		var $this = $(this);
		var text = $.trim($this.text());
		var id = text.toLowerCase().replace(/\s/g,'_');
		$this.attr('id', id);
		var tagName = $this.prop('tagName');
		
		$this.html('<a href="#' + text + '"><i class="glyphicon glyphicon-' + icons[tagName] + '"></i></a> ' + text);
		$sidebar.append($('<li class="nav-' + tagName + '"><a href="#' + id + '">' + text + '</a></li>'));
	});
	
	$sidebar.affix({
		offset: {
			top: 236,
			bottom: 0
		}
	});
	
	$('body').scrollspy({ target: '#sidebar-container' });
	
	setTimeout(function(){$('body').scrollspy('refresh');}, 100);
	
});