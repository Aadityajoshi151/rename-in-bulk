import { 
    toggleModule, 
    resetFileNames, 
    resetSelectedFileNames, 
    splitFileName, 
    applyToSelectedFiles, 
    handleFileCheckboxChange,
    handleSelectAllLogic,
    highlightNewName } from './common.js';

export function _06_initFolderNameModule() {
    const _06_folderNameCheckbox = document.getElementById('06_folderNameModuleCheckbox');
    const _06_folderNameMode = document.getElementById('06_folderNameMode'); // Dropdown for prefix/suffix
    const _06_separator = document.getElementById('06_separator'); // Input for separator
    const selectAllCheckbox = document.getElementById('selectAll'); // "Select All" checkbox
    const fileCheckboxes = document.querySelectorAll('.file-checkbox'); // Individual file checkboxes
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows
    const module_elements = [_06_folderNameMode, _06_separator];

    // Initialize the module state
    toggleModule(_06_folderNameCheckbox.checked, module_elements);

    if (_06_folderNameCheckbox) {
        _06_folderNameCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, module_elements);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _06_folderNameMode.value = 'Prefix'; // Reset dropdown to default
                _06_separator.value = ''; // Reset separator input
            } else {
                applyFolderNameOperation(); // Apply changes when the module is enabled
            }
        });
    }

    for (let i = 0; i < module_elements.length; i++) {
        const control = module_elements[i];
        if (control) {
            control.addEventListener('input', function () {
                if (_06_folderNameCheckbox.checked) {
                    applyFolderNameOperation(); // Apply changes when inputs are modified
                }
            });
        }
    }

    handleFileCheckboxChange(fileList, function (fileRow, isChecked) {
        if (isChecked) {
            applyFolderNameOperation(); // Apply changes to newly selected files
        } else {
            resetSelectedFileNames([fileRow]); // Reset only this file row
        }
    });

        // Add logic to handle "Select All" functionality
    handleSelectAllLogic(selectAllCheckbox, fileCheckboxes, function () {
        applyFolderNameOperation(); // Reapply the folder name operation to all selected files
    }, _06_folderNameCheckbox, fileList);

    function applyFolderNameOperation() {
        // Ensure the module is enabled before applying the logic
        if (!_06_folderNameCheckbox.checked) {
            return;
        }
        const folderName = getCurrentFolderNameFromURL(); // Dynamically fetch the current folder name
        const mode = _06_folderNameMode.value || 'Prefix'; // Get prefix/suffix mode
        const separator = _06_separator.value || ''; // Get separator value

        applyToSelectedFiles(fileList, function (fileRow) {
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');
            const originalName = originalNameElement.textContent;

            // Split the file name into namePart and extensionPart
            const { namePart, extensionPart } = splitFileName(originalName);

            let newName = namePart;

            // Add folder name as prefix or suffix
            if (mode === 'Prefix') {
                newName = folderName + separator + newName;
            } else if (mode === 'Suffix') {
                newName = newName + separator + folderName;
            }

            // Combine the modified namePart with the original extensionPart
            newNameElement.textContent = newName + extensionPart;
            highlightNewName(newNameElement); // Highlight the new name in green
        });
    }

    function getCurrentFolderNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search); // Parse the query string
        const dirPath = urlParams.get('dir'); // Get the value of the 'dir' parameter

        if (dirPath) {
            const decodedPath = decodeURIComponent(dirPath); // Decode the URL-encoded path
            const pathParts = decodedPath.split('/'); // Split the path into parts
            return pathParts[pathParts.length - 1] || ''; // Return the last part as the folder name
        }

        return ''; // Return an empty string if 'dir' is not present
    }

    return {
        getFolderNameMode: function () {
            return _06_folderNameMode ? _06_folderNameMode.value : 'Prefix';
        },
        getSeparator: function () {
            return _06_separator ? _06_separator.value : '';
        },
        isFolderNameEnabled: function () {
            return _06_folderNameCheckbox ? _06_folderNameCheckbox.checked : false;
        },
    };
}