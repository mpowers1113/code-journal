/* global data */
/* exported data */

var $photoUrlInput = document.querySelector('#photoUrl');
var $imgElement = document.querySelector('.image-submit');
var $form = document.querySelector('form');
var $title = document.querySelector('#title');
var $textarea = document.querySelector('textarea');
var $journalList = document.querySelector('.journal-list');
var $submitButton = document.querySelector('.submit-button');
var $dataViews = document.querySelectorAll('[data-view]');
var $navItems = document.querySelectorAll('.nav');

// ----------Toggle New Entries ----------

function switchView(viewName) {
  for (var i = 0; i < $dataViews.length; i++) {
    if (viewName === $dataViews[i].getAttribute('data-view')) {
      $dataViews[i].className = 'row hidden';
    } else {
      $dataViews[i].className = 'row';
    }
  }
}

function getViewName(event) {
  var viewName = event.currentTarget.getAttribute('data-view');
  data.view = viewName;
  switchView(viewName);
}

$navItems.forEach(item => item.addEventListener('click', getViewName));

// -------Photo Upload Preview -----------

function photoInputChangeHandler(event) {
  var submittedImg = event.target.value;
  $imgElement.setAttribute('src', submittedImg);
}

$photoUrlInput.addEventListener('input', photoInputChangeHandler);

// --------Form inputs---------------------

function formSubmitHandler(event) {
  event.preventDefault();
  if (data.editing !== null) {
    data.editing.title = $title.value;
    data.editing.notes = $textarea.value;
    data.editing.image = $photoUrlInput.value;
    var editIndex = data.entries.findIndex(array => array.id === data.editing.id);
    data.entries[editIndex] = data.editing;
    window.localStorage.setItem('submissionData', JSON.stringify(data));
    targetJournalEntry.replaceWith(renderJournalEntries(data.editing));
    data.editing = null;

  } else {
    var formSubmissionData = {
      id: data.nextEntryId,
      title: $title.value,
      notes: $textarea.value,
      image: $photoUrlInput.value
    };
    data.nextEntryId++;
    data.entries.unshift(formSubmissionData);
    $journalList.prepend(renderJournalEntries(formSubmissionData));
    $imgElement.setAttribute('src', './images/placeholder-image-square.jpg');
  }
  $form.reset();
}

$submitButton.addEventListener('click', formSubmitHandler);

// ----------Render Journal Entries--------------

function renderJournalEntries(userData) {

  var $newLi = document.createElement('li');
  $newLi.setAttribute('id', userData.id);
  var $newRow = document.createElement('div');
  $newRow.className = 'row';
  $newLi.appendChild($newRow);

  var $newColumn = document.createElement('div');
  $newColumn.className = 'column-half';
  $newRow.appendChild($newColumn);

  var $newImg = document.createElement('img');
  $newImg.setAttribute('src', userData.image);
  $newColumn.appendChild($newImg);

  var $newColumnTwo = document.createElement('div');
  $newColumnTwo.className = 'column-half';
  $newRow.appendChild($newColumnTwo);

  var $newRowTwo = document.createElement('div');
  $newRowTwo.className = 'row icon';
  $newColumnTwo.appendChild($newRowTwo);

  var $titleH1 = document.createElement('h1');
  $titleH1.textContent = userData.title;
  $newRowTwo.appendChild($titleH1);

  var $icon = document.createElement('i');
  $icon.className = 'fas fa-pen nav';
  $icon.setAttribute('data-view', 'entries');
  $icon.addEventListener('click', getViewName);
  $newRowTwo.appendChild($icon);

  var $newRowThree = document.createElement('div');
  $newRowThree.className = 'row';
  $newColumnTwo.appendChild($newRowThree);

  var $newColumnFull = document.createElement('div');
  $newColumnFull.className = 'column-full';
  $newRowThree.appendChild($newColumnFull);

  var $notes = document.createElement('p');
  $notes.textContent = userData.notes;
  $newColumnFull.appendChild($notes);

  return $newLi;

}

// ------------DOM Content Loaded--------------------

function renderDOMContent() {
  switchView(data.view);
  for (var i = 0; i < data.entries.length; i++) {
    var eachEntry = data.entries[i];
    var $entry = renderJournalEntries(eachEntry);
    $journalList.append($entry);
  }
}

window.addEventListener('DOMContentLoaded', renderDOMContent);

// ---------------Edit Entries Handler------------

var targetJournalEntry = null;

function journalListClickHandler(event) {
  if (event.target.nodeName === 'I') {
    targetJournalEntry = event.target.closest('li');
    var targetEntryId = targetJournalEntry.getAttribute('id');
    for (var i = 0; i < data.entries.length; i++) {
      var eachDataEntry = data.entries[i];
      if (Number(targetEntryId) === eachDataEntry.id) {
        $imgElement.setAttribute('src', eachDataEntry.image);
        $title.value = eachDataEntry.title;
        $textarea.value = eachDataEntry.notes;
        $photoUrlInput.value = eachDataEntry.image;

        data.editing = {
          id: eachDataEntry.id,
          title: eachDataEntry.title,
          notes: eachDataEntry.notes,
          image: eachDataEntry.image
        };
      }
    }
  }
}

$journalList.addEventListener('click', journalListClickHandler);

// -------------Edit Form Handler -------------------
