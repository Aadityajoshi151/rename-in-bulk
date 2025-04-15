import { resetFileNames, resetSelectedFileNames } from './common.js';

export function _03_initCaseModule() {
    const _03_caseCheckbox = document.getElementById('03_caseModuleCheckbox');
    const _03_caseOperation = document.getElementById('03_caseOperation');
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows

    toggleCaseEnabled(false); // Initially disable the case operation

    if (_03_caseCheckbox) {
        _03_caseCheckbox.addEventListener('change', function () {
            toggleCaseEnabled(this.checked);
        });
    }

    if (_03_caseOperation) {
        _03_caseOperation.addEventListener('change', function () {
            if (_03_caseCheckbox.checked) {
                applyCaseOperation(this.value);
            }
        });
    }

    // Add event listeners to file checkboxes
    fileList.forEach(function (fileRow) {
        const checkbox = fileRow.querySelector('.file-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function () {
                if (_03_caseCheckbox.checked) {
                    if (checkbox.checked) {
                        applyCaseOperation(_03_caseOperation.value);
                    } else {
                        resetSelectedFileNames([fileRow]); // Reset only this file row
                    }
                }
            });
        }
    });

    function toggleCaseEnabled(enabled) {
        _03_caseOperation.disabled = !enabled;

        const module = _03_caseCheckbox.closest('.rename-module');
        if (module) {
            const controls = module.querySelectorAll('.rename-control');
            for (let i = 0; i < controls.length; i++) {
                controls[i].style.opacity = enabled ? 1 : 0.6;
            }
        }

        if (!enabled) {
            resetFileNames(fileList); // Reset all file names when the module is disabled
            _03_caseOperation.value = 'Same'; // Reset dropdown to its default value
        }
    }

    function applyCaseOperation(operation) {
        for (let i = 0; i < fileList.length; i++) {
            const fileRow = fileList[i];
            const checkbox = fileRow.querySelector('.file-checkbox'); // Checkbox for the file
            const originalNameElement = fileRow.querySelector('.file-name'); // Original name
            const newNameElement = fileRow.querySelector('.new-file-name'); // New name

            // Apply changes only if the checkbox is checked
            if (checkbox && checkbox.checked && originalNameElement && newNameElement) {
                const originalName = originalNameElement.textContent;

                // Split the filename and extension
                const lastDotIndex = originalName.lastIndexOf('.');
                const namePart = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
                const extensionPart = lastDotIndex !== -1 ? originalName.substring(lastDotIndex) : '';

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
                            .map(function (word) {
                                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                            })
                            .join(' ');
                        break;
                    case 'sentence':
                        newName = namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
                        break;
                    default:
                        newName = namePart; // No operation
                }

                // Combine the modified name with the original extension
                newNameElement.textContent = newName + extensionPart;

                // Set the new name color to green
                newNameElement.style.color = 'green';
            }
        }
    }

    return {
        getCaseOperation: function () {
            return _03_caseOperation ? _03_caseOperation.value : null;
        },
    };
}