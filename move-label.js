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
                enableObs();
            }
        }
    }
}

function enableObs() {
    const observerML = new MutationObserver(() => moveTargetToLz(observerML));
    observerML.observe(document.body, {childList: true, subtree: true});
}

enableObs();
