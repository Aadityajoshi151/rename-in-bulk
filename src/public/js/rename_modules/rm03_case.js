export function initCaseModule() {
    const caseCheckbox = document.getElementById('caseModuleCheckbox');
    const caseOperation = document.getElementById('caseOperation');

    // Initialize disabled state
    toggleCaseEnabled(false);
    
    if (caseCheckbox) {
        caseCheckbox.addEventListener('change', function() {
            toggleCaseEnabled(this.checked);
        });
    }

    function toggleCaseEnabled(enabled) {
        caseOperation.disabled = !enabled;
        
        // Get the parent module first
        const module = caseCheckbox.closest('.rename-module');
        if (module) {
            const controls = module.querySelectorAll('.rename-control');
            controls.forEach(control => {
                control.style.opacity = enabled ? 1 : 0.6;
            });
        }
    }

    return {
        getNameOperation: () => nameOperation?.value,
    };
}