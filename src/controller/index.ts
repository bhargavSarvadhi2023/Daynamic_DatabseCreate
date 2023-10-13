import path from 'path';
import { DaynamicImport } from '../utils/daynamicImport';

const folderPath = path.join(__dirname);
const excludedFiles = ['index.ts'];

export const dynamicControllers = DaynamicImport(
    folderPath,
    excludedFiles,
) as any;
