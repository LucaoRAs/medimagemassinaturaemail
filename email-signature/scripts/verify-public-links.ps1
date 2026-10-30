$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$checks = @(
    @{ name = 'Site institucional'; url = 'https://www.medimagem.med.br/' },
    @{ name = 'Contato oficial'; url = 'https://www.medimagem.med.br/faleConosco.html' },
    @{ name = 'Resultados de exames'; url = 'https://www.medimagem.med.br/index.html#destino' },
    @{ name = 'WhatsApp de agendamento'; url = 'https://wa.me/5535997226479' },
    @{ name = 'WhatsApp da ouvidoria'; url = 'https://wa.me/5535999212077' },
    @{ name = 'PNG vertical oficial em alta resolucao'; url = 'https://raw.githubusercontent.com/LucaoRAs/medimagemsite/e3330f25fc2a6675137cfe0d1168bd6c95c30317/img/icone.png'; local = 'assets\logo-medimagem-vertical-hd.png' },
    @{ name = 'Icone e-mail'; url = 'https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/communication/2x_web/ic_email_white_24dp.png'; local = 'assets\icons\email.png' },
    @{ name = 'Icone telefone'; url = 'https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/communication/2x_web/ic_call_white_24dp.png'; local = 'assets\icons\phone.png' },
    @{ name = 'Icone agendamento'; url = 'https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/communication/2x_web/ic_chat_white_24dp.png'; local = 'assets\icons\chat.png' },
    @{ name = 'Icone site'; url = 'https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/action/2x_web/ic_language_white_24dp.png'; local = 'assets\icons\website.png' }
)
$results = foreach ($item in $checks) {
    try {
        $response = Invoke-WebRequest -Uri $item.url -UseBasicParsing -TimeoutSec 30
        $entry = [ordered]@{ name = $item.name; url = $item.url; status = [int]$response.StatusCode; contentType = $response.Headers['Content-Type']; bytes = $response.RawContentLength; finalUrl = $response.BaseResponse.ResponseUri.AbsoluteUri }
        if ($item.url.EndsWith('#destino')) {
            $entry['anchorFound'] = $response.Content.Contains('id="destino"')
        }
        if ($item.url.EndsWith('.png')) {
            $hashAlgorithm = [System.Security.Cryptography.SHA256]::Create()
            $entry['sha256'] = ([BitConverter]::ToString($hashAlgorithm.ComputeHash($response.Content))).Replace('-', '').ToLowerInvariant()
            $hashAlgorithm.Dispose()
            $entry['matchesLocal'] = $entry['sha256'] -eq (Get-FileHash -LiteralPath (Join-Path $projectRoot $item.local) -Algorithm SHA256).Hash.ToLowerInvariant()
        }
        [pscustomobject]$entry
    } catch {
        [pscustomobject]@{ name = $item.name; url = $item.url; status = 0; error = $_.Exception.Message }
    }
}
$report = [ordered]@{ checkedAt = [DateTime]::UtcNow.ToString('o'); mode = 'GET publico, sem autenticacao e sem envio de mensagens'; results = @($results) }
$json = $report | ConvertTo-Json -Depth 6
[System.IO.File]::WriteAllText((Join-Path $projectRoot 'docs\public-link-validation.json'), $json, [System.Text.UTF8Encoding]::new($false))
$results | Format-Table name, status, contentType, anchorFound, matchesLocal
if (@($results | Where-Object { $_.status -ne 200 -or $_.matchesLocal -eq $false -or $_.anchorFound -eq $false }).Count -gt 0) { exit 1 }
