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
            if (checkbox.checked) {
                // Keep the new name as is (handled elsewhere)
            } else {
                // Reset the new name if the checkbox is unchecked
                newNameElement.textContent = '--'; // Reset to default placeholder
                newNameElement.style.color = ''; // Reset color
            }
        }
    });
}