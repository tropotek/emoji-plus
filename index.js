/**
 *
 * Refs:
 * http://www.symbols-n-emoticons.com/p/facebook-emoticons-list.html
 * https://trucchifacebook.com/download/emoji/emoji-facebook.htm
 * http://unicode.org/emoji/charts/full-emoji-list.html
 * https://github.com/iamcal/emoji-data
 */
var self = require('sdk/self');
var cm = require('sdk/context-menu');

var emojiList = [
  {name: 'Smile', ascii: ':)', unified: '1f642'},
  {name: 'Grin', ascii: ':D', unified: '1f603'},
  {name: 'Sad', ascii: ':(', unified: '1f641'},
  {name: 'Cry', ascii: ':\'(', unified: '1f625'},
  {name: 'Tongue Out', ascii: ':P', unified: '1f61b'},
  {name: 'Angel', ascii: 'O:)', unified: '1f607'},
  {name: 'Devil', ascii: '3:)', unified: '1f608'},
  {name: 'Confused', ascii: 'o.O', unified: '1f615'},
  {name: 'Wink', ascii: ';)', unified: '1f609'},
  {name: 'Surprised', ascii: ':O', unified: '1f632'},
  {name: 'Squint', ascii: '-_-', unified: '1f614'},
  {name: 'Angry', ascii: '>:O', unified: '1f621'},
  {name: 'Kiss', ascii: ':*', unified: '1f618'},
  {name: 'Heart', ascii: '<3', unified: '2665'},
  {name: 'Cheerful', ascii: '^_^', unified: '1f604'},
  {name: 'Glasses', ascii: '8-)', unified: '1f913'},
  {name: 'Sunglasses', ascii: '8|', unified: '1f60e'},
  //{name: 'Shark', ascii: '(^^^)', unified: ''},
  {name: 'Robot', ascii: ':|]', unified: '1f916'},
  {name: 'Grumpy', ascii: '>:(', unified: '1f616'},
  //{name: 'Pacman', ascii: ':v', unified: ''},
  {name: 'Unsure', ascii: ':/', unified: '1f627'},
  {name: 'Curly Lips', ascii: ':3', unified: '1f617'},
  {name: 'Blush', ascii: '☺', unified: '1f633'},
  {name: 'Like', ascii: '(y)', unified: '1f44d'},
  {name: 'Poop', ascii: ':poop:', unified: '1f4a9'},
  //{name: 'Penguin', ascii: '<(")', unified: ''},
  {name: 'Peace', ascii: '✌', unified: '270c'},
  {name: 'Sun', ascii: '☀', unified: '2600'},
  {name: 'Cloud', ascii: '☁', unified: '2601'},
  {name: 'Snowflake', ascii: '✳', unified: '2744'},
  {name: 'Coffee', ascii: '☕', unified: '2615'},
  {name: 'Hotplate', ascii: '♨', unified: '2668'},
  {name: 'Envelope', ascii: '✉', unified: '2709'},
  //{name: 'Scissors', ascii: '✂', unified: ''},
  {name: 'Phone', ascii: '☎', unified: '260e'}
];

// Select the emojis to show from the emoji list
var items = [];
for(var i = 0; i < emojiList.length; i++) {
  var em = emojiList[i];
  var img = null;
  items.push(cm.Item({
      label: em.name,
      data: em.ascii,
      image: self.data.url('emojione/'+em.unified+'.png')
    })
  );
}

var menuItem = cm.Menu({
  label: "Insert Emoji",
  image: self.data.url("icon-16.png"),
  context: cm.SelectorContext('input,textarea,[contenteditable]'),
  contentScriptFile: self.data.url("js/textInsert.js"),
  onMessage: function (selectionText) {
    //console.log(selectionText);
  },
  items: items
});

