Template.registroConejita.rendered = function () {
	this.$("input[name=plan]").on('click', function(){
		
		// cambiamos estados radio button
		$("input[name=plan]").parent().css("background-color", "none");
		$(this).parent().css("background-color", "rgb(239, 42, 42)");

		// cambiamos textos.
		$(".plan1, .plan2").hide();
		$("."+$(this).val()).show();

		$("input[name=opcion]").parent().find("label").css("background-color", "none");
	});

	this.$(".caja_text_opcion label").on('click', function(){
		
		// cambiamos estados radio button
		$("input[name=opcion]").parent().find("label").css("background-color", "none");
		$(this).css("background-color", "rgb(239, 42, 42)");

	});
	
}

Template.registroConejita.events({
  'submit form': function(e) {
    e.preventDefault();

    if($(e.target).find('[name=pass]').val() != $(e.target).find('[name=rpass]').val()){
    	return alert("Las contraseñas no coinciden.");
    }

    var foto = $('[name=fotoPro]').prop('checked');
    var video = $('[name=videoPro]').prop('checked');

    var conejita = {
		plan: $(e.target).find('[name=plan]').val(),
		opcion: $(e.target).find('[name=opcion]').val(),
		foto: foto,
		video: video,
		nombre: $(e.target).find('[name=nick]').val(),
		telefono: $(e.target).find('[name=fono]').val(),
		email: $(e.target).find('[name=mail]').val(),
		password: $(e.target).find('[name=pass]').val(),
    }

    Session.set("datos", conejita);

    Router.go('/unirme2');
  }
});