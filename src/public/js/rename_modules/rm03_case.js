import { splitFileName, toggleModule, resetFileNames, resetSelectedFileNames } from './common.js';

export function _03_initCaseModule() {
    const _03_caseCheckbox = document.getElementById('03_caseModuleCheckbox');
    const _03_caseOperation = document.getElementById('03_caseOperation');
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows

    toggleModule(false, _03_caseCheckbox.closest('.rename-module'), _03_caseOperation); // Initially disable the module

    if (_03_caseCheckbox) {
        _03_caseCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, _03_caseCheckbox.closest('.rename-module'), _03_caseOperation);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _03_caseOperation.value = 'Same'; // Reset dropdown to its default value
            }
        });
    }

    if (_03_caseOperation) {
        _03_caseOperation.addEventListener('change', function () {
            if (_03_caseCheckbox.checked) {
                applyCaseOperation(this.value);
            }
        });
    }

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

    function applyCaseOperation(operation) {
        fileList.forEach(function (fileRow) {
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
                            .map(function (word) {
                                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                            })
                            .join(' ');
                        break;
                    case 'sentence':
                        newName = namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
                        break;
                    case 'alternate':
                        newName = namePart
                            .split('')
                            .map(function (char, index) {
                                return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
                            })
                            .join('');
                        break;
                    default:
                        newName = namePart; 
                }

                newNameElement.textContent = newName + extensionPart;
                newNameElement.style.color = 'green';
            }
        });
    }
}