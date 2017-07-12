var like = 'Great. You\'re welcome to tweet us at ' + 
    '<a href="https://twitter.com/chromedevtools">@ChromeDevTools</a> or start a thread in the ' + 
    '<a href="https://groups.google.com/forum/#!forum/google-chrome-developer-tools">mailing ' + 
    'list</a> if you\'ve got any ideas on how to improve this.';
var dislike = 'Sorry to hear that. Please tweet us at ' + 
    '<a href="https://twitter.com/chromedevtools">@ChromeDevTools</a> or start a thread in the ' + 
    '<a href="https://groups.google.com/forum/#!forum/google-chrome-developer-tools">mailing ' + 
    'list</a> and let us know what\'s wrong with it.';
var feedback = { 
  "category": "DevTools",
  "question": 'What do you think of this change?',
  "choices": [
    {   
      "button": {
        "text": "I Like It" 
      },  
      "response": like,
      "analytics": {
        "label": label
      }   
    },  
    {   
      "button": {
        "text": "I Don't Like It" 
      },  
      "response": dislike,
      "analytics": {
        "label": label,
        "value": 0
      }   
    }   
  ]
};
