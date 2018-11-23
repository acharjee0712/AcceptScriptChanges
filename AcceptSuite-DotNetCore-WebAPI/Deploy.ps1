#sets the folder path
cd C:\git\AcceptScriptNewChanges\AcceptSuite-DotNetCore-WebAPI

# Build the solution
dotnet build 

# Publish the solution to a folder
dotnet publish -c Release -o C:\inetpub\wwwroot\PublishAcceptSuiteApiApp

# Set Execution Policy
set-executionpolicy unrestricted

# To Access IIS module need to be imported
import-module WebAdministration

Get-ExecutionPolicy

#Set the Values to the Variables
$SiteFolderPath = "C:\inetpub\wwwroot\PublishAcceptSuiteApiApp"
$SiteAppPool = "AcceptSuiteApiPool"
$SiteName = "AcceptSuiteApiSite"
$SiteHostName = "www.AcceptSuiteApiSite.com"

# Create the website and application pool for WebAPI Project
New-Item IIS:\AppPools\$SiteAppPool
New-Item IIS:\Sites\$SiteName -physicalPath $SiteFolderPath -bindings @{protocol="http";bindingInformation=":80:"+$SiteHostName}
Set-ItemProperty IIS:\Sites\$SiteName -name applicationPool -value $SiteAppPool

# As website needs to be hosted on https Protocol SSL Certificate is required , below code creates it.
$fqdn = "$((Get-WmiObject win32_computersystem).DNSHostName).$((Get-WmiObject win32_computersystem).Domain)" 

$cert=(Get-ChildItem cert:\LocalMachine\My | where-object { $_.Subject -match "CN=$fqdn" } | Select-Object -First 1) 

if ($cert  -eq $null) { 
$cert = New-SelfSignedCertificate -DnsName $fqdn -CertStoreLocation "Cert:\LocalMachine\My" 
} 

$binding = (Get-WebBinding -Name AcceptSuiteApiSite | where-object {$_.protocol -eq "https"})

if($binding -ne $null) {
    Remove-WebBinding -Name AcceptSuiteApiSite -Port 4403 -Protocol "https" 
} 

# website with https protocol creates with static port
New-WebBinding -Name AcceptSuiteApiSite -Port 4403 -Protocol https 
(Get-WebBinding -Name AcceptSuiteApiSite -Port 4403 -Protocol "https").AddSslCertificate($cert.Thumbprint, "my")

#updating the application pool to No Managed Version
Set-ItemProperty IIS:\AppPools\$SiteAppPool managedRuntimeVersion "" 

# Creates the website for UI Application 
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

#Automatically opens the URL in Chrome Browser
Start-Process "chrome.exe" "https://localhost:4404/index_all.html"

