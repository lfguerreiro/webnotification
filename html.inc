<?php

  $homeTL = ($connection->get('statuses/home_timeline'));
  #$json = json_encode($homeTL, JSON_PRETTY_PRINT);
  $json = json_decode($homeTL);

  echo $json


  #echo $homeTL
?>
