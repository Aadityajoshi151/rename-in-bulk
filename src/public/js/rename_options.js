import { _01_initNameModule } from './rename_modules/rm01_name.js';
import { _02_initReplaceModule } from './rename_modules/rm02_replace.js';
import { _03_initCaseModule } from './rename_modules/rm03_case.js';



document.addEventListener('DOMContentLoaded', () => {
    // Initialize all rename modules
    const _01_nameModule = _01_initNameModule();
    const _02_replaceModule = _02_initReplaceModule();
    const _03_caseModule = _03_initCaseModule();

    // Dry Run button handler
    document.getElementById('dryRunButton')?.addEventListener('click', () => {
        if (_01_nameModule.isNameModuleEnabled()) {
            // console.log('Name Operation:', _01_nameModule.getnameOperation());
            // console.log('Name Text:', _01_nameModule.getnameText());
        }
    });

    // Rename button handler
    document.getElementById('renameButton')?.addEventListener('click', () => {
        // Collect data from all modules and process
    });
});