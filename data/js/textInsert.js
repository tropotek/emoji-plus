
var lastfocusedEl = null;

if ((typeof self.on !== 'undefined')) {
  self.on('click', function (node, data) {
    lastfocusedEl = node;

    var cPos = getInputSelection(node);
    insertTextAtCursor(node, data);

    var msg = '';
    msg = node.value + ' - start: ' + cPos.start + ', end: ' + cPos.end;
    self.postMessage(msg);
  });
} else {    // For testing in a html document

  window.addEventListener('load', function () {
    // is in test Html
    var btn = document.getElementById('insertBtn');
    btn.addEventListener('click', function(e) {
      insertTextAtCursor(lastfocusedEl, ';-)');
      this.blur();
    }, false);
  });
  window.addEventListener('load', function () {
    document.addEventListener('click', function (e) {
      var cl = findEditableParent(e.target);
      if (!cl && (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA')) cl = e.target;
      if (cl) lastfocusedEl = cl;
    });
  });
}



function insertTextAtCursor(el, text) {
  var sel, range, content, pos, res;
  if ((typeof el === 'undefined') || el == null) return el;

  if (el.nodeName == 'INPUT' || el.nodeName == 'TEXTAREA') {
    pos = getInputSelection(el);
    content = el.value;
    content = insertStr(content, pos.start, pos.end, text);
    res = insertSpace(content, pos.start, pos.start + text.length);
    content = res.str;
    pos.end = res.end;
    // Set cursor
    el.value = content;
    el.setSelectionRange(pos.end, pos.end);
    el.focus();

  } else if (window.getSelection && isEditable(el) && (findEditableParent(window.getSelection().anchorNode) == el)) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      pos = {start: range.startOffset, end: range.startOffset};
      content = el.textContent;
      content = insertStr(content, pos.start, pos.end, text);
      res = insertSpace(content, pos.start, pos.start + text.length);
      content = res.str;
      pos.end = res.end;
      // Set cursor
      el.textContent = content;
      range.setStart(el.childNodes[0], pos.end);
      range.collapse(true);
      el.focus();
    }
  }
}

function insertSpace(str, start, end) {
  if (start == 0) {
    if (end != str.length) {
      str = insertStr(str, end, end, ' ');
      end = end + 1;
    }
  } else {
    if (str.charAt(start - 1) != ' ') {
      str = insertStr(str, start, start, ' ');
      end = end + 1;
    }
    if (str.charAt(end) != ' ') {
      str = insertStr(str, end, end, ' ');
      end = end + 1;
    }
  }
  return {str: str, end: end};
}

function insertStr(str, start, end, newSubStr) {
  return str.slice(0, start) + newSubStr + str.slice(end);
}

function findEditableParent(el) {
  if ((typeof el === 'undefined') || el == null) return el;
  if (isEditable(el)) return el;
  while ((el = el.parentElement) && !isEditable(el));
  return el;
}

function isEditable(el) {
  if (el == null || (typeof el === 'undefined') || (typeof el.attributes === 'undefined')) return false;
  var found = false;
  Array.prototype.slice.call(el.attributes).forEach(function(item) {
    //console.log(item.name + ': '+ item.value);
    if (item.name == 'contenteditable') {
      found = true;
      return false;
    }
  });
  return found;
}

function getInputSelection(el) {
  var start = 0, end = 0, normalizedValue, range,
    textInputRange, len, endRange;

  if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    if ((typeof document.selection !== 'undefined')) {
      range = document.selection.createRange();

      if (range && range.parentElement() == el) {
        len = el.value.length;
        normalizedValue = el.value.replace(/\r\n/g, "\n");

        // Create a working TextRange that lives only in the input
        textInputRange = el.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());

        // Check if the start and end of the selection are at the very end
        // of the input, since moveStart/moveEnd doesn't return what we want
        // in those cases
        endRange = el.createTextRange();
        endRange.collapse(false);

        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          start = end = len;
        } else {
          start = -textInputRange.moveStart("character", -len);
          start += normalizedValue.slice(0, start).split("\n").length - 1;
          if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
            end = len;
          } else {
            end = -textInputRange.moveEnd("character", -len);
            end += normalizedValue.slice(0, end).split("\n").length - 1;
          }
        }
      }
    }
  }
  return {start: start, end: end};
}

// function findClosest(el, cls) {
//   while ((el = el.parentElement) && !el.classList.contains(cls));
//   return el;
// }

// function clearSelection() {
//   if ( document.selection ) {
//     document.selection.empty();
//   } else if ( window.getSelection ) {
//     window.getSelection().removeAllRanges();
//   }
// }