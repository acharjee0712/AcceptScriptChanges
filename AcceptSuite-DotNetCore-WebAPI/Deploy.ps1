cd C:\git\AcceptScriptNewChanges\AcceptSuite-DotNetCore-WebAPI

dotnet build 

dotnet publish -c Release -o C:\inetpub\wwwroot\PublishAcceptSuiteApiApp
set-executionpolicy unrestricted

import-module WebAdministration

Get-ExecutionPolicy

$SiteFolderPath = "C:\inetpub\wwwroot\PublishAcceptSuiteApiApp"
$SiteAppPool = "AcceptSuiteApiPool"
$SiteName = "AcceptSuiteApiSite"
$SiteHostName = "www.AcceptSuiteApiSite.com"

New-Item IIS:\AppPools\$SiteAppPool
New-Item IIS:\Sites\$SiteName -physicalPath $SiteFolderPath -bindings @{protocol="http";bindingInformation=":80:"+$SiteHostName}
Set-ItemProperty IIS:\Sites\$SiteName -name applicationPool -value $SiteAppPool

$fqdn = "$((Get-WmiObject win32_computersystem).DNSHostName).$((Get-WmiObject win32_computersystem).Domain)" 

$cert=(Get-ChildItem cert:\LocalMachine\My | where-object { $_.Subject -match "CN=$fqdn" } | Select-Object -First 1) 

if ($cert  -eq $null) { 
$cert = New-SelfSignedCertificate -DnsName $fqdn -CertStoreLocation "Cert:\LocalMachine\My" 
} 

$binding = (Get-WebBinding -Name AcceptSuiteApiSite | where-object {$_.protocol -eq "https"})

if($binding -ne $null) {
    Remove-WebBinding -Name AcceptSuiteApiSite -Port 4403 -Protocol "https" 
} 
New-WebBinding -Name AcceptSuiteApiSite -Port 4403 -Protocol https 
(Get-WebBinding -Name AcceptSuiteApiSite -Port 4403 -Protocol "https").AddSslCertificate($cert.Thumbprint, "my")

Set-ItemProperty IIS:\AppPools\$SiteAppPool managedRuntimeVersion "" 

$SiteFolderPath = "C:\git\AcceptScriptNewChanges"	
$SiteAppPool = "AcceptSuiteUIPool"
$SiteName = "AcceptSuiteUISite"
$SiteHostName = "www.AcceptSuiteUISite.com"

New-Item IIS:\AppPools\$SiteAppPool
New-Item IIS:\Sites\$SiteName -physicalPath $SiteFolderPath -bindings @{protocol="http";bindingInformation=":80:"+$SiteHostName}
Set-ItemProperty IIS:\Sites\$SiteName -name applicationPool -value $SiteAppPool

$fqdn = "$((Get-WmiObject win32_computersystem).DNSHostName).$((Get-WmiObject win32_computersystem).Domain)" 
$cert=(Get-ChildItem cert:\LocalMachine\My | where-object { $_.Subject -match "CN=$fqdn" } | Select-Object -First 1) 
if ($cert  -eq $null) { 
$cert = New-SelfSignedCertificate -DnsName $fqdn -CertStoreLocation "Cert:\LocalMachine\My" 
} 
$binding = (Get-WebBinding -Name AcceptSuiteUISite | where-object {$_.protocol -eq "https"})
if($binding -ne $null) {
    Remove-WebBinding -Name AcceptSuiteUISite -Port 4404 -Protocol "https" 
} 
New-WebBinding -Name AcceptSuiteUISite -Port 4404 -Protocol https 
(Get-WebBinding -Name AcceptSuiteUISite -Port 4404 -Protocol "https").AddSslCertificate($cert.Thumbprint, "my")