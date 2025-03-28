export function initNameModule() {
    const nameModuleCheckbox = document.getElementById('nameModuleCheckbox');
    const nameOperation = document.getElementById('nameOperation');
    const nameText = document.getElementById('nameText');

    if (nameModuleCheckbox) {
        // Initialize disabled state (checkbox unchecked by default)
        toggleModuleEnabled(false);
        
        nameModuleCheckbox.addEventListener('change', function() {
            toggleModuleEnabled(this.checked);
        });
    }

    function toggleModuleEnabled(enabled) {
        nameOperation.disabled = !enabled;
        nameText.disabled = !enabled;
        
        // Visual feedback
        const controls = document.querySelectorAll('.rename-module-content .rename-control');
        controls.forEach(control => {
            control.style.opacity = enabled ? 1 : 0.6;
        });
    }

    return {
        getNameOperation: () => nameOperation?.value,
        getNameText: () => nameText?.value,
        isNameModuleEnabled: () => nameModuleCheckbox?.checked
    };
}