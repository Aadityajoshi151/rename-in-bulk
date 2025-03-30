export function initReplaceModule() {
    const _02_replaceCheckbox = document.getElementById('02_replaceModuleCheckbox');
    const _02_replaceText = document.getElementById('02_replaceText');
    const _02_replaceWithText = document.getElementById('02_replaceWithText');
    const _02_matchCaseCheckbox = document.getElementById('02_replaceMatchCase');

    // Initialize disabled state
    toggleReplaceEnabled(false);
    
    if (_02_replaceCheckbox) {
        _02_replaceCheckbox.addEventListener('change', function() {
            toggleReplaceEnabled(this.checked);
        });
    }

    function toggleReplaceEnabled(enabled) {
        [_02_replaceText, _02_replaceWithText, _02_matchCaseCheckbox].forEach(el => {
            if (el) el.disabled = !enabled;
        });
        
        // Get the parent module first
        const module = _02_replaceCheckbox.closest('.rename-module');
        if (module) {
            const controls = module.querySelectorAll('.rename-control');
            controls.forEach(control => {
                control.style.opacity = enabled ? 1 : 0.6;
            });
        }
    }

    return {
        getReplaceText: () => _02_replaceText?.value,
        getReplaceWithText: () => _02_replaceWithText?.value,
        isMatchCase: () => _02_matchCaseCheckbox?.checked,
        isReplaceEnabled: () => _02_replaceCheckbox?.checked
    };
}