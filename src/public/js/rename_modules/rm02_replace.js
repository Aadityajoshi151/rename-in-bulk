import { 
    toggleModule, 
    resetFileNames, 
    resetSelectedFileNames, 
    applyToSelectedFiles, 
    handleFileCheckboxChange,
    handleSelectAllLogic, } from './common.js';

export function _02_initReplaceModule() {
    const _02_replaceCheckbox = document.getElementById('02_replaceModuleCheckbox');
    const _02_replaceText = document.getElementById('02_replaceText');
    const _02_replaceWithText = document.getElementById('02_replaceWithText');
    const _02_matchCaseCheckbox = document.getElementById('02_replaceMatchCase');
    const selectAllCheckbox = document.getElementById('selectAll'); // "Select All" checkbox
    const fileCheckboxes = document.querySelectorAll('.file-checkbox'); // Individual file checkboxes
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows
    const module_elements = [_02_replaceText, _02_replaceWithText, _02_matchCaseCheckbox];

    // Initialize the module state
    toggleModule(_02_replaceCheckbox.checked, module_elements);

    if (_02_replaceCheckbox) {
        _02_replaceCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, module_elements);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _02_replaceText.value = ''; // Reset replace text
                _02_replaceWithText.value = ''; // Reset replace-with text
                _02_matchCaseCheckbox.checked = false; // Reset match case checkbox
            } else {
                applyReplaceOperation(); // Apply changes when the module is enabled
            }
        });
    }

    for (let i = 0; i < module_elements.length; i++) {
        const control = module_elements[i];
        if (control) {
            control.addEventListener('input', function () {
                if (_02_replaceCheckbox.checked) {
                    applyReplaceOperation(); // Apply changes when inputs are modified
                }
            });
        }
    }

    handleFileCheckboxChange(fileList, (fileRow, isChecked) => {
        if (isChecked) {
            applyReplaceOperation(); // Apply changes to newly selected files
        } else {
            resetSelectedFileNames([fileRow]); // Reset only this file row
        }
    });

    // Add logic to handle "Select All" functionality
    handleSelectAllLogic(selectAllCheckbox, fileCheckboxes, function () {
        applyReplaceOperation(); // Reapply the replace operation to all selected files
    }, _02_replaceCheckbox, fileList);

    function applyReplaceOperation() {
        // Ensure the module is enabled before applying the logic
        if (!_02_replaceCheckbox.checked) {
            return;
        }
        const replaceText = _02_replaceText.value || '';
        const replaceWithText = _02_replaceWithText.value || '';
        const matchCase = _02_matchCaseCheckbox.checked;

        applyToSelectedFiles(fileList, (fileRow) => {
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');
            const originalName = originalNameElement.textContent;

            // Perform the replace operation
            const regexFlags = matchCase ? 'g' : 'gi';
            const regex = new RegExp(replaceText, regexFlags);
            const newName = originalName.replace(regex, replaceWithText);

            newNameElement.textContent = newName;
            newNameElement.style.color = 'green'; // Highlight the new name in green
        });
    }

    return {
        getReplaceText: function () {
            return _02_replaceText ? _02_replaceText.value : '';
        },
        getReplaceWithText: function () {
            return _02_replaceWithText ? _02_replaceWithText.value : '';
        },
        isMatchCase: function () {
            return _02_matchCaseCheckbox ? _02_matchCaseCheckbox.checked : false;
        },
        isReplaceEnabled: function () {
            return _02_replaceCheckbox ? _02_replaceCheckbox.checked : false;
        },
    };
}