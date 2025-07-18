<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $to = "steve@thejazztones.co.uk";
  $subject = "New Message from the Website Contact Form";

  $name = htmlspecialchars($_POST["name"]);
  $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
  $message = htmlspecialchars($_POST["message"]);

  $headers = "From: steve@thejazztones.co.uk\r\n";  // Use a real email on your domain
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=utf-8";

  $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

  if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo "Success";
    header("Location: http://thejazztones.co.uk/");
  } else {
    http_response_code(500);
    echo "Error sending message.";
  }
} else {
  http_response_code(403);
  echo "Forbidden";
}
?>