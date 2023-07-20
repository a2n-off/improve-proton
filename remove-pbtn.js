const findAndDestroy = () => {
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

const observerRPBTN = new MutationObserver(findAndDestroy);
observerRPBTN.observe(document.body, {childList: true, subtree: true});
