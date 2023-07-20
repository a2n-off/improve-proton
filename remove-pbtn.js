const onMutation = () => {
    const element = document.getElementsByClassName('topnav-list');
    if (element.length > 0 && element[0]) {
        console.info('target area found', element[0]);
        const e = document.querySelectorAll('[data-testid="cta:special-offer"]');
        console.info('target found', e);
        if (e.length > 0) {
            e[0].style.display = 'none';
            observer.disconnect();
            console.info('target neutralised, observer disconnected');
        } else {
            console.warn('no target found');
        }
    }
}

const observer = new MutationObserver(onMutation)

observer.observe(document.body, {childList: true, subtree: true})
