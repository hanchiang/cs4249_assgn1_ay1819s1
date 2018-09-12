document.getElementById("consent-form").addEventListener('submit', onSubmit);
const fadeDuration = 400;

function onSubmit(e) {
  console.log('Participant ID: ' + e.target.id.value);
  e.preventDefault();

  $('.consent').hide(fadeDuration);
}
