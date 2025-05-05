import { 
    toggleModule, 
    resetFileNames, 
    resetSelectedFileNames, 
    splitFileName, 
    applyToSelectedFiles, 
    handleFileCheckboxChange, 
    highlightNewName } from './common.js';

export function _05_initAddModule() {
    const _05_addCheckbox = document.getElementById('05_addModuleCheckbox');
    const _05_prefixText = document.getElementById('05_prefix_Text');
    const _05_suffixText = document.getElementById('05_suffix_Text');
    const _05_insertText = document.getElementById('05_insert_Text');
    const _05_insertPosition = document.getElementById('05_insert_Position');
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows
    const module_elements = [_05_prefixText, _05_suffixText, _05_insertText, _05_insertPosition];

    // Initialize the module state
    toggleModule(_05_addCheckbox.checked, module_elements);
    _05_insertPosition.value = '0';

    if (_05_addCheckbox) {
        _05_addCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, module_elements);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _05_prefixText.value = ''; // Reset prefix input
                _05_suffixText.value = ''; // Reset suffix input
                _05_insertText.value = ''; // Reset insert text input
                _05_insertPosition.value = ''; // Reset insert position input
            } else {
                applyAddOperation(); // Apply changes when the module is enabled
            }
        });
    }

    for (let i = 0; i < module_elements.length; i++) {
        const control = module_elements[i];
        if (control) {
            control.addEventListener('input', function () {
                if (_05_addCheckbox.checked) {
                    applyAddOperation(); // Apply changes when inputs are modified
                }
            });
        }
    }

    handleFileCheckboxChange(fileList, function (fileRow, isChecked) {
        if (isChecked) {
            applyAddOperation(); // Apply changes to newly selected files
        } else {
            resetSelectedFileNames([fileRow]); // Reset only this file row
        }
    });

    function applyAddOperation() {
        // Ensure the module is enabled before applying the logic
        if (!_05_addCheckbox.checked) {
            return;
        }
        const prefix = _05_prefixText.value || '';
        const suffix = _05_suffixText.value || '';
        const insertText = _05_insertText.value || '';
        const insertPosition = parseInt(_05_insertPosition.value, 10) || 0;

        applyToSelectedFiles(fileList, function (fileRow) {
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');
            const originalName = originalNameElement.textContent;

            // Split the file name into namePart and extensionPart
            const { namePart, extensionPart } = splitFileName(originalName);

            let newName = namePart;

            // Add prefix
            if (prefix) {
                newName = prefix + newName;
            }

            // Add suffix
            if (suffix) {
                newName = newName + suffix;
            }

            // Insert text at the specified position
            if (insertText && insertPosition >= 0 && insertPosition <= newName.length) {
                newName = newName.substring(0, insertPosition) + insertText + newName.substring(insertPosition);
            }

            // Combine the modified namePart with the original extensionPart
            newNameElement.textContent = newName + extensionPart;
            highlightNewName(newNameElement); // Highlight the new name in green
        });
    }

    return {
        getPrefix: function () {
            return _05_prefixText ? _05_prefixText.value : '';
        },
        getSuffix: function () {
            return _05_suffixText ? _05_suffixText.value : '';
        },
        getInsertText: function () {
            return _05_insertText ? _05_insertText.value : '';
        },
        getInsertPosition: function () {
            return _05_insertPosition ? _05_insertPosition.value : '';
        },
        isAddEnabled: function () {
            return _05_addCheckbox ? _05_addCheckbox.checked : false;
        },
    };
}