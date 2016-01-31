guard 'livereload',
      port: YAML.load_file('_config.yml')['livereload']['port'] do
  watch %r{dist/.+}
end

guard 'shell' do
  watch 'modernizr-config.json' do
    `npm run modernizr`
  end

  watch %r{src/_assets/stylesheets/.+\.scss$} do |m|
    eager "bundle exec scss-lint #{m.first}"
  end
end
