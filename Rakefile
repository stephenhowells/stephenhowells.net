require 'yaml'
require 'html-proofer'
CONFIG = YAML.load_file("_config.yml")

# Startup the Jekyll Server
# rake serve
desc 'Run the jekyll dev server'
task :serve do
  system "jekyll serve"
end

# Build the Site
# rake build
desc "Build the site"
task :build do
  system "jekyll build"
end

# Deploy the site via git
# rake deploy["Commit message"]
desc "Deploy the site to a remote git repo"
task :deploy, :message do |t, args|
  message = args[:message]
  if message.nil? or message.empty?
    raise "Please add a commit message."
  end
  system "git add ."
  system "git commit -m \"#{message}\""
  system "git push origin master"
end

# Launch a preview in the browser and start the Jekyll server
# rake preview
desc "Launch a preview of the site in the browser"
task :preview do
  port = CONFIG["port"]
  if port.nil? or port.empty?
    port = 4000
  end
  Thread.new do
    puts "Launching browser for preview..."
    sleep 5
    system "open http://localhost:#{port}/"
  end
  Rake::Task[:serve].invoke
end

# Bump the version number for cahce busting
# rake bump
desc "Bump version number"
task :bump do
  content = IO.read('_data/version.yml')
  content.sub!(/^rev: (\d+)$/) {|v|
      ver = $1.next
      "rev: #{ver}"
  }
  File.open('_data/version.yml','w') do |f|
    f.write content
  end
end

# # rake test
# desc "build and test website"
# task :test do
#   sh "bundle exec jekyll build"
#   HTML::Proofer.new("./_site", {:disable_external=> true, :href_ignore=> ['http://localhost:4000', 'http://stephenhowells.net/404.html'], :verbose => true}).run
# end
#
# # rake mega_test
# desc "build and mega test website"
# task :mega_test do
#   sh "bundle exec jekyll build"
#   HTML::Proofer.new("./_site", {:disable_external=> false, :href_ignore=> ['http://localhost:4000', 'http://stephenhowells.net/404.html'], :verbose => true}).run
# end
#
# # rake deploy_test
# desc "build and test website for deployment"
# task :deploy_test do
#   sh "bundle exec jekyll b -q"
#   HTML::Proofer.new("./_site", {:only_4xx => true, :typhoeus => {:verbose => false, :ssl_verifypeer => false}, :disable_external=> false, :href_ignore=> ['http://localhost:4000', 'http://stephenhowells.net/404.html'], :verbose => true}).run
# end
