$(document).ready(function() {
	/* MAIN MENU */
	$('#main-menu > li:has(ul.sub-menu)').addClass('parent');
	$('ul.sub-menu > li:has(ul.sub-menu) > a').addClass('parent');

	$('#menu-toggle').click(function() {
		$('#main-menu').slideToggle(300);
		return false;
	});

	$(window).resize(function() {
		if ($(window).width() > 700) {
			$('#main-menu').removeAttr('style');
		}
	});
	
	try{
		cargarGaleria();
	}catch(err){
	
	}
});

function cargarGaleria(image){
	
	var contenedor = $("#contenedorGaleria");
	var html="";
	var ruta = "img/galeria/";
	if(image!=undefined){		
		contenedor.hide();
		contenedor.fadeIn('slow');
		var foto = image.split("/");
		html = ruta+foto[2];
		contenedor.attr("src", html);
	}
}	