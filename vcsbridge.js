/**
 * @author James Austin Jr., Rifat Hasan, Rishika Baranwal, Samyak Jain
 * @email james.austin@student.csulb.edu, rifat.hasan@student.csulb.edu, rishika.baranwal@student.csulb.edu, samyak.jain@student.csulb.edu
 * @date 2021/02/07
 * @brief vcsbridge.js permits form data submitted from vcswebsite.html to
 *        be redirected to a special webpage listing out the appropriate data.
 */

var fse = require('fs-extra');
var fs = require('fs');
var express = require('express');

// only need if hidden files become a problem
// const fs = require('fs').promises;

var app = express();
const path = require('path');
app.use(express.static('./'));
app.get(
    '/get_repo_form',


    // req - request
    // res - result
    function(req, res) {
        var repoName = req.query.repo_name; // ! something
        var sourcePath = req.query.source_path; // ! C:/Users/rifat/Desktop/source
        var targetPath = req.query.target_path + '/' + repoName; // ! C:/Users/rifat/Desktop/CSULB-2021-Spring/target
        var flatfile = path.basename(targetPath); // ? something bc we add folder called 'something' to the end

        console.log('Repo Name recieved: ' + repoName);
        console.log('Source Path recieved: ' + sourcePath);
        console.log('Target Path received: ' + targetPath);
        console.log('Base Name: ' + flatfile);
        // flatRecursion(targetPath);

        // Error Handling for existing directories
        // if (!fs.existsSync(targetPath + '/' + repoName)) {
        //     fs.mkdirSync(targetPath + '/' + repoName);
        //     targetPath = targetPath + '/' + repoName;
        // }
        fse.copy(sourcePath, targetPath,
            () => {
                console.log("\nFile successfully stored!\n");
                // console.log("Running Art...");

                fs.readdir(targetPath, (err, files) => {});
                //     if(err) console.log(err);
                //     files.forEach(file => {
                //         // if(file is in directory then move on)
                //         if(file.charAt(0) == '.')
                //             fs.unlinkSync(path.join(targetPath, file));
                //         else if(fs.lstatSync(path.join(targetPath, file)).isFile())
                //             console.log("File - ", file);
                //         else if(fs.lstatSync(path.join(targetPath, file)).isDirectory()) {
                //             console.log("Directory - ", file);
                //             flattenFiles(targetPath, path.join(targetPath, file)); // may need to pass in lstatSync
                //         }
                //     });
                // });

                const removeDir = function (targetPath) {
                    if(fs.existsSync(targetPath)) {
                        const files = fs.readdirSync(targetPath);

                        if(files.length > 0) {
                            files.forEach(filename => {
                                if(fs.statSync(path.join(targetPath, filename)).isDirectory()) {
                                    removeDir(path.join(targetPath, filename));
                                }
                                else {
                                    fs.unlinkSync(path.join(targetPath, filename));
                                }
                            });
                        }
                        else { console.log("No Files"); }
                    }
                    else { console.log("No Directory"); }
                };

                // flatRecursion(targetPath);
                // console.log("\nCurrent filenames: ");
                // fs.readdirSync(targetPath).forEach(file => {
                //     console.log(file);
                // });

                // artID(targetPath); // executes after copy is complete
                // console.log("Running Art...");
            }
        );

        res.send('You can find ' + repoName + ' repo at ' + targetPath);

        // artID(targetPath);
        // ! for filename switch slashes to '/' not '\'
        // * filepath example: C:\Users\rifat\projects
        //fs.writeFileSync(sourcePath + '/' + repoName + '.txt', targetPath, 'utf8'); //concatenates filepath given and repo name to create text file in user's desired location
    }
);
/* 
function flatRecursion(targetPath) {
    var flatfile = path.basename(targetPath);
    console.log("\nCurrent filenames: ");
    fs.readdirSync(flatfile).forEach(file => {
        console.log(file);
    });
} */

// function flattenFiles(targetPath, tempDir) {
//     fs.readdir(tempDir, (err, files) => {
//         if(err) console.log(err);
//         files.forEach(file => {
//             if(file.charAt(0) == '.')
//                 fs.unlinkSync(path.join(tempDir, file));
//             else if(fs.lstatSync(path.join(tempDir, file)).isFile()) {
//                 console.log("File - ", file);
//                 fse.move(path.join(tempDir, temp), targetPath);
//                 fse.rename(path.join(tempDir, file), targetPath + '/dummy', (err) => {
//                     if(err) console.log(err);
//                     else console.log(file);
//                 });
//             }
//             else if(fs.lstatSync(path.join(tempDir, file)).isDirectory())
//                 // console.log("Directory - ", file);
//                 flattenFiles(targetPath, file); 
//         });
//         // console.log("Unlink end");
//         // fs.unlinkSync(tempDir);
//     });
// }

function flatRecursion(targetPath) {

    console.log(targetPath);
    fs.readdir(targetPath, (err, files) => {
        if(err) { console.log(err); }
        let dir = false;
        files.forEach(file => {
            let file_stat = fs.lstatSync(path.join(targetPath, file));
            if(file_stat.isFile()) {
                dir = false;
            }
            // else if()
        });
    });

    // var flatfile = path.basename(targetPath); // c: user/desktop
    // console.log("\nCurrent filenames: ");
    // fs.readdirSync(flatfile).forEach(file => { // c: user/desktop/test
    //     console.log(file);
    //     if(fs.lstatSync(file).isDirectory()) {
    //         fs.move(flatfile + '/' + file, targetPath, console.error);
    //         return flatRecursion(flatfile + '/' + file);
    //     }
    //         // return flatRecursion(file);
    //     // else if(!fs.existsSync(file)) {
    //     //     return;
    //     // }
    //     else {
    //         // fse.move(targetPath + 'NEXT DIR', targetPath, console.error);
    //         // fs.move(flatfile + '/' + file, targetPath, console.error);
    //         return ;
    //     }

        /* ERROR HANDLING:
        try{
            fs.lstatSync("/some/path").isDirectory()
        }catch(e){
            // Handle error
            if(e.code == 'ENOENT'){
                //no such file or directory
                //do something
            }else {
                //do something else
            }
        }*/
    // });
}

