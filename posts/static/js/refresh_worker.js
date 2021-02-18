(function(){

    function refresh_service_worker(worker_path){
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                if(registration.active && registration.active.scriptURL === worker_path)
                {
                    registration.unregister();
                    let loc = window.location.toString();
                    loc = loc.replace('&sw=1', '');
                    loc = loc.replace('sw=1', '');
                    if(loc.endsWith('?'))
                    {
                        loc = loc.replace('?', '');
                    }
                    window.location = loc;
                }
            });
        });
    }

    if (!('serviceWorker' in navigator)) {
        return;
    }

    let worker_path = window.location.origin + '/static/js/service_worker.js';
    navigator.serviceWorker.register(worker_path).then(
        (data) => {
            console.log('[SW] Service worker has been registered');
            const urlParams = new URLSearchParams(window.location.search);
            const sw = urlParams.get('sw');
            if(sw === "1")
            {
                refresh_service_worker(worker_path);
            }
            else{
                serviceWorkerRegistration = data;
            }
        },
        e => {
            console.error('[SW] Service worker registration failed', e);
        }
    );
})()