class ExtensionController < ApplicationController
	skip_before_filter :verify_authenticity_token, :only => [:analyze_comment]
	layout false

	def analyze_comment
		commentHtml = params[:commentHtml]
		threadId = params[:threadId]
		@replacementHtml = commentHtml
		if commentHtml.include?("pussy")
			@replace_by_poop = true
		end
		# Return the modified comment
		# respond_to do |format|
		# 	format.json { render :json => {replacementHtml: replacementHtml} }
		# end
	end
end
