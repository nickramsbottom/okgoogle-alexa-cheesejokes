'use strict';

const Alexa = require('alexa-sdk');

const states = {
  CALL: '_CALL',
  REPLY: '_REPLY',
};

const jokes = {
  calls: [
    'What did the cheese say to itself in the mirror?',
    'What do you call cheese that\'s not yours?',
    'Did you hear about the explosion at the cheese factory?',
    'What kind of cheese do you use to disguise a small horse?',
    'Which hotel do mice stay in?',
    'What is a lion\'s favourite cheese?',
    'What\'s the richest cheese in the world?',
    'Which cheese would you use to coax a bear down from a tree?'
  ],
  replies: [
    'Halloumi',
    'Nacho cheese',
    'de Brie was everywhere',
    'Mascarpone',
    'The Stilton',
    'Roarquefort',
    'Paris Stilton',
    'Camembert'
  ]
};

const strings = {
  WELCOME_MESSAGE: 'some message',
  STOP_MESSAGE: 'Goodbye!',
  INSTRUCTIONS: 'instructions',
};

const newSessionHandlers = {
  'NewSession': function () {
    this.handle.state = states.CALL;
  },

  'AMAZON.CancelIntent': function () {
    this.emit(':tell', strings.STOP_MESSAGE);
  },

  'AMAZON.StopIntent': function () {
    this.emit(':tell', strings.STOP_MESSAGE);
  },
};

const callHandlers = Alexa.CreateStateHandler(states.CALL, {
  'NewSession': function () {
    this.emit('NewSession');
  },

  'tellJoke': function () {
    const qsArr = jokes.calls;

    this.handler.state = states.REPLY;

    const rndIndex = Math.floor(Math.random() * qsArr.length);
    this.attributes.index = rndIndex;

    const question = qsArr[rndIndex];

    this.emit(':ask', question);
  },

  'Unhandled': function () {
    this.emit(':ask', strings.INSTRUCTIONS);
  },

  'AMAZON.HelpIntent': function () {
    this.emit(':ask', strings.INSTRUCTIONS);
  },

  'AMAZON.CancelIntent': function () {
    this.emit(':tell', strings.STOP_MESSAGE);
  },

  'AMAZON.StopIntent': function () {
    this.emit(':tell', strings.STOP_MESSAGE);
  },
});

const replyHandlers = Alexa.CreateStateHandler(states.REPLY, {
  'tellReply': function () {
    const index = this.attributes.index;
    const repsArr = jokes.replies;
    this.emit(':tell', repsArr[index]);
  },

  'AMAZON.HelpIntent': function () {
    this.emit(':ask', strings.INSTRUCTIONS);
  },

  'AMAZON.CancelIntent': function () {
    this.emit(':tell', strings.STOP_MESSAGE);
  },

  'AMAZON.StopIntent': function () {
    this.emit(':tell', strings.STOP_MESSAGE);
  },
});

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(newSessionHandlers, callHandlers, replyHandlers);
  alex.execute();
}
