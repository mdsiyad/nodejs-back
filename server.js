var fs = require('fs');
var path = require('path');


//copy files & folders from source to target
 function copyDirectoryRecursiveSync(source, target, move) {
    if (!fs.lstatSync(source).isDirectory())
        return;

    var operation = move ? fs.renameSync : fs.copyFileSync;
    fs.readdirSync(source).forEach(function (itemName) {
        // console.log(itemName);
        var sourcePath = path.join(source, itemName);
        var targetPath = path.join(target, itemName);
        // get all files and folders created today
        var stats = fs.statSync(sourcePath);
        // console.log(stats.mtime);
        var mtime = new Date(stats.mtime);
        var today = new Date();
        if (mtime.getDate() == today.getDate() && mtime.getMonth() == today.getMonth() && mtime.getFullYear() == today.getFullYear()) {
            // console.log(sourcePath);

            if (fs.lstatSync(sourcePath).isDirectory()) {
                if (!fs.existsSync(targetPath))

                fs.mkdirSync(targetPath);
                copyDirectoryRecursiveSync(sourcePath, targetPath);
            }
            else {
                operation(sourcePath, targetPath);
            }
            // operation(sourcePath, targetPath);

        } 

        
    });
    console.log("Back up completed");
}



module.exports = {
    copyDirectoryRecursiveSync
}