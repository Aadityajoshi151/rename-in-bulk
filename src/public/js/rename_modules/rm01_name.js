import { resetFileNames, resetSelectedFileNames, splitFileName } from './common.js';

export function _01_initNameModule() {
    const _01_nameModuleCheckbox = document.getElementById('01_nameModuleCheckbox');
    const _01_nameOperation = document.getElementById('01_nameOperation');
    const _01_nameText = document.getElementById('01_nameText');
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows

    if (_01_nameModuleCheckbox) {
        // Initialize disabled state (checkbox unchecked by default)
        toggleModuleEnabled(false);

        _01_nameModuleCheckbox.addEventListener('change', function () {
            toggleModuleEnabled(this.checked);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _01_nameOperation.value = 'Keep'; // Reset dropdown to default
                _01_nameText.value = ''; // Reset input field
                _01_nameText.disabled = true; // Disable input field
            } else {
                applyNameOperation(); // Apply changes when the module is enabled
            }
        });
    }

    _01_nameOperation.addEventListener('change', function () {
        if (this.value === 'Remove') {
            _01_nameText.disabled = false; // Enable input field
        } else {
            _01_nameText.disabled = true; // Disable input field
            _01_nameText.value = ''; // Reset input field
        }
        applyNameOperation(); // Apply changes when the dropdown value changes
    });

    _01_nameText.addEventListener('input', function () {
        if (_01_nameModuleCheckbox.checked && _01_nameOperation.value === 'Remove') {
            applyNameOperation(); // Apply changes when the input value changes
        }
    });

    for (let i = 0; i < fileList.length; i++) {
        const fileRow = fileList[i];
        const checkbox = fileRow.querySelector('.file-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function () {
                if (_01_nameModuleCheckbox.checked) {
                    if (checkbox.checked) {
                        applyNameOperation(); // Apply changes to newly selected files
                    } else {
                        resetSelectedFileNames([fileRow]); // Reset only this file row
                    }
                }
            });
        }
    }

    function toggleModuleEnabled(enabled) {
        _01_nameOperation.disabled = !enabled;
        _01_nameText.disabled = !enabled || _01_nameOperation.value !== 'Remove';

        // Visual feedback
        const controls = document.querySelectorAll('.rename-module-content .rename-control');
        for (let i = 0; i < controls.length; i++) {
            controls[i].style.opacity = enabled ? 1 : 0.6;
        }
    }

    function applyNameOperation() {
        const operation = _01_nameOperation.value;
        const newName = _01_nameText.value;

        for (let i = 0; i < fileList.length; i++) {
            const fileRow = fileList[i];
            const checkbox = fileRow.querySelector('.file-checkbox');
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');

            if (checkbox && checkbox.checked && originalNameElement && newNameElement) {
                const originalName = originalNameElement.textContent;

                if (operation === 'Keep') {
                    // Keep the original name
                    newNameElement.textContent = originalName;
                } else if (operation === 'Remove') {
                    // Replace the name with the input value
                    newNameElement.textContent = newName;
                } else if (operation === 'Reverse') {
                    // Reverse the original name (excluding the extension)
                    const { namePart, extensionPart } = splitFileName(originalName);
                    const reversedName = namePart.split('').reverse().join('');
                    newNameElement.textContent = reversedName + extensionPart;
                }

                newNameElement.style.color = 'green'; // Highlight the new name in green
            }
        }
    }

    return {
        get01_nameOperation: () => _01_nameOperation?.value,
        get01_nameText: () => _01_nameText?.value,
        isNameModuleEnabled: () => _01_nameModuleCheckbox?.checked,
    };
}