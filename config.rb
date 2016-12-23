ENV['WEBPACK_ENV'] ||= (build? ? 'build' : 'development')

require 'pry'
require 'nokogiri'
require "lib/image_helpers"
helpers ImageHelpers

configure :development do
  activate :livereload
end

activate :minify_html
page "/contact/mailer.php", :directory_index => false

activate :external_pipeline,
         name: :webpack,
         command: build? ?
           "WEBPACK_ENV=#{ENV.fetch('WEBPACK_ENV')} ./node_modules/webpack/bin/webpack.js --bail -p" :
           "WEBPACK_ENV=#{ENV.fetch('WEBPACK_ENV')} ./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
         source: ".tmp/dist",
         latency: 1

set :css_dir,    'assets/styles'
ignore           '**/*.scss'
set :js_dir,     'assets/scripts'
ignore           'assets/scripts/*/*.js'
ignore           'assets/scripts/main.js'
set :images_dir, 'assets/images'

activate :directory_indexes

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'go99.canaryprint.ca'
  s3_sync.region                     = 'us-west-2'
  s3_sync.aws_access_key_id          = 'REDACTED: Use .s3_sync file with info in it'
  s3_sync.aws_secret_access_key      = 'REDACTED: Use .s3_sync file with info in it'
  s3_sync.delete                     = true
  s3_sync.prefer_gzip                = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false
  s3_sync.prefix                     = ''
  s3_sync.version_bucket             = false
end
