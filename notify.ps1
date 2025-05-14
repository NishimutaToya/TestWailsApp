Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss'): Script started"

# モジュールが無ければインストール
if (-not (Get-Module -ListAvailable -Name BurntToast)) {
    Write-Host "Installing BurntToast..."
    Install-Module -Name BurntToast -Force -Scope CurrentUser
}

Import-Module BurntToast

# 通知テキスト
$Text = @("MyApp", "Click the button to launch the app")

# Openボタンを押すと myapp://open が起動される（レジストリで myapp:// はすでに登録済み）
$Button = New-BTButton -Content "Open" -Arguments "myapp://open"

# 通知作成
New-BurntToastNotification -Text $Text -Button $Button

Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss'): Script completed"
