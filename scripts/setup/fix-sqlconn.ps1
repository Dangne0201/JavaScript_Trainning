$ErrorActionPreference = "Stop"
$setupScript = Join-Path $PSScriptRoot "setup-all.ps1"
& $setupScript
