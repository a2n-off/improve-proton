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
 * get the value from the sync storage, if the value exist on the storage we use it else we set the value to true
 * "true" is the default value when the addon is load the first time
 * @param selector
 */
function getParamAndApply(selector) {
    browser.storage.sync.get(selector)
        .then((result) => {
            if (result[selector]) {
                setCurrentChoice(result, selector);
            } else {
                const defaultObject = {};
                defaultObject[selector] = 'true';
                setCurrentChoice(defaultObject, selector);
            }
        })
        .catch((e) => onError(e));
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
    console.info('IPP - restore options');
    getParamAndApply('label');
    getParamAndApply('premium');
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
