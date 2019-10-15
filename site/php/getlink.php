<?php

$postResponse = $_POST['response'];
$link = "http://old.p-kin.com/site/static/peter_kin_cv.pdf";

if ($postResponse == 1) {
    echo $link;
} 
?>