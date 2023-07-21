/**
 * a small wrapper for the error, throw a `console.error`
 * @param error error message in string
 */
function onLabelError(error) {
    console.error(`IPP - on error: ${error}`);
}

/**
 * move the label to the right place
 * @param observerML the observer, here for shutting it off after the work is done
 */
function moveTargetToLz(observerML) {
    const target = document.getElementsByClassName('label-stack');
    console.info('ML -', target.length, 'target found');

    if (target.length > 0) {
        console.info('ML - disconnect the observer before treating the target');
        observerML.disconnect();

        for (let i = 0; i < target.length; i++) {
            if (i === 0) console.info('ML - loop on target launch');

            console.info('ML - moving target', i, 'to lz');
            target[i].style.marginRight = '1rem';
            let lz = target[i].parentElement;
            lz.insertBefore(target[i], lz.children[2]);

            if (i === target.length - 1) {
                console.info('ML - loop on target done');
                console.info('ML - re-enabling the observer');
                enableLabelObs();
            }
        }
    }
}

/**
 * set up and enable the observer
 */
function enableLabelObs() {
    const observerML = new MutationObserver(() => moveTargetToLz(observerML));
    observerML.observe(document.body, {childList: true, subtree: true});
}

/**
 * grant clearance of the setting say so
 */
function clearanceForLabel() {
    browser.storage.sync.get('label').then((value) => {
        if (value.label === 'true') enableLabelObs();
    }, onLabelError)
}

clearanceForLabel();
