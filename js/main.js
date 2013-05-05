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

        this.status = null;

        this.autorizar = function () {
            var notifier = this;

            if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
                notifier.searchUserTwitter();
            }

            window.Notification.requestPermission(function(perm) {
                notifier.status = perm;
                notifier.searchUserTwitter();
                console.log(perm);
            });
        }

        this.searchUserTwitter = function () {
            var notifier = this,
                user = document.querySelector("#login");
                console.log(user.value);

                jQuery.ajax({
                    data: {
                        suppress_response_codes: true
                    },
                  dataType: 'jsonp',
                  url: 'http://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name='+user.value+'&count=2',
                  contentType:"application/json",
                  complete: function(xhr, textStatus) {
                    //called when complete
                  },
                  success: function(data, textStatus, xhr) {
                        console.log(data);
                    for (i=0; i<data.length; i++) {
                        console.log(data[i]);
                        $("#data").append("<p>" + data[i].text) +"</p>";
                        $("#data").append("<p>" + data[i].created_at +"</p>");
                    };
                    $("#data").append(data.text);
                  },
                  error: function(xhr, textStatus, errorThrown) {
                        alert('erro');
                    },
                });
        }

        this.addEvents = function () {
            var notifier = this;

            document.querySelector("#go").addEventListener('click', function () {
                notifier.autorizar();
            });
        }

        this.init = function () {
            this.addEvents();
            this.autorizar();
        }
    };

    var webnotify = new Notify();
    webnotify.init();


}(jQuery));




//https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=lf_guerreiro&count=4
