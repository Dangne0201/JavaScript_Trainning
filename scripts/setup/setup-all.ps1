param(
    [string]$saPassword,
    [bool]$RunApp = $true
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).ProviderPath
$originalSaPassword = [Environment]::GetEnvironmentVariable("SA_PASSWORD", "Process")

function ConvertTo-PlainText([Security.SecureString]$SecureValue) {
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureValue)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    }
}

try {
    if ([string]::IsNullOrWhiteSpace($saPassword)) {
        $saPassword = $originalSaPassword
    }
    if ([string]::IsNullOrWhiteSpace($saPassword)) {
        $saPassword = ConvertTo-PlainText (Read-Host "Enter a strong local SQL Server SA password" -AsSecureString)
    }
    if ($saPassword.Length -lt 12 -or
        $saPassword -notmatch '[A-Z]' -or
        $saPassword -notmatch '[a-z]' -or
        $saPassword -notmatch '[0-9]' -or
        $saPassword -notmatch '[^a-zA-Z0-9]') {
        throw "Use a local SA password with at least 12 characters, including uppercase, lowercase, a number, and a symbol."
    }

    $env:SA_PASSWORD = $saPassword
    $startScript = Join-Path $PSScriptRoot "start-dev-fixed.ps1"
    & $startScript -saPassword $saPassword
    if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) {
        throw "SQL Server setup failed."
    }

    if ([string]::IsNullOrWhiteSpace($env:SQL_CONN)) {
        throw "SQL Server setup did not produce an app connection."
    }

    if ($RunApp) {
        Remove-Item Env:SA_PASSWORD -ErrorAction SilentlyContinue
        $project = Join-Path $repoRoot "src\ExpenseTracker.WinForms\ExpenseTracker.WinForms.csproj"
        & dotnet build $project
        if ($LASTEXITCODE -ne 0) {
            throw "WinForms build failed."
        }

        $exe = Join-Path $repoRoot "src\ExpenseTracker.WinForms\bin\Debug\net10.0-windows\ExpenseTracker.WinForms.exe"
        if (-not (Test-Path $exe)) {
            throw "Built app executable was not found at $exe."
        }
        Start-Process -FilePath $exe -WorkingDirectory (Split-Path $exe -Parent)
    }
}
finally {
    if ([string]::IsNullOrEmpty($originalSaPassword)) {
        Remove-Item Env:SA_PASSWORD -ErrorAction SilentlyContinue
    }
    else {
        $env:SA_PASSWORD = $originalSaPassword
    }
}
