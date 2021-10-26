/* global data */
/* exported data */

var $photoUrlInput = document.querySelector('#photoUrl');
var $imgElement = document.querySelector('.image-submit');
var $form = document.querySelector('form');
var $title = document.querySelector('#title');
var $textarea = document.querySelector('textarea');
var $journalList = document.querySelector('.journal-list');
var $entriesButton = document.querySelector('.entries-button');
var $dataViewEls = document.querySelectorAll('[data-view]');

// ----------Toggle New Entries ----------

var newEntryVisible = true;

function toggleNewEntries(event) {
  newEntryVisible = !newEntryVisible;
  if (newEntryVisible === false) {
    for (var i = 0; i < $dataViewEls.length; i++) {
      var $eachDataViewEl = $dataViewEls[i];
      var $eachDataViewElClass = $dataViewEls[i].getAttribute('class');
      if ($eachDataViewElClass === 'row hidden') {
        $eachDataViewEl.setAttribute('class', 'row');
      } else {
        $eachDataViewEl.className = 'row hidden';
      }
    }
  }
}

$entriesButton.addEventListener('click', toggleNewEntries);

// -------Photo Upload Preview -----------

function photoInputChangeHandler(event) {
  var submittedImg = event.target.value;
  $imgElement.setAttribute('src', submittedImg);
}

$photoUrlInput.addEventListener('change', photoInputChangeHandler);

// --------Form inputs---------------------

function formSubmitHandler(event) {
  event.preventDefault();
  var formSubmissionData = {
    id: data.nextEntryId,
    title: $title.value,
    notes: $textarea.value,
    image: $photoUrlInput.value
  };
  data.nextEntryId++;
  data.entries.unshift(formSubmissionData);
  $journalList.prepend(renderJournalEntry(formSubmissionData));
  $imgElement.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
  toggleNewEntries();
}

$form.addEventListener('submit', formSubmitHandler);

// ----------Render Journal Entries--------------

function renderJournalEntry(userData) {

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

var dataEntries = data.entries;

function renderDOMContent() {
  for (var i = 0; i < dataEntries.length; i++) {
    var eachEntry = dataEntries[i];
    var $entry = renderJournalEntry(eachEntry);
    $journalList.append($entry);
  }
}

window.addEventListener('DOMContentLoaded', renderDOMContent);
