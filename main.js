"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const fs = require('fs');
const args = process.argv.slice();
let data = "";
switch (args[2]) {
    case '--about' || '-about':
        console.log("Nodejs Free HTML Parser [Version 1.0.0]\nCopyright (c) 2022 \x1b[32mGrass Development Team.\x1b[0m\n");
        console.log("FreeHTML is a simplified HTML. You can use it to write web page more easily. Free HTML was first mentioned and made by Aroton Studio.\nBasic FreeHTML Docs: https://docs.aroton.top/docs/freehtml-help.txt\nDocs of Nodejs FreeHTML Parser are still writing.");
        break;
    case '--help' || '-help' || '-?' || '--?':
        console.log("    --about About NFP\n    [FHT File Path] [Out Path] Build HTML file\n");
        break;
    case undefined:
        fs.access(`./fhtconfig.json`, fs.constants.F_OK, (err) => {
            if (err) {
                console.log(`Cannot find \x1B[31mrequired file\x1B[0m 'fhtconfig.json'`);
            }
            else {
                const _fhtconfig = JSON.parse(fs.readFileSync('./fhtconfig.json', "UTF-8"));
                for (let i = 0; i < _fhtconfig.length; i++) {
                    if (_fhtconfig[i]['in']) {
                        fs.access(`${_fhtconfig[i]['in']}`, fs.constants.F_OK, (err) => {
                            if (err) {
                                console.log(`\x1B[31mCannot find or read the file '${_fhtconfig[i]['out']}'\x1B[0m`);
                            }
                            else {
                                data = fs.readFileSync(`${_fhtconfig[i]['in']}`, 'UTF-8');
                                let _compress = false;
                                if (_fhtconfig[i]['compress'] && typeof _fhtconfig[i]['compress'] == "boolean") {
                                    _compress = _fhtconfig[i]['compress'];
                                }
                                if (data) {
                                    const _parse = new functions_1.FreeHtmlParser(data);
                                    const _result = _parse.parse(_compress);
                                    if (_fhtconfig[i]['out']) {
                                        fs.writeFileSync(`${_fhtconfig[i]['out']}`, _result, 'UTF-8');
                                    }
                                    else {
                                        console.log(_result);
                                    }
                                }
                            }
                        });
                    }
                    else {
                        console.log(`\x1B[31mCannot find required config 'in' in 'fhtconfig.json'\x1B[0m`);
                    }
                }
            }
        });
        break;
    default:
        fs.access(`${args[2]}`, fs.constants.F_OK, (err) => {
            if (err) {
                console.log(`\x1B[31mCannot find or read the file '${args[2]}'\x1B[0m`);
            }
            else {
                data = fs.readFileSync(`${args[2]}`, 'UTF-8');
                if (data) {
                    const _parse = new functions_1.FreeHtmlParser(data);
                    const _result = _parse.parse();
                    if (args[3] != null) {
                        fs.writeFileSync(`${args[3]}`, _result, 'UTF-8');
                    }
                    else {
                        console.log(_result);
                    }
                }
            }
        });
}
