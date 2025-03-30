export function initCaseModule() {
    const _03_caseCheckbox = document.getElementById('03_caseModuleCheckbox');
    const _03_caseOperation = document.getElementById('03_caseOperation');

    // Initialize disabled state
    toggleCaseEnabled(false);
    
    if (_03_caseCheckbox) {
        _03_caseCheckbox.addEventListener('change', function() {
            toggleCaseEnabled(this.checked);
        });
    }

    function toggleCaseEnabled(enabled) {
        _03_caseOperation.disabled = !enabled;
        
        // Get the parent module first
        const module = _03_caseCheckbox.closest('.rename-module');
        if (module) {
            const controls = module.querySelectorAll('.rename-control');
            controls.forEach(control => {
                control.style.opacity = enabled ? 1 : 0.6;
            });
        }
    }

    return {
        getCaseOperation: () => _03_caseOperation?.value,
    };
}