/* function getCurrentFilenames() { 
    console.log("\nCurrent filenames:"); 
    fs.readdirSync(__dirname).forEach(file => { 
      console.log(file); 
    }); 
  }  */
app.get(
    '/',
    function(req, res) {
        res.sendFile(
            './vcswebsite.html', { root: __dirname }
        );
    }
);
app.listen(
    3000,
    function() {
        console.log("vcsbridge.js listening on port 3000!");
    }
);
/*
app.getPath( //comeback to this 
    '/',
    function(file) {
        var element = file.split("/");
        var str = "";
        for(var i = 0; i < element.length-1; i++){
            str += element[i] + "/";
        }
        return str;
    } 
);
*/

/**
 * Artifact ID Generator
 * Generates a filename according to file data passed in through form
 */
function artID(rootName) {
    // var rootName = __dirname; // A - root name // fs.dir.path? // need to change path name to respective file
    // var fileData = fs.readFileSync(rootName + '/repo.txt', 'utf8'); // repo.txt needs to change
    // var fileLength = fileData.length();

    // needs to be changed to respective file
    // var D = 'repo';
    // var E = 'txt';

    // var iter = 0;
    var hexTotal = 0;
    var hashOffset = 4;
    var r = 0;
    //var contents = ''; // const?
    var A = hexConvert(rootName);

    //const filenames = fs.readdirSync(rootName); // ERROR: no such file/directory found
    // read files in the directory
    // rootName = targetPath
    // filenames = array of (strings) file names in that directory

    // debug
    // console.log("Running Filenames...");
    // const filenames = fs.readdirSync(rootName, (err, list) => {
    //     if (err) throw err;
    //     // regex, limit what is going in, hidden files should be ignored
    //     console.log("Running In Filenames...");
    //     for(let i = 0; i < list.length(); ++i) {
    //         if(list[i].charAt(0) == '.')
    //             console.log(list[i]);
    //     }
    //     // list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)); // i have no idea wtf is going on with this regex
    //     // console.log(list);
    //     // need to ignore .DS_store
    // });

    // removes dot files from list
    const filenames = fs.readdirSync(rootName);
    for(let i = 0; i < filenames.length; ++i) {
        if(filenames[i].charAt(0) == '.') {
            console.log("Removing - " + filenames[i]);
            filenames.splice(i, 1);
        }
    }
    // debug
    // console.log("Running After Filenames...", filenames);

    //Samyak addition - experimentation 
    // fs.readdir(rootName, function(err, files) {
    //     if(err) {
    //         return console.log('unable to scan directory: ' + err); 
    //     }
    //     files.forEach(fs.readFile(file, 'utf-8', (err, data) => {
    //         if(err) throw err; 
    //         console.log(file); 
    //         console.log(data);
    //     }
    //     )
    // });

    // hash function
    filenames.forEach(file => {
        // var iter = 0
        // reads the contents of the file

        // read the contents of file passed
        // if(!fs.lstatSync(path.join(filePath, file)).isDirectory()) {
        //     const content = fs.readFileSync(path.join(filePath, file), 'utf8');
        //     console.log(content);
        // }
        
        /*
        fs.readFile(file, function(err, data) {
            // if (err) throw err; // throws when file in undefined
            // var contents = data;
            console.log(file); // .DS_store is included for some reason
            console.log(data); // either outputs nonsense or undefined

            // SEARCH: file outputs undefined when it is read even though there's in it node js

        }); // utf8 = buffer for english 
        */
        /*
        // while(!contents.eof()) { // needs to turn to false
        for (let iter = 0; iter < contents.length; ++iter) {
            r = iter % hashOffset;
            // r = ++iter % hashOffset;
            if (r == 0) {
                // hexTotal += file.charAt(iter) * 3; // need to iterate through characters, wrong right now
                hexTotal += contents.substr(iter, 1) * 3;
            }
            else if (r == 1 || r == 3) {
                // hexTotal += file.charAt(iter) * 7;
                hexTotal += contents.substr(iter, 1) * 7;
            }
            else if (r == 2) {
                // hexTotal += file.charAt(iter) * 11;
                hexTotal += contents.substr(iter, 1) * 11;
            }
        }
        var B = fs.statSync(file).size.toString(16); // is size the same as file length?
        var C = hexTotal.toString(16);
        fs.rename(file, '' + A + '/' + B + '/' + C + '/' + D + '.' + E);
        */
    });

    // while (!fileData) { // idk how to check for EOF
    //     // iter++;
    //     r = ++iter % hashOffset;
    //     if (r == 0) {
    //         hexTotal += fileData.charAt(iter) * 3;
    //     }
    //     else if (r == 1 || r == 3) {
    //         hexTotal += fileData.charAt(iter) * 7;
    //     }
    //     else if (r == 2) {
    //         hexTotal += fileData.charAt(iter) * 11;
    //     }
    // }
    // var C = hexTotal.toString(16); // C - hex output, needs to be truncated for overflow

    function hexConvert(text) {
        var hex = '';
        for (var i = 0; i < text.length; ++i) {
            hex += text.charAt(i).toString(16);
        }
        return hex;
    }

    // var A = hexConvert(rootName); // A - hex output
    // var B = hexConvert(fileLength); // B - hex output

    // console.log('' + A + '/' + B + '/' + C + '/' + D + '.' + E);
}