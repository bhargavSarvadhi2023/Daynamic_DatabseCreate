import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../logger/logger';

export const DaynamicImport = (folderPath, excludedFiles) => {
    console.time('dynamic');
    const importedModules = {};
    const processDirectory = (dirPath) => {
        const items = fs.readdirSync(dirPath);
        items.forEach((item) => {
            const itemPath = path.join(dirPath, item);
            if (fs.lstatSync(itemPath).isDirectory()) {
                const subModules = processDirectory(itemPath);
                Object.assign(importedModules, subModules);
            } else if (item.endsWith('.ts') && !excludedFiles.includes(item)) {
                try {
                    const importedModule = require(itemPath);
                    Object.assign(importedModules, importedModule);
                } catch (error) {
                    logger.error(
                        `Error importing module from ${itemPath}: ${error}`,
                    );
                }
            }
        });
        return importedModules;
    };
    console.timeEnd('dynamic');
    return processDirectory(folderPath);
};

// ------------>>>>>>>>>>>>>>>for knowlege////////////

export const DaynamicImport2 = (folderPath, excludedFiles) => {
    const importedModules = [];
    let validationObj;
    const filesToProcess = fs.readdirSync(folderPath).filter((file) => {
        return file.endsWith('.ts') && !excludedFiles.includes(file);
    });
    for (const file of filesToProcess) {
        const filePath = path.join(folderPath, file);
        try {
            const importedModule = require(filePath);
            importedModules.push(importedModule);
        } catch (error) {
            logger.error(`Error importing module from ${file}: ${error}`);
        }
    }
    try {
        const data = importedModules.filter(Boolean);
        return (validationObj = Object.assign({}, ...data));
    } catch (error) {
        logger.error(`Error exporting module: ${error}`);
    }
};
