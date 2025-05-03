import { toggleModule, resetFileNames, resetSelectedFileNames } from './common.js';

export function _04_initRemoveModule() {
    const _04_removeCheckbox = document.getElementById('04_removeModuleCheckbox');
    const _04_first_n = document.getElementById('04_first_n_Text');
    const _04_last_n = document.getElementById('04_last_n_Text');
    const _04_from = document.getElementById('04_from_Text');
    const _04_to = document.getElementById('04_to_Text');
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows
    const module_elements = [_04_first_n, _04_last_n, _04_from, _04_to];

    // Initialize disabled state
    toggleModule(false, _04_removeCheckbox.closest('.rename-module'), module_elements);

    if (_04_removeCheckbox) {
        _04_removeCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, _04_removeCheckbox.closest('.rename-module'), module_elements);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _04_first_n.value = ''; // Reset First N input
                _04_last_n.value = ''; // Reset Last N input
                _04_from.value = ''; // Reset From input
                _04_to.value = ''; // Reset To input
            } else {
                applyRemoveOperation(); // Apply changes to all selected files when the module is enabled
            }
        });
    }

    for (let i = 0; i < module_elements.length; i++) {
        const control = module_elements[i];
        if (control) {
            control.addEventListener('input', function () {
                if (_04_removeCheckbox.checked) {
                    applyRemoveOperation(); // Apply changes when inputs are modified
                }
            });
        }
    }

    fileList.forEach(function (fileRow) {
        const checkbox = fileRow.querySelector('.file-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function () {
                if (_04_removeCheckbox.checked) {
                    if (checkbox.checked) {
                        applyRemoveOperation(); // Apply changes to newly selected files
                    } else {
                        resetSelectedFileNames([fileRow]); // Reset only this file row
                    }
                }
            });
        }
    });

    function applyRemoveOperation() {
        const firstN = parseInt(_04_first_n.value, 10) || 0;
        const lastN = parseInt(_04_last_n.value, 10) || 0;
        const fromIndex = parseInt(_04_from.value, 10) || 0;
        const toIndex = parseInt(_04_to.value, 10) || 0;

        for (let i = 0; i < fileList.length; i++) {
            const fileRow = fileList[i];
            const checkbox = fileRow.querySelector('.file-checkbox');
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');

            if (checkbox && checkbox.checked && originalNameElement && newNameElement) {
                const originalName = originalNameElement.textContent;

                let newName = originalName;

                // Remove First N Characters
                if (firstN > 0) {
                    newName = newName.substring(firstN);
                }

                // Remove Last N Characters
                if (lastN > 0) {
                    newName = newName.substring(0, newName.length - lastN);
                }

                // Remove Range (From and To)
                if (fromIndex >= 0 && toIndex > fromIndex) {
                    newName = newName.substring(0, fromIndex) + newName.substring(toIndex + 1);
                }

                newNameElement.textContent = newName;
                newNameElement.style.color = 'green'; // Highlight the new name in green
            }
        }
    }

    return {
        getFirstN: function () {
            return _04_first_n ? _04_first_n.value : '';
        },
        getLastN: function () {
            return _04_last_n ? _04_last_n.value : '';
        },
        getFromIndex: function () {
            return _04_from ? _04_from.value : '';
        },
        getToIndex: function () {
            return _04_to ? _04_to.value : '';
        },
        isRemoveEnabled: function () {
            return _04_removeCheckbox ? _04_removeCheckbox.checked : false;
        },
    };
}