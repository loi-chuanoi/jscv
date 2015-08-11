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
		 if (empty($pars[1]) && empty($path)) {
        die("No path given ..., please add extra -> public_folder infor on composer.json");
    } else {
        if (!empty($pars[1])) {
            $path = $pars[1];
        }
        $pre_path = $path;
        if (empty($pars[2]) && empty($namespace)) {
            die("No namespace given ...");
        } else {
            $path_public =  $path;
            $path = str_replace("\\", "/", $path);
            $path_vendor = $path;
            if (!empty($pars[2])) {
                $namespace = str_replace("/", "\\", $pars[2]);
            } else {
                $namespace = str_replace("/", "\\", $namespace);
            }
            CreateDir($path_vendor);
            $data = array(
                "namespace" => str_replace("\\", "\\\\", $namespace),
                "folder" => $pre_path
            );
            Save_TL("index.html", $path_public, $data);

            $data = array(
                "namespace" => $namespace
            );
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace));            
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Views");
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Views/index");
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/actions");
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/cache");
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Libs");
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/img");
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/css");
            CreateDir($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Controllers");
            if (!file_exists($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Libs/config.js")) {
                Save_TL("config.js", $path_vendor . "/" . str_replace("\\", "/", $namespace) ."/Libs" , $data);
            }
            if (!file_exists($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/img/favicon.ico")) {
                Save_TL("favicon.ico", $path_vendor . "/" . str_replace("\\", "/", $namespace) ."/img" , $data);
            }
            if (!file_exists($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/img/icon.png")) {
                Save_TL("icon.png", $path_vendor . "/" . str_replace("\\", "/", $namespace) ."/img" , $data);
            }
            if (!file_exists($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Libs/config-dev.js")) {
                Save_TL("config-dev.js", $path_vendor . "/" . str_replace("\\", "/", $namespace) ."/Libs" , $data);
            }
            if (!file_exists($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Views/index/index.ejs")) {
                Save_TL("index.ejs", $path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Views/index", $data);
            }
             if (!file_exists($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/actions/index.js")) {
                Save_TLN("index-action.js","index.js", $path_vendor . "/" . str_replace("\\", "/", $namespace) . "/actions", $data);
            }
            if(!file_exists($path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Controllers/index.js")) {
                Save_TL("index.js", $path_vendor . "/" . str_replace("\\", "/", $namespace) . "/Controllers", $data);
            }
            $data = array(
                "path_public" => $path_public
            );
            if(!file_exists( $path_vendor . "/vendor/bin/phpdev")){
	            Save_TL("phpdev", $path_vendor . "/vendor/bin", $data);
	            @chmod($path_vendor . "/vendor/bin" . "/phpdev", 0777 & ~umask());
        	}
        	if(!file_exists( $path_vendor . "/vendor/bin/phpdev.bat")){
            	Save_TL("phpdev.bat", $path_vendor . "/vendor/bin", $data);
        	}
        }
    }
}
function CreateDir($path)
{
    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
}

function Load_TL($filename, $input)
{
    $cur_path = dirname(__FILE__);
    $file = $cur_path . "/" . $filename . ".tl";
    $data = file_get_contents($file);
    return ($data);
}
function Save_TLN($filename,$outname, $path, $d = null)
{
    $tplfilename = $filename;
    if (substr($filename, 0, 1) == ".") {
        $tplfilename = substr($filename, 0, strlen($filename) - 1);
    }
    $cur_path = dirname(__FILE__);
    $file = $cur_path . "/" . $tplfilename . ".tl";
    $data = file_get_contents($file);
    echo "Create file : " . $path . "/" . $filename . "\n";
    if (!empty($d)) {
        foreach ($d as $v => $d) {
            $data = str_replace("{[" . $v . "]}", $d, $data);
        }
    }
    file_put_contents($path . "/" . $outname, $data);
    unset($data);
}
function Save_TL($filename, $path, $d = null)
{
    $tplfilename = $filename;
    if (substr($filename, 0, 1) == ".") {
        $tplfilename = substr($filename, 0, strlen($filename) - 1);
    }
    $cur_path = dirname(__FILE__);
    $file = $cur_path . "/" . $tplfilename . ".tl";
    $data = file_get_contents($file);
    echo "Create file : " . $path . "/" . $filename . "\n";
    if (!empty($d)) {
        foreach ($d as $v => $d) {
            $data = str_replace("{[" . $v . "]}", $d, $data);
        }
    }
    file_put_contents($path . "/" . $filename, $data);
    unset($data);
}
