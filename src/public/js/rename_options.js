import { initNameModule } from './rename_modules/rm01_name.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all rename modules
    const _01_nameModule = initNameModule();

    // Dry Run button handler
    document.getElementById('dryRunButton')?.addEventListener('click', () => {
        if (_01_nameModule.isNameModuleEnabled()) {
            console.log('Name Operation:', _01_nameModule.getNameOperation());
            console.log('Name Text:', _01_nameModule.getNameText());
        }
        // Add other module checks here
    });

    // Rename button handler
    document.getElementById('renameButton')?.addEventListener('click', () => {
        // Collect data from all modules and process
    });
});