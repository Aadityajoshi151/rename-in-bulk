export function splitFileName(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.');
    const namePart = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
    const extensionPart = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
    return { namePart, extensionPart };
}

export function toggleModule(enabled, controls) {
    for (let i = 0; i < controls.length; i++) {
        controls[i].disabled = !enabled;
        if (!enabled) {
            // Reset the value of the control if it's disabled
            if (controls[i].tagName === 'SELECT') {
                controls[i].value = controls[i].options[0].value; // Reset to the first option
            } else if (controls[i].tagName === 'INPUT') {
                controls[i].value = ''; // Clear the input field
            }
        }
    }
}

export function applyToSelectedFiles(fileList, callback) {
    for (let i = 0; i < fileList.length; i++) {
        const fileRow = fileList[i];
        const checkbox = fileRow.querySelector('.file-checkbox');
        if (checkbox && checkbox.checked) {
            callback(fileRow);
        }
    }
}

export function handleFileCheckboxChange(fileList, callback) {
    for (let i = 0; i < fileList.length; i++) {
        const fileRow = fileList[i];
        const checkbox = fileRow.querySelector('.file-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function () {
                callback(fileRow, checkbox.checked);
            });
        }
    }
}

export function highlightNewName(element) {
    element.style.color = 'green';
}

export function resetFileNames(fileList) {
    fileList.forEach(function (fileRow) {
        const originalNameElement = fileRow.querySelector('.file-name');
        const newNameElement = fileRow.querySelector('.new-file-name');

        if (originalNameElement && newNameElement) {
            newNameElement.textContent = '--'; // Reset to default placeholder
            newNameElement.style.color = ''; // Reset color
        }
    });
}

export function resetSelectedFileNames(fileList) {
    fileList.forEach(function (fileRow) {
        const checkbox = fileRow.querySelector('.file-checkbox');
        const newNameElement = fileRow.querySelector('.new-file-name');

        if (checkbox && newNameElement) {
            if (!checkbox.checked) {
                newNameElement.textContent = '--'; // Reset to default placeholder
                newNameElement.style.color = ''; // Reset color
            }
        }
    });
}

export function handleSelectAllLogic(selectAllCheckbox, fileCheckboxes, applyOperation, moduleCheckbox, fileList) {
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function () {
            const isChecked = this.checked;

            // Select or deselect all file checkboxes
            for (let i = 0; i < fileCheckboxes.length; i++) {
                fileCheckboxes[i].checked = isChecked;
            }

            // Reapply the module operation if the module is enabled
            if (moduleCheckbox && moduleCheckbox.checked) {
                if (isChecked) {
                    applyOperation(); // Apply operation when "Select All" is checked
                } else {
                    resetFileNames(fileList); // Reset file names when "Select All" is unchecked
                }
            }
        });
    }
}