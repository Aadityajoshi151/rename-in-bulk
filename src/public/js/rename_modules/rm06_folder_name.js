export function _06_initFolderNameModule() {
    const _06_folderNameCheckbox = document.getElementById('06_folderNameModuleCheckbox');
    const _06_folderNameMode = document.getElementById('06_folderNameMode');
    const _06_separator = document.getElementById('06_separator');

    // Initialize disabled state
    toggleFolderNameEnabled(false);
    
    if (_06_folderNameCheckbox) {
        _06_folderNameCheckbox.addEventListener('change', function() {
            toggleFolderNameEnabled(this.checked);
        });
    }

    function toggleFolderNameEnabled(enabled) {
        [_06_folderNameMode, _06_separator].forEach(el => {
            if (el) el.disabled = !enabled;
        });
        
        // Get the parent module first
        const module = _06_folderNameCheckbox.closest('.rename-module');
        if (module) {
            const controls = module.querySelectorAll('.rename-control');
            controls.forEach(control => {
                control.style.opacity = enabled ? 1 : 0.6;
            });
        }
    }

    return {
        getFolderNameOperation: () => _04_removeOperation?.value,
    };
}