module ApplicationHelper
  
  def markdown(text)
    options = {
      filter_html:  true,
      hard_wrap:    true,
      link_attributes: { rel: 'nofollow', targe: '_blank'},
      space_after_headers: true,
      fenced_code_blocks: true
    }

    extensions = {
      autolink:     true,
      superscript:  true,
      disable_idented_code_blocks: true
    }

    renderer = Redcarpet::Render::HTML.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end

  def emojify(content)
    h(content).to_str.gsub(/:([\w+-]+):/) do |match|
      if emoji = Emoji.find_by_alias($1)
        %(<img alt="#$1" src="#{image_path("emoji/#{emoji.image_filename}")}" style="vertical-align:middle" width="20" height="20" />)
      else
        match
      end
    end.html_safe if content.present?
  end

  def title(text)
    content_for :title, text
  end

  def meta_tag(tag, text)
    content_for :"meta_#{tag}", text
  end

  def yield_meta_tag(tag, default_text="")
    content_for(:"meta_#{tag}") ? content_for(:"meta_#{tag}") : default_text
  end

end
