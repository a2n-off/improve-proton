/**
 * a small wrapper for the error, throw a `console.error`
 * @param error error message in string
 */
function onPremiumError(error) {
    console.error(`IPP - on error: ${error}`);
}

/**
 * find the button and remove it and disconnect the observer
 * @param observerRPBTN the observer, here for shutting it off after the work is done
 */
const findAndDestroy = (observerRPBTN) => {
    const element = document.getElementsByClassName('topnav-list');
    if (element.length > 0 && element[0]) {
        console.info('RPBTN - target area found', element[0]);
        const e = document.querySelectorAll('[data-testid="cta:special-offer"]');
        console.info('RPBTN - target found', e);
        if (e.length > 0) {
            e[0].style.display = 'none';
            observerRPBTN.disconnect();
            console.info('RPBTN - target neutralised, observer disconnected');
        } else {
            console.warn('RPBTN - no target found');
        }
    }
}

/**
 * set up and enable the observer
 */
function enablePremiumObs() {
    const observerRPBTN = new MutationObserver(() => findAndDestroy(observerRPBTN));
    observerRPBTN.observe(document.body, {childList: true, subtree: true});
}

/**
 * grant clearance of the setting say so
 */
function clearanceForPremium() {
    browser.storage.sync.get('premium').then((value) => {
        if (value.premium === 'false') return;
        enablePremiumObs();
    }, onPremiumError)
}

clearanceForPremium();
