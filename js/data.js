/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// ---------Local Storage Add --------

window.addEventListener('beforeunload', unloadHandler);

function unloadHandler(event) {
  event.preventDefault();
  var userDataJSON = JSON.stringify(data);
  window.localStorage.setItem('submissionData', userDataJSON);
}

var previousUserDataJSON = window.localStorage.getItem('submissionData');
if (previousUserDataJSON !== null) {
  var parsedPreviousUserData = JSON.parse(previousUserDataJSON);
  data = parsedPreviousUserData;
}
