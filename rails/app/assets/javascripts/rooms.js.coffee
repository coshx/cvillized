# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
jQuery ->
	$(document).on
		click: ->
			loading_id = '#loading_' + $(this).data('room_id')
			success_message_id = '#success_message_' + $(this).data('follow_statement_id')
			follow_statement_id = '#follow_statement_' + $(this).data('follow_statement_id')
			$(loading_id).show()
			if $(follow_statement_id).val().length > 0
				$.ajax
					type: "POST",
					url: "/add_statement_to_room",
					data: {
						"room_id": $(this).data('room_id'),
						"full_text": $(follow_statement_id).val(),
						"depth": $(this).data('depth'),
						"follow_statement_id": $(this).data('follow_statement_id')
					}
					success: ->
						$(follow_statement_id).val('')
						$(loading_id).hide()
						$(success_message_id).fadeIn().delay(4000).fadeOut('slow')
		, ".add_new_statement_to_room"