# Profile

application load config from server 

Please change your proxy.conf to your data server

if you want to use your local config "app-core/config.service/"


{
  "ver": "1.01",
  "title": "Innovexa",
  "logo": "/images/innovexa-logo.jpg",
  "logoWidth": "100px",
  "logoHeight": "2em",
  "afterLogin": "http://localhost:4200/app-login",
  "loginUrl": "http://localhost:4200/user/login",
  "profileWhatNextUrl": "http://localhost:49888/application",
  "defaultLanguage": "en",
  "languages": {
    "en": {
      "index": "en",
      "show": true,
      "icon": "/language/flags/GB.png"
    },
    "fr": {
      "index": "fr",
      "show": true,
      "icon": "/language/flags/FR.png"
    },
    "br": {
      "index": "br",
      "show": false,
      "icon": "/language/flags/BR.png"
    }
  }
}
