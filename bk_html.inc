<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Twitter OAuth in PHP</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <style type="text/css">
      img {border-width: 0}
      * {font-family:'Lucida Grande', sans-serif;}
    </style>
  </head>
  <body>

<!--
    <div>
      <h2>Welcome to a Twitter OAuth PHP example.</h2>

      <p>This site is a basic showcase of Twitters OAuth authentication method. If you are having issues try <a href='./clearsessions.php'>clearing your session</a>.</p>

      <p>
        Links:
        <a href='http://github.com/abraham/twitteroauth'>Source Code</a> &amp;
        <a href='http://wiki.github.com/abraham/twitteroauth/documentation'>Documentation</a> |
        Contact @<a href='http://twitter.com/abraham'>abraham</a>
      </p>
      <hr />
      <?php if (isset($menu)) { ?>
        <?php echo $menu; ?>
      <?php } ?>
    </div>
    <?php if (isset($status_text)) { ?>
      <?php echo '<h3>'.$status_text.'</h3>'; ?>
    <?php } ?>
    <p>
      <pre>
        <?php print_r($content); ?>
      </pre>
    </p>
<div id="homeTimeline">
<h1>Home Timeline</h1>

<?php


  $homeTL = ($connection->get('statuses/home_timeline'));
  foreach($homeTL as $tweetsTL) {
    $tweetTL = $tweetsTL->text;
    $screen_nameTL = $tweetsTL->user->screen_name;
    $nameTL = $tweetsTL->user->name;
    $profile_image_urlTL = $tweetsTL->user->profile_image_url;
    $in_replyTL = $tweetsTL->in_reply_to_screen_name;
    $source = $tweetsTL->source;
    $createdTL = $tweetsTL->created_at;
    setlocale(LC_ALL, "pt_BR", "pt_BR.iso-8859-1", "pt_BR.utf-8", "portuguese");
    $createdTL = strtotime($createdTL);
    $createdTL =  strftime('%d de %B de %Y as %H:%M:%S', $createdTL);
  ?>
    <div id="tweetTL">
      <div class="avatar">
        <a href="http://twitter.com/<?php echo $screen_nameTL ?>" target="_blank"><img src="<?php echo $profile_image_urlTL ?>" alt="<?php echo $screen_nameTL ?>" title="<?php echo $nameTL ?>" /></a>
      </div>
      <div class="userInfo">
        <a href="http://twitter.com/<?php echo $screen_nameTL ?>" target="_blank"><?php echo $screen_nameTL ?></a> <?php echo $nameTL ?>
      </div>
      <div class="tweet"><?php echo $tweetTL ?></div>
      <div class="tweetInfo">criado em <?php echo $createdTL ?> <?php if($in_replyTL != "" || $in_replyTL != NULL)echo "em replica a $in_replyTL";?> via <span class="source"><?php echo $source ?></span> </div>
    </div>
<?php
  }

?>

-->


<?php

  $homeTL = ($connection->get('statuses/home_timeline'));
  #$json = json_encode($homeTL, JSON_PRETTY_PRINT);
  $json = json_encode($homeTL);

  echo $json
  #echo $homeTL
?>


</div>


  </body>
</html>