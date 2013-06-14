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
        var intervalId = null,
            listaTwitts    = [];
        this.status = null;
        this.interval = 1000 * 10;

        this.autorizar = function () {
            var notifier = this;

            // if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
            //     notifier.start();
            //     console.log('1');
            // }

            window.Notification.requestPermission(function(perm) {
                notifier.status = perm;
                notifier.start();
            });
        }

        this.notificar = function (profile, icon, mensagem) {
            var notification = new Notification(profile, {
                dir: "auto",
                lang: "",
                icon: icon,
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

        this.tweets = function () {
            var test, msg, item, icon, user, i, max, idTweet,
                notifier = this;

            $.ajax({
              dataType: 'json',
              url: 'index.php',
              contentType:"application/json",
              async: false,
              complete: function(xhr, textStatus) {
                //called when complete
              },
              success: function(data, textStatus, xhr) {
                    if (data.error) {
                        notifier.stop();
                        $('p').html('<strong>Xiiii marquinho deu erro ai na parada....</strong> <br />'+data.error);
                        return false;
                    }else{
                        max = data.length;
                        for (i = 0; i < max; i++) {
                            item =  {
                                idTweet: data[i].id,
                                msg: data[i].text,
                                icon: data[i].user.profile_image_url,
                                user: data[i].user.name
                            }
                            listaTwitts.push(item);
                        };
                    };
                },
              error: function(xhr, textStatus, errorThrown) {
                    alert('erro');
                },
            });

            if (listaTwitts === ''){
                return false;
            }else{
                return listaTwitts;
            };
        };

        this.getTwitter = function (){
            // var notifier = this;
            var i, listId, test;

            for (i in listaTwitts) {
                if (listaTwitts.hasOwnProperty(i)) {
                    console.log(listaTwitts[i].idTweet)
                  }
            };
        }

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
            var notifier = this,
                statusElem = document.querySelector("#statusvalue");
            console.log('entrou');
            window.clearInterval(intervalId);
            statusElem.setAttribute('class', 'stopped');
            statusElem.innerHTML = 'Sem notificar :(';
        }

        this.start = function () {
            var notifier = this,
                statusElem = document.querySelector("#statusvalue");
                notifier.tweets();
                notifier.getTwitter();
                // if (this.isAuth()){
                //     intervalId = window.setInterval(function () {
                //         // Inicia
                //         var msgTwitt = notifier.tweets();
                //         console.log(msgTwitt);
                //         //notifier.notificar(msgTwitt[0].icon, msgTwitt[0].msg);
                //     }, notifier.interval);
                //     statusElem.setAttribute('class', 'started');
                //     statusElem.innerHTML = 'Notificação ativa :)';
                // }
        };

        this.init = function () {
            this.addEvents();
            //this.autorizar();
            //this.tweets();
        }
    };

    var webnotify = new Notify();
    webnotify.init();


}(jQuery));