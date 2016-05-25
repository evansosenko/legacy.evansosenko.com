require 'html-proofer'

desc 'Default task'
task default: :build

desc 'Remove build files with jekyll clean'
task :clean do
  sh(*%w(bundle exec jekyll clean))

  asset_cache = './src/.asset-cache'
  if Dir.exist? asset_cache
    puts " Cleaning #{asset_cache}..."
    FileUtils.remove_entry_secure('src/.asset-cache')
    puts '                    done.'
  else
    puts "Nothing to do for #{asset_cache}."
  end
end

desc 'Generate, optimize, and test a production build of the Jekyll site'
task build: :clean do
  jekyll_config = (ENV['JEKYLL_ENV'] ||= 'production')
  if jekyll_config == 'staging'
    ENV['JEKYLL_ENV'] = 'production'
    jekyll_config = 'staging'
  end

  configs = %W(_config.yml _config.#{jekyll_config}.yml)
  config = configs.map(&YAML.method(:load_file)).reduce(&:merge)

  sh(*%w(npm run vulcanize))
  sh(*%W(bundle exec jekyll build --config #{configs.join(',')}))
  sh(*%w(npm run lint))
  sh(*%w(npm run optimize))

  HTMLProofer.check_directory(
    'dist',
    enforce_https: true,
    check_html: true,
    check_favicon: true,
    assume_extension: true,
    url_ignore: [%r{^#{config['url']}/} => '/'],
    url_swap: { %r{^#{config['baseurl']}/} => '/' }
  ).run
end

desc 'Generate, optimize, and test a staging build of the Jekyll site'
task :staging do
  ENV['JEKYLL_ENV'] = 'staging'
  sh(*%w(bundle exec rake))
end

desc 'CircleCI build task'
task :circleci do
  abort('Aborting: not in CircleCI.') unless ENV['CIRCLECI'].to_s == 'true'

  case ENV['CIRCLE_BRANCH'].to_s
  when ENV['STAGING_BRANCH'].to_s
    sh(*%w(bundle exec rake staging))
  else
    sh(*%w(bundle exec rake))
  end
end

desc 'Start a local Jekyll development server'
task dev: :clean do
  spawn(*%w(bundle exec jekyll serve --host 0.0.0.0))
end

# Spawn a server and kill it gracefully when interrupt is received.
def spawn(*cmd)
  puts cmd.join(' ')
  pid = Process.spawn(*cmd)
  switch = true
  Signal.trap 'SIGINT' do
    Process.kill(:QUIT, pid) && Process.wait
    switch = false
  end
  sleep 0.1 while switch
end
