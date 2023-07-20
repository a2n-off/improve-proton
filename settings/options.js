/**
 * a small wrapper for the error, throw a `console.error`
 * @param error error message in string
 */
function onError(error) {
    console.error(`IPP - on error: ${error}`);
}

/**
 * set the value to the input via the given parameter and selector
 * @param result result of the `browser.storage.sync.get`
 * @param selector the id of the input without #
 */
function setCurrentChoice(result, selector) {
    document.querySelector(`#${selector}`).checked = result[selector] === 'true';
}

/**
 * save the value of the option when the user it the submit button
 * @param e
 */
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        label: document.querySelector('#label').checked.toString(),
        premium: document.querySelector('#premium').checked.toString(),
    });
}

/**
 * init the option when the settings page is loaded
 */
function restoreOptions() {
    let gettingLabel = browser.storage.sync.get('label');
    let gettingPremium = browser.storage.sync.get('premium');
    gettingLabel.then((result) => {
        setCurrentChoice(result, 'label');
    }, onError);
    gettingPremium.then((result) => {
        setCurrentChoice(result, 'premium');
    }, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
