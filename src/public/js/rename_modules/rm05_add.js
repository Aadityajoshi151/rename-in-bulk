export function _05_initAddModule() {
    const _05_addCheckbox = document.getElementById('05_addModuleCheckbox');
    const _05_prefixText = document.getElementById('05_prefix_Text');
    const _05_suffixText = document.getElementById('05_suffix_Text');
    const _05_insertText = document.getElementById('05_insert_Text');
    const _05_insertPosition = document.getElementById('05_insert_Position');

    // Initialize disabled state
    toggleAddEnabled(false);
    
    if (_05_addCheckbox) {
        _05_addCheckbox.addEventListener('change', function() {
            toggleAddEnabled(this.checked);
        });
    }

    function toggleAddEnabled(enabled) {
        [_05_prefixText, _05_suffixText, _05_insertText, _05_insertPosition].forEach(el => {
            if (el) el.disabled = !enabled;
        });
        
        // Get the parent module first
        const module = _05_addCheckbox.closest('.rename-module');
        if (module) {
            const controls = module.querySelectorAll('.rename-control');
            controls.forEach(control => {
                control.style.opacity = enabled ? 1 : 0.6;
            });
        }
    }

    return {
        getAddOperation: () => _04_removeOperation?.value,
    };
}