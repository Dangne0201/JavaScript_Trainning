<# Run unit tests (fast, no DB required)
Usage examples:
  PowerShell -ExecutionPolicy Bypass -File .\scripts\tests\run-unit-tests.ps1
  .\scripts\tests\run-unit-tests.ps1 -Configuration Release
#>
param(
    [string]$Configuration = "Debug"
)

Write-Host "Running unit tests (Configuration=$Configuration)"

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)

# Ensure build first
& dotnet build (Join-Path $repoRoot 'ExpenseTracker.sln') -c $Configuration
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

# Run only database-independent tests.
& dotnet test (Join-Path $repoRoot 'src\ExpenseTracker.Tests') -c $Configuration --no-build --filter "Category!=Integration" --verbosity minimal
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
