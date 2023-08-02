
@echo off

set /p answer="Open Config or Run Program [1 / anything]: "

if %answer% EQU 1 (

    start ./../config/generator-blocks-excel-to-json.json

) else (

    if not exist "./../node_modules" (

        cmd /c cd ./.. & npm i & cls & node ./../src/generator-blocks-excel-to-json/index.js & pause

    ) else (

        cmd /c node ./../src/generator-blocks-excel-to-json/index.js & pause

    )

)
