const data = require('../utils/utility');
const fs = require('fs');
const path = require('path');

let types = data.types;

function organizeFn(dirPath) {
	let newpath;
	// 1 . input  --> directory path given
	if (dirPath === undefined) {
		console.log(dirPath, '14');
		newpath = path.join(process.cwd(), 'organized_Files');
		dirPath = process.cwd();
		console.log(newpath, '16');
	} else {
		let doesExist = fs.existsSync(dirPath);
		if (doesExist) {
			//2 . create --> create organize directory;

			newpath = path.join(dirPath, 'organized_Files');
			if (fs.existsSync(newpath) === false) {
				fs.mkdirSync(newpath);
			}
		} else {
			console.log('kindly provide directory path');
			return;
		}
	}
	organizeHelper(dirPath, newpath);
}

function organizeHelper(src, dest) {
	// 3 . ==> identify categories of all the files prsesent in tha directory

	let childNames = fs.readdirSync(src);
	// console.log(childNames);
	for (let i = 0; i < childNames.length; i++) {
		let childAddress = path.join(src, childNames[i]);
		let isFile = fs.lstatSync(childAddress).isFile();
		if (isFile) {
			// console.log(childNames[i]);
			// copy / cut file to that organize directory
			let categorie = getCategorie(childNames[i]);
			// console.log(childNames[i] + "----->" + categorie)
			sendFiles(childAddress, dest, categorie);
		}
	}
}

function sendFiles(srcFilePath, destFile, categorie) {
	let categoriePath = path.join(destFile, categorie);
	if (fs.existsSync(categoriePath) === false) {
		fs.mkdirSync(categoriePath);
	}
	let fileName = path.basename(srcFilePath);
	let desFilePath = path.join(categoriePath, fileName);
	fs.copyFileSync(srcFilePath, desFilePath);
	fs.unlinkSync(srcFilePath);
	console.log(fileName, 'copied to ====> ', categorie);
}

function getCategorie(filename) {
	let ext = path.extname(filename);
	ext = ext.slice(1);
	for (let type in types) {
		let currentType = types[type];

		for (let i = 0; i < currentType.length; i++) {
			if (ext == currentType[i]) {
				return type;
			}
		}
	}
	return 'others';
}

module.exports = organizeFn;
