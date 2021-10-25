/* global data */
/* exported data */

var $photoUrlInput = document.querySelector('#photoUrl');
var $imgElement = document.querySelector('.image-submit');
var $form = document.querySelector('form');
var $title = document.querySelector('#title');
var $textarea = document.querySelector('textarea');

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
  $imgElement.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', formSubmitHandler);
