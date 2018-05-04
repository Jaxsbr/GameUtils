# Get parent/parent directory "GameUtils"
# Append js/utils/ to above directory "GameUtils/js/utils" (content directory)
# Append js/utils.js to above directory "GameUtils/js/utils.js" (lib path)

$mainDirectory = (Get-ScriptDirectory).parent;

$contentFilesDirectory = $mainDirectory.parent + "\js\utils";
$outputFilePath = "C:\Users\JacoBr\Desktop\utils.js";

# Clean old content
Clear-Content $outputFilePath;

# Get new content from all lib files and write to utils file
Get-ChildItem $contentFilesDirectory -Filter *.js |
ForEach-Object {        
    Get-Content $_.FullName | Add-Content $outputFilePath;        
};