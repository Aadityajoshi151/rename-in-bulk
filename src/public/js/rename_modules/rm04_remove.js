export function _04_initRemoveModule() {
    const _04_removeCheckbox = document.getElementById('04_removeModuleCheckbox');
    const _04_first_n = document.getElementById('04_first_n_Text');
    const _04_last_n = document.getElementById('04_last_n_Text');
    const _04_from = document.getElementById('04_from_Text');
    const _04_to = document.getElementById('04_to_Text');

    // Initialize disabled state
    toggleRemoveEnabled(false);
    
    if (_04_removeCheckbox) {
        _04_removeCheckbox.addEventListener('change', function() {
            toggleRemoveEnabled(this.checked);
        });
    }

    function toggleRemoveEnabled(enabled) {
        [_04_first_n, _04_last_n, _04_from, _04_to].forEach(el => {
            if (el) el.disabled = !enabled;
        });
        
        // Get the parent module first
        const module = _04_removeCheckbox.closest('.rename-module');
        if (module) {
            const controls = module.querySelectorAll('.rename-control');
            controls.forEach(control => {
                control.style.opacity = enabled ? 1 : 0.6;
            });
        }
    }

    return {
        getRemoveOperation: () => _04_removeOperation?.value,
    };
}