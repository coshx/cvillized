# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
jQuery ->
	$(document).on
		click: ->
			loading_id = '#loading_' + $(this).data('room_id')
			success_message_id = '#success_message_' + $(this).data('statement_id')
			$(loading_id).show()
			if $("#initial_statement").val().length > 0
				$.ajax
					type: "POST",
					url: "/add_statement_to_room",
					data: {
						"room_id": $(this).data('room_id'),
						"full_text": $("#initial_statement").val(),
						"depth": 1
					}
					success: ->
						$("#initial_statement").val('')
						$(loading_id).hide()
						$(success_message_id).fadeIn().delay(4000).fadeOut('slow')
		, ".add_new_statement_to_room"