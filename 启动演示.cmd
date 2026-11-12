@echo off
chcp 65001 >nul
cd /d "%~dp0"
start "" powershell.exe -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:4173/'"
npm start
pause
