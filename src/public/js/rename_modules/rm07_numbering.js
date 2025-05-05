import { toggleModule, resetFileNames, resetSelectedFileNames, splitFileName } from './common.js';

export function _07_initNumberingModule() {
    const _07_numberingCheckbox = document.getElementById('07_numberingModuleCheckbox');
    const _07_numberingMode = document.getElementById('07_numberingMode'); // Dropdown for prefix/suffix/at position
    const _07_atPosition = document.getElementById('07_at_Position'); // Input for position
    const _07_startIndex = document.getElementById('07_start_index'); // Input for starting index
    const _07_increment = document.getElementById('07_increment'); // Input for increment
    const _07_padding = document.getElementById('07_padding'); // Input for zero padding
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows
    const module_elements = [_07_numberingMode, _07_atPosition, _07_startIndex, _07_increment, _07_padding];

    // Initialize disabled state
    toggleModule(false, _07_numberingCheckbox.closest('.rename-module'), module_elements);

    if (_07_numberingCheckbox) {
        _07_numberingCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, _07_numberingCheckbox.closest('.rename-module'), module_elements);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _07_numberingMode.value = 'Prefix'; // Reset dropdown to default
                _07_atPosition.value = '0'; // Reset position input
                _07_atPosition.disabled = true; // Disable "At Pos" input
                _07_startIndex.value = '0'; // Reset start index input
                _07_increment.value = '1'; // Reset increment input
                _07_padding.value = '0'; // Reset padding input
            } else {
                applyNumberingOperation(); // Apply changes to all selected files when the module is enabled
            }
        });
    }

    // Enable or disable "At Pos" input based on the selected mode
    _07_numberingMode.addEventListener('change', function () {
        if (this.value === 'AtPosition') {
            _07_atPosition.disabled = false; // Enable "At Pos" input
        } else {
            _07_atPosition.disabled = true; // Disable "At Pos" input
            _07_atPosition.value = '0'; // Reset "At Pos" input
        }
        applyNumberingOperation(); // Reapply numbering operation when mode changes
    });

    for (let i = 0; i < module_elements.length; i++) {
        const control = module_elements[i];
        if (control) {
            control.addEventListener('input', function () {
                if (_07_numberingCheckbox.checked) {
                    applyNumberingOperation(); // Apply changes when inputs are modified
                }
            });
        }
    }

    for (let i = 0; i < fileList.length; i++) {
        const fileRow = fileList[i];
        const checkbox = fileRow.querySelector('.file-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function () {
                if (_07_numberingCheckbox.checked) {
                    if (checkbox.checked) {
                        applyNumberingOperation(); // Apply changes to newly selected files
                    } else {
                        resetSelectedFileNames([fileRow]); // Reset only this file row
                    }
                }
            });
        }
    }

    function applyNumberingOperation() {
        const mode = _07_numberingMode.value || 'Prefix'; // Get numbering mode
        const atPosition = parseInt(_07_atPosition.value, 10); // Get position input
        const startIndex = parseInt(_07_startIndex.value, 10) || 0; // Get starting index
        const increment = parseInt(_07_increment.value, 10) || 1; // Get increment value
        const padding = parseInt(_07_padding.value, 10) || 0; // Get zero padding value

        let currentIndex = startIndex;

        for (let i = 0; i < fileList.length; i++) {
            const fileRow = fileList[i];
            const checkbox = fileRow.querySelector('.file-checkbox');
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');

            if (checkbox && checkbox.checked && originalNameElement && newNameElement) {
                const originalName = originalNameElement.textContent;

                // Split the file name into namePart and extensionPart
                const { namePart, extensionPart } = splitFileName(originalName);

                let newName = namePart;

                // Format the number with zero padding
                const formattedNumber = String(currentIndex).padStart(padding, '0');

                // Add numbering based on the selected mode
                if (mode === 'Prefix') {
                    newName = formattedNumber + newName;
                } else if (mode === 'Suffix') {
                    newName = newName + formattedNumber;
                } else if (mode === 'AtPosition' && !isNaN(atPosition) && atPosition >= 0 && atPosition <= newName.length) {
                    newName = newName.substring(0, atPosition) + formattedNumber + newName.substring(atPosition);
                }

                // Combine the modified namePart with the original extensionPart
                newNameElement.textContent = newName + extensionPart;
                newNameElement.style.color = 'green'; // Highlight the new name in green

                // Increment the current index
                currentIndex += increment;
            }
        }
    }

    return {
        getNumberingMode: function () {
            return _07_numberingMode ? _07_numberingMode.value : 'Prefix';
        },
        getAtPosition: function () {
            return _07_atPosition ? _07_atPosition.value : '0';
        },
        getStartIndex: function () {
            return _07_startIndex ? _07_startIndex.value : '0';
        },
        getIncrement: function () {
            return _07_increment ? _07_increment.value : '1';
        },
        getPadding: function () {
            return _07_padding ? _07_padding.value : '0';
        },
        isNumberingEnabled: function () {
            return _07_numberingCheckbox ? _07_numberingCheckbox.checked : false;
        },
    };
}