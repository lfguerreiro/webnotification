(function ($) {
    // check for notifications support
    // you can omit the 'window' keyword
    if (window.webkitNotifications) {
      console.log("Notifications are supported!");
    }
    else {
      console.log("Notifications are not supported for this Browser/OS version yet.");
    }


    var Notify = function() {

        var intervalId = null;

        this.status = null;
        this.interval = 1000 * 10;

        this.autorizar = function () {
            var notifier = this;

            if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
                notifier.start();
            }

            window.Notification.requestPermission(function(perm) {
                notifier.status = perm;
                notifier.start();
                console.log(perm);
            });
        }

        this.notificar = function (mensagem) {
            var notification = new Notification("To testando", {
                dir: "auto",
                lang: "",
                icon: "http://vomitandoarcoiris.com.br/wp-content/uploads/2013/03/icon-vomitando-arco-iris1.jpg",
                Duration: 10,
                body: mensagem,
                tag: "sometag",
            });

            notification.onclick = function () {
                alert('calma zé');
            };

            notification.onshow = function () {
                setTimeout(function () {
                    notification.close();
                }, 10000);
            };
        };

        this.addEvents = function () {
            var notifier = this;

            document.querySelector("#go").addEventListener('click', function () {
                notifier.autorizar();
            });
            document.querySelector("#stop").addEventListener('click', function () {
                notifier.stop();
            });
        }

        this.isAuth = function () {
            return this.status === 'granted' ||
                                Notification.permission === 'granted' ||
                                window.webkitNotifications.checkPermission() === 0;
        }

        this.stop = function () {
            var statusElem = document.querySelector("#statusvalue");

            window.clearInterval(intervalId);
            statusElem.setAttribute('class', 'stopped');
            statusElem.innerHTML = 'Sem notificar :(';
        }
        this.start = function () {
            var notifier = this,
                statusElem = document.querySelector("#statusvalue");

                if (this.isAuth()){
                    intervalId = window.setInterval(function () {
                        // Inicia
                        var mensagem = "TO AQUI HEIN ;P";
                        notifier.notificar(mensagem);
                    }, notifier.interval);
                    statusElem.setAttribute('class', 'started');
                    statusElem.innerHTML = 'Notificação ativa :)';
                }
        };

        this.init = function () {
            this.addEvents();
            this.autorizar();
        }
    };

    var webnotify = new Notify();
    webnotify.init();


}(jQuery));




//https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=lf_guerreiro&count=4
