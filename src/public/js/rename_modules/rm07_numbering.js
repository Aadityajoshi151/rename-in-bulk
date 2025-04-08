export function _07_initNumberingModule() {
    const _07_numberingCheckbox = document.getElementById('07_numberingModuleCheckbox');
    const _07_numberingMode = document.getElementById('07_numberingMode');
    const _07_atPosition = document.getElementById('07_at_Position');
    const _07_startIndex = document.getElementById('07_start_index');
    const _07_increment = document.getElementById('07_increment');
    const _07_padding = document.getElementById('07_padding');


    // Initialize disabled state
    toggleNumberingEnabled(false);
    
    if (_07_numberingCheckbox) {
        _07_numberingCheckbox.addEventListener('change', function() {
            toggleNumberingEnabled(this.checked);
        });
    }

    function toggleNumberingEnabled(enabled) {
        [_07_numberingMode, _07_atPosition, _07_startIndex, _07_increment, _07_padding].forEach(el => {
            if (el) el.disabled = !enabled;
        });
        
        // Get the parent module first
        const module = _07_numberingCheckbox.closest('.rename-module');
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