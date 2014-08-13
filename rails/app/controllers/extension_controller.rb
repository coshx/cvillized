class ExtensionController < ApplicationController
	def analyze_comment
		commentHtml = params[:commentHtml]
		respond_to do |format|
			format.json { render :json => {replacementHtml: commentHtml + ' modified'} }
		end
	end
end
