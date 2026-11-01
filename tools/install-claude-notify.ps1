# Cai dat thong bao Windows cho Claude Code (khong am thanh, khong trung lap hook)
$ErrorActionPreference = "Stop"

$dir = Join-Path $HOME ".claude"
New-Item -ItemType Directory -Path $dir -Force | Out-Null

# 1. Tao notify.ps1
$notify = Join-Path $dir "notify.ps1"
@'
try {
    Import-Module BurntToast -ErrorAction Stop
    New-BurntToastNotification `
      -Text "Claude Code", "Claude can ban tra loi hoac cap quyen." `
      -Silent | Out-Null
} catch {
    # Khong lam gian doan Claude Code
}
'@ | Set-Content $notify -Encoding UTF8

# 2. Backup + doc settings.json
$file = Join-Path $dir "settings.json"
if (Test-Path $file) {
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    Copy-Item $file "$file.$stamp.bak" -Force
    $settings = Get-Content $file -Raw | ConvertFrom-Json
} else {
    $settings = [pscustomobject]@{}
}

if ($null -eq $settings.hooks) {
    $settings | Add-Member -NotePropertyName hooks -NotePropertyValue ([pscustomobject]@{})
}

$path = $notify.Replace("\", "/")
$command = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$path`""

function New-Hook { [pscustomobject]@{ type = "command"; command = $command } }

$wanted = @(
    @{ name = "PermissionRequest"; entry = [pscustomobject]@{ hooks = @(New-Hook) } },
    @{ name = "Notification"; entry = [pscustomobject]@{
        matcher = "idle_prompt|elicitation_dialog|elicitation_url_dialog"
        hooks = @(New-Hook) } }
)

foreach ($w in $wanted) {
    $name = $w.name
    $old = @($settings.hooks.$name | Where-Object { $null -ne $_ })

    # Bo qua neu da co hook tro toi notify.ps1
    $exists = $false
    foreach ($e in $old) {
        foreach ($h in @($e.hooks)) {
            if ($h.command -and $h.command -like "*notify.ps1*") { $exists = $true }
        }
    }
    if ($exists) { Write-Host "Da co hook $name - bo qua"; continue }

    $new = $old + @($w.entry)
    if ($null -eq $settings.hooks.$name) {
        $settings.hooks | Add-Member -NotePropertyName $name -NotePropertyValue $new
    } else {
        $settings.hooks.$name = $new
    }
    Write-Host "Da them hook $name"
}

$settings | ConvertTo-Json -Depth 50 | Set-Content $file -Encoding UTF8

if (-not (Get-Module -ListAvailable BurntToast)) {
    Write-Host "Chua co BurntToast. Cai bang: Install-Module BurntToast -Scope CurrentUser"
}
Write-Host "Hoan tat. Khoi dong lai Claude Code de hook co hieu luc."
