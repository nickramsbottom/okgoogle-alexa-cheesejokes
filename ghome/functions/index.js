const functions = require('firebase-functions');
const Assistant = require('actions-on-google').ApiAiAssistant;

exports.cheeseJoke = functions.https.onRequest((req, res) => {
  const questions = [
    'What did the cheese say to itself in the mirror?',
    'What do you call cheese that\'s not yours?',
    'Did you hear about the explosion at the cheese factory?',
    'What kind of cheese do you use to disguise a small horse?',
    'Which hotel do mice stay in?',
    'What is a lion\'s favourite cheese?',
    'What\'s the richest cheese in the world?',
    'Which cheese would you use to coax a bear down from a tree?'
  ];

  const answers = [
    'Halloumi',
    'Nacho cheese',
    'de Brie was everywhere',
    'Mascarpone',
    'The Stilton',
    'Roarquefort',
    'Paris Stilton',
    'Camembert'
  ];

  const assistant = new Assistant({ request: req, response: res });

  function questionHandler(assistant) {
    const randomIndex = Math.floor(Math.random() * (questions.length));
    const message = questions[randomIndex];
    const contextObject = {
      "randomIndex": randomIndex,
    };

    assistant.setContext('index', 1, contextObject);
    assistant.ask(message);
  }

  function answerHandler(assistant) {
    const context = assistant.getContext('index');
    const fetchIndex = context.parameters.randomIndex;
    const answer = answers[fetchIndex];

    assistant.tell(answer);
  }

  const actionMap = new Map();
  actionMap.set('ask', questionHandler);
  actionMap.set('answer', answerHandler);
  assistant.handleRequest(actionMap);
});
