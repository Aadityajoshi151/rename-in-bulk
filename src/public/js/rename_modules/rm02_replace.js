import { toggleModule, resetFileNames, resetSelectedFileNames, processFileName, resetFileNamesPreservingExtension } from './common.js';

export function _02_initReplaceModule() {
    const _02_replaceCheckbox = document.getElementById('02_replaceModuleCheckbox');
    const _02_replaceText = document.getElementById('02_replaceText');
    const _02_replaceWithText = document.getElementById('02_replaceWithText');
    const _02_matchCaseCheckbox = document.getElementById('02_replaceMatchCase');
    const affectExtensionCheckbox = document.getElementById('affect_extension');
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows
    const module_elements = [_02_replaceText, _02_replaceWithText, _02_matchCaseCheckbox];

    toggleModule(false, _02_replaceCheckbox.closest('.rename-module'), module_elements);

    if (_02_replaceCheckbox) {
        _02_replaceCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, _02_replaceCheckbox.closest('.rename-module'), module_elements);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _02_replaceText.value = ''; // Reset replace text
                _02_replaceWithText.value = ''; // Reset replace-with text
                _02_matchCaseCheckbox.checked = false; // Reset match case checkbox
            }
        });
    }

    affectExtensionCheckbox.addEventListener('change', function () {
        if (_02_replaceCheckbox.checked) {
            // Reset file names and reapply the replace operation
            resetFileNamesPreservingExtension(fileList, this.checked);
            applyReplaceOperation();
        }
    });

    for (let i = 0; i < module_elements.length; i++) {
        const control = module_elements[i];
        if (control) {
            control.addEventListener('input', function () {
                if (_02_replaceCheckbox.checked) {
                    applyReplaceOperation();
                }
            });
        }
    }

    for (let i = 0; i < fileList.length; i++) {
        const fileRow = fileList[i];
        const checkbox = fileRow.querySelector('.file-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function () {
                if (_02_replaceCheckbox.checked) {
                    if (checkbox.checked) {
                        applyReplaceOperation();
                    } else {
                        resetSelectedFileNames([fileRow]); // Reset only this file row
                    }
                }
            });
        }
    }

    function applyReplaceOperation() {
        const replaceText = _02_replaceText.value || '';
        const replaceWithText = _02_replaceWithText.value || '';
        const matchCase = _02_matchCaseCheckbox.checked;
        const affectExtension = affectExtensionCheckbox.checked;

        for (let i = 0; i < fileList.length; i++) {
            const fileRow = fileList[i];
            const checkbox = fileRow.querySelector('.file-checkbox');
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');

            if (checkbox && checkbox.checked && originalNameElement && newNameElement) {
                const originalName = originalNameElement.textContent;

                // Use the common function to process the file name
                const newName = processFileName(originalName, affectExtension, function (name) {
                    const regexFlags = matchCase ? 'g' : 'gi';
                    const regex = new RegExp(replaceText, regexFlags);
                    return name.replace(regex, replaceWithText);
                });

                newNameElement.textContent = newName;
                newNameElement.style.color = 'green'; // Highlight the new name in green
            }
        }
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