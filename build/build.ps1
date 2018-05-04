# Find relative paths
$mainDirectory = $PSScriptRoot.Replace("\build", "");

$contentFilesDirectory = $mainDirectory + "\js\utils";
$outputFilePath = $mainDirectory + "\js\utils.js";

# Clean old content
Clear-Content $outputFilePath;

# Get new content from all lib files and write to utils file
Get-ChildItem $contentFilesDirectory -Filter *.js |
ForEach-Object {        
    Get-Content $_.FullName | Add-Content $outputFilePath;        
};