var self = require("sdk/self");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
// function dummy(text, callback) {
//   callback(text);
// }
// exports.dummy = dummy;


// var buttons = require('sdk/ui/button/action');
// var tabs = require("sdk/tabs");
//
// var button = buttons.ActionButton({
//   id: "mozilla-link",
//   label: "Visit Mozilla",
//   icon: {
//     "16": "./icon-16.png",
//     "32": "./icon-32.png",
//     "64": "./icon-64.png"
//   },
//   onClick: handleClick
// });
//
// function handleClick(state) {
//   tabs.open("http://www.mozilla.org/");
// }

// http://www.symbols-n-emoticons.com/p/facebook-emoticons-list.html
// https://trucchifacebook.com/download/emoji/emoji-facebook.htm
// http://unicode.org/emoji/charts/full-emoji-list.html
// https://github.com/iamcal/emoji-data

var cm = require("sdk/context-menu");
var emojiList = require("./emoji.json");

//console.log(emojiList);

// var emj1 = cm.Item({
//   label: ":) Smile",
//   data: ":)"
// });
// var emj2 = cm.Item({
//   label: ":D Grin",
//   data: ":D"
// });


// Select the emojis to show from the emoji list
var items = [];
for(var i = 0; i < emojiList.length; i++) {
  var em = emojiList[i];
  if (em.category != 'People') continue;
  if (!em.text) continue;
  var img = null;
  items.push(cm.Item({
      label: em.text + ' ' + em.short_name,
      data: em.text
    })
  );
}

for(var i = 0; i < emojiList.length; i++) {
  var em = emojiList[i];
  if (em.category != 'People') continue;
  if (!em.has_img_emojione) continue;
  var text = em.text;
  if (!text && em.unified)
    text = "\u" + em.unified;     // This needs to be inserting a valid unicode char into the browser not the unicode string
  if (!text) continue;

  items.push(cm.Item({
      label: em.short_name,
      data: text,
      image: self.data.url("emojione/"+em.image)
    })
  );
}




var menuItem = cm.Menu({
  label: "Insert Emoji",
  image: self.data.url("icon-16.png"),
  context: cm.SelectorContext('input,textarea,[contenteditable]'),
  contentScript: ' self.on("click", function (node, data) {  node.value = node.value + data; self.postMessage(node.value); }); ',
  onMessage: function (selectionText) {
    console.log(selectionText);
  },
  items: items
});

