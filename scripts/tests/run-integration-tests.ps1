param(
    [string]$saPassword,
    [string]$Configuration = "Debug"
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).ProviderPath
$setupScript = Join-Path $repoRoot "scripts\setup\setup-all.ps1"

Write-Host "Starting the local Docker database and running integration tests."
& $setupScript -saPassword $saPassword -RunApp:$false

& dotnet build (Join-Path $repoRoot "ExpenseTracker.sln") --configuration $Configuration
if ($LASTEXITCODE -ne 0) {
    throw "Solution build failed."
}
& dotnet test (Join-Path $repoRoot "src\ExpenseTracker.Tests") `
    --configuration $Configuration `
    --no-build `
    --filter "Category=Integration" `
    --verbosity minimal
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

Write-Host "Integration tests passed. The Docker volume remains in place."
