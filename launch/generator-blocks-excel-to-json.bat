
@echo off

set /p answer="Open Config or Run Program [1 / anything]: "

if %answer% EQU 1 (

    start ./../config/generator-blocks-excel-to-json.json

) else (

    if not exist "./../src/node_modules" (

        cmd /c & cd ./../src & npm i & cls & cd ./../src/generator-blocks-excel-to-json & node index.js & pause

    ) else (

        cmd /c & cd ./../src/generator-blocks-excel-to-json & node index.js & pause

    )

)
