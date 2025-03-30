export function _01_initNameModule() {
    const _01_nameModuleCheckbox = document.getElementById('01_nameModuleCheckbox');
    const _01_nameOperation = document.getElementById('01_nameOperation');
    const _01_nameText = document.getElementById('01_nameText');

    if (_01_nameModuleCheckbox) {
        // Initialize disabled state (checkbox unchecked by default)
        toggleModuleEnabled(false);
        
        _01_nameModuleCheckbox.addEventListener('change', function() {
            toggleModuleEnabled(this.checked);
        });
    }

    function toggleModuleEnabled(enabled) {
        _01_nameOperation.disabled = !enabled;
        _01_nameText.disabled = !enabled;
        
        // Visual feedback
        const controls = document.querySelectorAll('.rename-module-content .rename-control');
        controls.forEach(control => {
            control.style.opacity = enabled ? 1 : 0.6;
        });
    }

    return {
        get01_nameOperation: () => _01_nameOperation?.value,
        get01_nameText: () => _01_nameText?.value,
        isNameModuleEnabled: () => _01_nameModuleCheckbox?.checked
    };
}