# Overrides the gist markup added by Jekyll's gist Liquid tag
# to support loading GitHub Gists asynchronously using gist-async.coffee from
# https://gist.github.com/razor-x/8288761
module Jekyll
  class GistTag
    def gist_script_tag(gist_id, filename = nil)
      file_data_attr = filename.empty? ? '' : %Q{ data-gist-file="#{filename}"}

      # Append additional markup to this string that will be replaced on gist load
      inner = ''

      file_str = filename.empty? ? '' : " #{filename} from"
      href = %Q{href="https://gist.github.com/#{gist_id}"}
      text = %Q{#{file_str} gist #{gist_id}}

      inner << %Q{<span class="fi-social-github"></span>}
      inner << %Q{<a #{href}><code>#{text}</code></a>}

      %Q{<div class="gist" data-gist="#{gist_id}"#{file_data_attr}>#{inner}</div>}
    end
  end
end
