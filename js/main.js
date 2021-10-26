/* global data */
/* exported data */

var $photoUrlInput = document.querySelector('#photoUrl');
var $imgElement = document.querySelector('.image-submit');
var $form = document.querySelector('form');
var $title = document.querySelector('#title');
var $textarea = document.querySelector('textarea');
var $journalList = document.querySelector('.journal-list');
var $entriesButton = document.querySelector('.entries-button');
var $entryForm = document.querySelectorAll('.entry-form');
var $entriesHeader = document.querySelector('.entries-header');

// ----------Toggle New Entries ----------

var newEntryVisible = true;

function toggleNewEntries(event) {
  newEntryVisible = !newEntryVisible;
  if (newEntryVisible === false) {
    for (var i = 0; i < $entryForm.length; i++) {
      var $eachEntryForm = $entryForm[i];
      $eachEntryForm.className = 'column-full entry-form';
      $entriesHeader.className = 'column-full entries-header hidden';
    }
  } else {
    for (var j = 0; j < $entryForm.length; j++) {
      var $eachEntryForm2 = $entryForm[j];
      $eachEntryForm2.className = 'column-full entry-form hidden';
      $entriesHeader.className = 'column-full entries-header';
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
  $journalList.prepend(renderJournalEntries(formSubmissionData));
  $imgElement.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
  toggleNewEntries();
}

$form.addEventListener('submit', formSubmitHandler);

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
  $icon.className = 'fas fa-pen edit';
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

var dataEntries = data.entries;

function renderDOMContent() {
  for (var i = 0; i < dataEntries.length; i++) {
    var eachEntry = dataEntries[i];
    var $entry = renderJournalEntries(eachEntry);
    $journalList.append($entry);
  }
}

window.addEventListener('DOMContentLoaded', renderDOMContent);
