
const fs = require('fs');
const XLSX = require('xlsx');

const conf = JSON.parse(fs.readFileSync("./../config/generator-blocks-excel-to-json.json", "utf8"));

const ExcelToJson = file => {
	
    const workbook = XLSX.readFile(file);
    const worksheet = workbook.Sheets[conf["name-list-xlsx-file"] ? 
        conf["name-list-xlsx-file"] : workbook.SheetNames[0]
    ];

    const MAIN_DATA = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const borders_between_mines = MAIN_DATA[7].reduce((r, v, i) => {
        if (v === 'id') r.push(i); 
        return r;
    }, []);

    const MINES = MAIN_DATA[0].filter(v => v).reduce((r, _, i) => {
        r.push(MAIN_DATA.map(v => v.slice(borders_between_mines[i],
            borders_between_mines[i + 1] ? borders_between_mines[i + 1] : v.length)))
        return r;
    }, []);

    const CONFIG_GENERATOR_MINES = MINES.reduce((result, mine, mine_index) => {

        const LEVELS = mine.map(v => v.slice(0, mine[7].findIndex(v => !v)));
        const BLOCKS = mine.map(v => v.slice(7, mine[7].slice(7).findIndex(v => !v) + 7));
        const MOBS = mine.map(v => v.slice(mine[7].slice(7).findIndex(v => !v) + 7), mine[7].length);

        result.generatorMines[mine_index + 1] = {
            'id': mine[1][0],
            'displayName': mine[1][1],
            'blocksRequired': mine[1][2],
            'unlockCost': mine[1][3],
            'fastUnlockCost': mine[1][4],
            'levels': {},
            'backgroundImage': mine[1][5],
        };

        mine.slice(8).filter(v => v[0]).forEach((_, level_index) => {
		
            result.generatorMines[mine_index + 1]['levels'][level_index + 1] = {
                'id': LEVELS[8 + level_index][0],
                'blocksRequired': LEVELS[8 + level_index][1],
                'upgradeCost': LEVELS[8 + level_index][2],
                'fastUpgradeCost': LEVELS[8 + level_index][3],
                'nextLevel': LEVELS[8 + level_index][4],
                'blocks': [],
				'chanceMobSpawn': LEVELS[8 + level_index][5],
                'mobs': []
            };

            BLOCKS[7].forEach((_, block_index) => {
                if (BLOCKS[8 + level_index][block_index] != null) {
                    result.generatorMines[mine_index + 1]['levels'][level_index + 1]['blocks'].push({
                        'id': BLOCKS[3][block_index],
                        'meta': BLOCKS[4][block_index],
                        'iconID': BLOCKS[5][block_index],
                        'iconMeta': BLOCKS[6][block_index],
                        'chance': Math.trunc(BLOCKS[8 + level_index][block_index] * 100),
                    });
                }
            });

            MOBS[7].forEach((_, mob_index) => {
                if (MOBS[8 + level_index][mob_index] != null) { 
                    result.generatorMines[mine_index + 1]['levels'][level_index + 1]['mobs'].push({
                        'id': MOBS[3][mob_index],
                        'displayName': MOBS[4][mob_index],
                        'chance': Math.trunc(MOBS[8 + level_index][mob_index] * 100),
                        'icon': MOBS[5][mob_index],
                    });
                } 
            });
        }); 

        return result;
    }, {generatorMines: {}})

    return JSON.stringify(CONFIG_GENERATOR_MINES, null, 2);
}

const SaveJsonToFile = (CONFIG) => {

    let path_with_name_file = null;

    if (conf["path-folder-for-result"]) path_with_name_file = conf["path-folder-for-result"];
    else path_with_name_file = "./../result";

    if (conf["name-result-file"]) path_with_name_file += `/${conf["name-result-file"]}.json`;
    else path_with_name_file += `/result__${new Date().toJSON().slice(0,19).replace(/:/g,'-').replace(/T/g,'__')}.json`

    fs.writeFile(path_with_name_file, CONFIG, (err) => {
        if (err) console.error('Error saving JSON file:', err);
        else console.log('JSON data saved to file:', path_with_name_file);
    });
}

if (conf["path-xlsx-file"]) SaveJsonToFile(ExcelToJson(conf["path-xlsx-file"]));
else console.log('Path to EXCEL file is not specified');
