<?php
include("config.php");
echo "Buildding ...... dont touch your project, anyway! ??\n";
echo ("We're working with : " .exec("git --version") . "\n");
echo (exec("git checkout master") . "\n");
$tag = exec("git tag");

function checkversion($newtag,$oldtag){
    $oldtag = str_replace("v","",$oldtag);
    $oldtag_arr = explode(".",$oldtag);
    $newtag = str_replace("v","",$newtag);
    $newtag_arr = explode(".",$newtag);
    if(count($oldtag_arr) > count($newtag_arr)){
        $check_tag_arr = $oldtag_arr;
    }else{
        $check_tag_arr = $newtag_arr;
    }
    for($i=0;$i < count($check_tag_arr);$i++){
        if(empty($oldtag_arr[$i])){
            return true;
        }
        if(empty($newtag_arr[$i])){
            return false;
        }
        if(intval($oldtag_arr[$i]) > intval($newtag_arr[$i])){
            return false;
        }else{
            return false;
        }
    }
}
function add_version_build($version){
    $version_arr = explode(".",$version);
    $version_arr[count($version_arr) -1 ] = intval($version_arr[count($version_arr) -1 ])+1;
    return join(".",$version_arr);
}
echo "Found first build : ". $tag . "\n";
$newbuild = add_version_build($tag);
echo "Create new build : ". $newbuild . "\n";
exec("git add --all *");
echo (exec("git commit --no-edit -m \"Create backup by BuildServer($tag)\"") . "\n");
echo (exec("git branch -D build") . "\n");
echo (exec("git branch build") . "\n");
echo (exec("git checkout build") . "\n");
$curdir = exec("cd");
if(!empty($IGNORE_FOLDER)){
    foreach($IGNORE_FOLDER as $dpath){
       (exec("rmdir /s /q \"" .$curdir . "\\" . $dpath ."\""));
    }
}
if(!empty($IGNORE_FILE)){
    foreach($IGNORE_FILE as $dpath){
        unlink($curdir . "\\" . $dpath);
    }
}
exec("git add --all *");
echo (exec("git commit --no-edit -m \"Create new build by BuildServer($newbuild)\"") . "\n");
exec("git tag $newbuild build");
exec("git checkout -f master");
echo "Succes !\n";