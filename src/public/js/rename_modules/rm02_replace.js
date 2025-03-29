export function initReplaceModule() {
    const replaceCheckbox = document.getElementById('replaceModuleCheckbox');
    const replaceText = document.getElementById('replaceText');
    const replaceWithText = document.getElementById('replaceWithText');
    const matchCaseCheckbox = document.getElementById('replaceMatchCase');

    // Initialize disabled state
    toggleReplaceEnabled(false);
    
    if (replaceCheckbox) {
        replaceCheckbox.addEventListener('change', function() {
            toggleReplaceEnabled(this.checked);
        });
    }

    function toggleReplaceEnabled(enabled) {
        [replaceText, replaceWithText, matchCaseCheckbox].forEach(el => {
            if (el) el.disabled = !enabled;
        });
        
        // Get the parent module first
        const module = replaceCheckbox.closest('.rename-module');
        if (module) {
            const controls = module.querySelectorAll('.rename-control');
            controls.forEach(control => {
                control.style.opacity = enabled ? 1 : 0.6;
            });
        }
    }

    return {
        getReplaceText: () => replaceText?.value,
        getReplaceWithText: () => replaceWithText?.value,
        isMatchCase: () => matchCaseCheckbox?.checked,
        isReplaceEnabled: () => replaceCheckbox?.checked
    };
}