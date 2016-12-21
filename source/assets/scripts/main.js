if (__DEVELOPMENT__) {
  console.log("Running in development mode!");
}

if (__DEBUG__) {
  console.log("Running in debug mode!");
}

if (__BUILD__) {
  console.log("Welcome to Go99!");
}

require('components/feature_detection');
require('pages/index');
require('vendor/remodal.min.js');
