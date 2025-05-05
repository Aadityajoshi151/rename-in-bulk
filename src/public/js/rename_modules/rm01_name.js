import { resetFileNames, 
    resetSelectedFileNames,
    splitFileName, 
    toggleModule, 
    applyToSelectedFiles, 
    handleFileCheckboxChange, 
    highlightNewName } from './common.js';

export function _01_initNameModule() {
    const _01_nameModuleCheckbox = document.getElementById('01_nameModuleCheckbox');
    const _01_nameOperation = document.getElementById('01_nameOperation');
    const _01_nameText = document.getElementById('01_nameText');
    const fileList = document.querySelectorAll('#fileList .file-item');

    // Initialize the module state
    toggleModule(_01_nameModuleCheckbox.checked, [_01_nameOperation]);
    updateInputState();

    if (_01_nameModuleCheckbox) {
        _01_nameModuleCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, [_01_nameOperation]);
            if (!this.checked) {
                resetFileNames(fileList);
                _01_nameOperation.value = 'Keep';
                _01_nameText.value = '';
                _01_nameText.disabled = true; // Always disable the input when the module is disabled
            } else {
                updateInputState(); // Update the input state based on the dropdown value
                applyNameOperation();
            }
        });
    }

    _01_nameOperation.addEventListener('change', function () {
        updateInputState(); // Enable/disable the input based on the selected dropdown option
        applyNameOperation();
    });

    _01_nameText.addEventListener('input', function () {
        if (_01_nameModuleCheckbox.checked && _01_nameOperation.value === 'Remove') {
            applyNameOperation();
        }
    });

    handleFileCheckboxChange(fileList, (fileRow, isChecked) => {
        if (isChecked) {
            applyNameOperation();
        } else {
            resetSelectedFileNames([fileRow]);
        }
    });

    function updateInputState() {
        // Enable the input only if "Remove" (New Name) is selected
        _01_nameText.disabled = _01_nameOperation.value !== 'Remove';
        if (_01_nameText.disabled) {
            _01_nameText.value = ''; // Reset the input if it's disabled
        }
    }

    function applyNameOperation() {
        // Ensure the module is enabled before applying the logic
        if (!_01_nameModuleCheckbox.checked) {
            return;
        }
        const operation = _01_nameOperation.value;
        const newName = _01_nameText.value;

        applyToSelectedFiles(fileList, (fileRow) => {
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');
            const originalName = originalNameElement.textContent;

            if (operation === 'Keep') {
                newNameElement.textContent = originalName;
            } else if (operation === 'Remove') {
                newNameElement.textContent = newName;
            } else if (operation === 'Reverse') {
                const { namePart, extensionPart } = splitFileName(originalName);
                newNameElement.textContent = namePart.split('').reverse().join('') + extensionPart;
            }

            highlightNewName(newNameElement);
        });
    }
}