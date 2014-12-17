@echo off
IF NOT "%1"=="" GOTO start
IF "%1"=="" GOTO defl
:start
php -S localhost:%1 -t "{[path_public]}"
GOTO done
:defl
php -S localhost:80 -t "{[path_public]}"
GOTO done
:done