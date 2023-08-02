
@echo off

if not exist "./../node_modules" (
    cmd /c cd ./.. & npm i & cls & node ./../src/generator-blocks-excel-to-json/index.js & pause
) else (
    cmd /c node ./../src/generator-blocks-excel-to-json/index.js & pause
)
