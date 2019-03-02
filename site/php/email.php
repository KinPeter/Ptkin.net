<?php

$to      = 'kinpeter85@gmail.com';
$subject = $_POST['inputSubject'];
$message = 'This message is from: ' . $_POST['senderEmail'] . '<br> The message is: <br>' . $_POST['inputMessage'];

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: P-Kin.com <info@p-kin.com>" . "\r\n";

mail($to, $subject, $message, $headers);

?> 