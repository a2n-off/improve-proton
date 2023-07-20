/**
 * detect the ul (target) and observe if a child is added, if the child is the button destroy it
 */
function findAndDestroy() {
    console.info('Dom loaded, Script loaded');

    console.info('header', document.getElementsByClassName('header'));

    /*
     * it's seam that the button appear after an api call at 'https://mail.proton.me/api/core/v4/experiments'
     * so I used a mutation and when the ul (parent) is updated I remove the btn if it exists
     */

    // Select the node that will be observed for mutations
    const target = document.getElementsByClassName('topnav-list');
    console.info('target found', target);

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: false };

    if (target > 0) {
        const targetNode = target[0];
        console.info('targetNode found', targetNode);

        // Callback function to execute when mutations are observed
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') { // A child node has been added or removed
                    console.info('A child node has been added or removed');
                    removebtn(observer);
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }
}

/**
 * remove the btn if found
 * @param observer
 */
function removebtn(observer) {
    const e = document.querySelectorAll('[data-testid="cta:special-offer"]');
    console.info('e found', e);

    if (e.length > 0) {
        console.info('target found qnd destroyed, stop observing');
        e[0].style.display = 'none';
        // stop observing
        observer.disconnect();
    }
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        findAndDestroy();
    }
})
