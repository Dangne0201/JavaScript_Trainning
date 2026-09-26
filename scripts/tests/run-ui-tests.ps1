<# Run UI automation tests (uses the ExpenseTracker.UiTests project which depends on FlaUI)
Notes:
 - UI tests need an interactive desktop session (they interact with Windows UI).
 - This script starts/preserves the local Docker database and passes its process-scoped app connection to the UI test.
Usage:
  PowerShell -ExecutionPolicy Bypass -File .\scripts\tests\run-ui-tests.ps1 -Configuration Debug
#>
param(
    [string]$Configuration = "Debug",
    [string]$saPassword
)

$ErrorActionPreference = "Stop"
Write-Host "Building WinForms app and running UI tests (Configuration=$Configuration)"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).ProviderPath
$setupScript = Join-Path $repoRoot "scripts\setup\setup-all.ps1"
& $setupScript -saPassword $saPassword -RunApp:$false

# Build the WinForms app in the requested configuration.
& dotnet build (Join-Path $repoRoot 'src\ExpenseTracker.WinForms\ExpenseTracker.WinForms.csproj') --configuration $Configuration
if ($LASTEXITCODE -ne 0) {
    throw "WinForms build failed."
}

# Tell the UI test which app output to launch.
$previousConfiguration = $env:EXPENSE_TRACKER_CONFIGURATION
try {
    $env:EXPENSE_TRACKER_CONFIGURATION = $Configuration
    & dotnet test (Join-Path $repoRoot 'src\ExpenseTracker.UiTests') `
        --configuration $Configuration `
        --verbosity minimal
    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }
}
finally {
    if ($null -eq $previousConfiguration) {
        Remove-Item Env:EXPENSE_TRACKER_CONFIGURATION -ErrorAction SilentlyContinue
    }
    else {
        $env:EXPENSE_TRACKER_CONFIGURATION = $previousConfiguration
    }
}
