<?php
php_sapi_name() === 'cli' or exit();
ini_set('display_errors', '1');
$pars = array_slice($argv, 1, count($argv));
if(empty($pars[0])){
    $command = null;
}else{
    $command = $pars[0];
}
$cur_path = realpath("");
$cur_path = str_replace("\\", "/", $cur_path);
$path_root = str_replace("huynguyen/jscv", "", $cur_path) . "/";
$namespace = null;
$path = realpath(".");
if (file_exists($path_root . "composer.json")) {
    // load composer
    $js = json_decode(file_get_contents($path_root . "composer.json"));
    if (!empty($js->name)) {
        $namespace = $js->name;
    }

}

if (empty($command)) {
    echo("Simple javascript mvc framework - create by Huy Nguyen<huynguyen159@outlook.com>\n");
    echo("*\n*\n");
    echo("*           Help [https://github.com/loi-chuanoi/jscv]              *\n");
    echo("*\n*\n");
    echo("\t-> hnmvc c|cr|create\n");
    echo("\n");
    echo("\tCreate new project from composer.json,Name of your namespace(do not use exists namespace from packagist <packagist.org>)\n");
    echo("\n");
    exit();
} elseif ($command == "create" || $command == "c" || $command == "cr") {

}