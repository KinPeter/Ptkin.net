<?php

$postPass = md5($_POST['pass']);
$hash = "655965897f61e9bb6aa6c6684cdeb6d1";

if ($postPass === $hash) {
    echo 1;
} else {
    echo 0;
}

?>