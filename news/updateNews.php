<?php
$json_news = file_get_contents("https://newsapi.org/v2/top-headlines?country=in&q=corona&apiKey=84cecde2c870430897e3656fb12d7fb3");
$file =  fopen("raw.json","w");
fwrite($file,$json_news);
fclose($file);
echo'OK';

 ?>
