
const fs = require('fs')
const path = require('path')

function treeFn(dirPath) {

    if (dirPath === undefined) {
        // console.log('kindly provide directory path');

        treeHalper(process.cwd())
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHalper(dirPath, "")

        } else {
            console.log('kindly provide directory path');
            return;
        }
    }
}


function treeHalper(dirPath, indent) {
    // is folder or file
    let isFile = fs.lstatSync(dirPath).isFile();
    let isFolder = fs.lstatSync(dirPath).isDirectory()
    console.log()
    if (isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else if (isFolder) {
        let dirName = path.basename(dirPath)
        console.log(indent + "└──" + dirName)
        let childrens = fs.readdirSync(dirPath);

        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i])
            treeHalper(childPath, indent + '\t');
        }
    }

}


module.exports = treeFn 