import { 
    splitFileName, 
    toggleModule, 
    resetFileNames, 
    resetSelectedFileNames, 
    applyToSelectedFiles, 
    handleFileCheckboxChange, 
    highlightNewName } from './common.js';

export function _03_initCaseModule() {
    const _03_caseCheckbox = document.getElementById('03_caseModuleCheckbox');
    const _03_caseOperation = document.getElementById('03_caseOperation');
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows

    // Initialize the module state
    toggleModule(_03_caseCheckbox.checked, [_03_caseOperation]);

    if (_03_caseCheckbox) {
        _03_caseCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, [_03_caseOperation]);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _03_caseOperation.value = 'Same'; // Reset dropdown to its default value
            } else {
                applyCaseOperation(_03_caseOperation.value); // Apply changes when the module is enabled
            }
        });
    }

    if (_03_caseOperation) {
        _03_caseOperation.addEventListener('change', function () {
            if (_03_caseCheckbox.checked) {
                applyCaseOperation(this.value); // Apply changes when the dropdown value changes
            }
        });
    }

    handleFileCheckboxChange(fileList, (fileRow, isChecked) => {
        if (isChecked) {
            applyCaseOperation(_03_caseOperation.value); // Apply changes to newly selected files
        } else {
            resetSelectedFileNames([fileRow]); // Reset only this file row
        }
    });

    function applyCaseOperation(operation) {
        applyToSelectedFiles(fileList, (fileRow) => {
            const checkbox = fileRow.querySelector('.file-checkbox');
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');

            if (checkbox && checkbox.checked && originalNameElement && newNameElement) {
                const { namePart, extensionPart } = splitFileName(originalNameElement.textContent);

                let newName = namePart;
                switch (operation) {
                    case 'upper':
                        newName = namePart.toUpperCase();
                        break;
                    case 'lower':
                        newName = namePart.toLowerCase();
                        break;
                    case 'title':
                        newName = namePart
                            .split(' ')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(' ');
                        break;
                    case 'sentence':
                        newName = namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
                        break;
                    case 'alternate':
                        newName = namePart
                            .split('')
                            .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
                            .join('');
                        break;
                    default:
                        newName = namePart; // Default to the original name
                }

                newNameElement.textContent = newName + extensionPart;
                highlightNewName(newNameElement); // Highlight the new name in green
            }
        });
    }

    return {
        getCaseOperation: function () {
            return _03_caseOperation ? _03_caseOperation.value : 'Same';
        },
        isCaseModuleEnabled: function () {
            return _03_caseCheckbox ? _03_caseCheckbox.checked : false;
        },
    };
}