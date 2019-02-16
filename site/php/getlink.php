<?php

$postResponse = $_POST['response'];
$link = "http://ptkin.net/site/static/peter_kin_cv.pdf";

if ($postResponse == 1) {
    echo $link;
} 
?>