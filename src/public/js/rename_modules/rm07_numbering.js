import { 
    toggleModule, 
    resetFileNames, 
    resetSelectedFileNames, 
    splitFileName, 
    applyToSelectedFiles, 
    handleFileCheckboxChange,
    handleSelectAllLogic,
    highlightNewName } from './common.js';

export function _07_initNumberingModule() {
    const _07_numberingCheckbox = document.getElementById('07_numberingModuleCheckbox');
    const _07_numberingMode = document.getElementById('07_numberingMode'); // Dropdown for prefix/suffix/at position
    const _07_atPosition = document.getElementById('07_at_Position'); // Input for position
    const _07_startIndex = document.getElementById('07_start_index'); // Input for starting index
    const _07_increment = document.getElementById('07_increment'); // Input for increment
    const _07_padding = document.getElementById('07_padding'); // Input for zero padding
    const selectAllCheckbox = document.getElementById('selectAll'); // "Select All" checkbox
    const fileCheckboxes = document.querySelectorAll('.file-checkbox'); // Individual file checkboxes
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows
    const module_elements = [_07_numberingMode, _07_atPosition, _07_startIndex, _07_increment, _07_padding];

    // Initialize the module state
    toggleModule(_07_numberingCheckbox.checked, module_elements);
    updateAtPositionState();
    setDefaultValues();

    if (_07_numberingCheckbox) {
        _07_numberingCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, module_elements);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                resetInputs(); // Reset all inputs to their default values
            } else {
                applyNumberingOperation(); // Apply changes when the module is enabled
            }
        });
    }

    if (_07_numberingMode) {
        _07_numberingMode.addEventListener('change', function () {
            updateAtPositionState(); // Enable/disable "At Pos" input based on the selected mode
            if (_07_numberingCheckbox.checked) {
                applyNumberingOperation(); // Reapply numbering operation when mode changes
            }
        });
    }

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

    handleFileCheckboxChange(fileList, function (fileRow, isChecked) {
        if (isChecked) {
            applyNumberingOperation(); // Apply changes to newly selected files
        } else {
            resetSelectedFileNames([fileRow]); // Reset only this file row
        }
    });

        // Add logic to handle "Select All" functionality
    handleSelectAllLogic(selectAllCheckbox, fileCheckboxes, function () {
        applyNumberingOperation(); // Reapply the numbering operation to all selected files
    }, _07_numberingCheckbox, fileList);

    function applyNumberingOperation() {
        // Ensure the module is enabled before applying the logic
        if (!_07_numberingCheckbox.checked) {
            return;
        }
        const mode = _07_numberingMode.value || 'Prefix'; // Get numbering mode
        const atPosition = parseInt(_07_atPosition.value, 10); // Get position input
        const startIndex = parseInt(_07_startIndex.value, 10) || 0; // Get starting index
        const increment = parseInt(_07_increment.value, 10) || 1; // Get increment value
        const padding = parseInt(_07_padding.value, 10) || 0; // Get zero padding value

        let currentIndex = startIndex;

        applyToSelectedFiles(fileList, function (fileRow) {
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');
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
            highlightNewName(newNameElement); // Highlight the new name in green

            // Increment the current index
            currentIndex += increment;
        });
    }

    function updateAtPositionState() {
        if (_07_numberingMode.value === 'AtPosition') {
            _07_atPosition.disabled = false; // Enable "At Pos" input
        } else {
            _07_atPosition.disabled = true; // Disable "At Pos" input
            _07_atPosition.value = '0'; // Reset "At Pos" input
        }
    }

    function resetInputs() {
        _07_numberingMode.value = 'Suffix'; // Reset dropdown to default
        _07_atPosition.value = '0'; // Reset position input
        _07_atPosition.disabled = true; // Disable "At Pos" input
        _07_startIndex.value = '0'; // Reset start index input
        _07_increment.value = '1'; // Reset increment input
        _07_padding.value = '0'; // Reset padding input
    }

    function setDefaultValues() {
        _07_atPosition.value = '0';
        _07_startIndex.value = '0';
        _07_increment.value = '1';
        _07_padding.value = '0';
        _07_numberingMode.value = 'Suffix'; // Default to prefix
        _07_atPosition.disabled = true; // Disable "At Pos" input by default
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