let newCurrent;

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector(".table-container table tbody");
    const rows = [];
    const statusPopup = document.getElementById('statusPopups');
    const personPopup = document.getElementById('statusPopup');
    const dependencyPopup = document.getElementById('dependencyPopup');
    const tagPopup = document.getElementById('tagsPopup');
    let currentCell;
    let lastClickedButton;

    function addTableRow() {
        const checkboxCell = document.createElement("td");
        const itemCell = document.createElement("td");
        const personCell = document.createElement("td");
        const statusCell = document.createElement("td");
        const dateCell = document.createElement("td");
        const textCell = document.createElement("td");
        const tagCell = document.createElement("td");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const itemInput = document.createElement("input");
        itemInput.type = "text";
        itemInput.placeholder = "Add item";
        itemInput.className = "item-input";
        const dateInput = document.createElement("input");
        dateInput.type = "date";

        personCell.textContent = "";
        statusCell.textContent = "";
        personCell.className = "person-cell"; 
        statusCell.className = "status-cell";
        textCell.className = "text-cell";
        tagCell.className = "tags-cell";
        textCell.textContent = "";
        tagCell.textContent = "";

        checkboxCell.appendChild(checkbox);
        itemCell.appendChild(itemInput);
        dateCell.appendChild(dateInput);
        const newRow = document.createElement("tr");
        newRow.appendChild(checkboxCell);
        newRow.appendChild(itemCell);
        newRow.appendChild(personCell);
        newRow.appendChild(statusCell);
        newRow.appendChild(dateCell);
        newRow.appendChild(textCell);
        newRow.appendChild(tagCell);
        // newRow.currentCell = personCell; 
        tableBody.appendChild(newRow);
        itemInput.addEventListener("keydown", handleEnterKey);

        personCell.addEventListener('click', function (event) {
            console.log("person1");
            event.stopPropagation();
            currentCell = personCell;
            const rect = personCell.getBoundingClientRect();
            personPopup.style.top = `${rect.bottom + window.scrollY}px`;
            personPopup.style.left = `${rect.left + window.scrollX}px`;
            personPopup.style.display = 'block';
        });

        textCell.addEventListener('click', function (event) {
            event.stopPropagation();
            currentCell = textCell;
            const rect = textCell.getBoundingClientRect();
            dependencyPopup.style.top = `${rect.bottom + window.scrollY}px`;
            dependencyPopup.style.left = `${rect.left + window.scrollX}px`;
            dependencyPopup.style.display = 'block';
        });

        tagCell.addEventListener('click', function (event) {
            event.stopPropagation();
            currentCell = tagCell;
            const rect = tagCell.getBoundingClientRect();
            tagPopup.style.top = `${rect.bottom + window.scrollY}px`;
            tagPopup.style.left = `${rect.left + window.scrollX}px`;
            tagPopup.style.display = 'block';
        });

        statusCell.addEventListener('click', function (event) {
            event.stopPropagation();
            currentCell = statusCell;
            const rect = statusCell.getBoundingClientRect();
            statusPopup.style.top = `${rect.bottom + window.scrollY}px`;
            statusPopup.style.left = `${rect.left + window.scrollX}px`;
            statusPopup.style.display = 'block';
        });

        rows.push(newRow);
    }


    function handleEnterKey(event) {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            addTableRow();
            event.target.removeEventListener("keydown", handleEnterKey);
        }
    }

    function togglePersonPopup(cell, event) {
        currentCell = cell;
        const rect = cell.getBoundingClientRect();
        personPopup.style.top = `${rect.bottom + window.scrollY}px`;
        personPopup.style.left = `${rect.left + window.scrollX}px`;
        personPopup.style.display = 'block';
        event.stopPropagation();
    }

    const statusButtons = document.querySelectorAll('.status-button');
    statusButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            console.log("status");
            const color = button.style.backgroundColor;
            const label = button.textContent;
            currentCell.style.backgroundColor = color;
            currentCell.textContent = label;
            event.stopPropagation();
            statusPopup.style.display = 'none';
        });
    });

    const personButtons = document.querySelectorAll('.person-button');
    personButtons.forEach(button => {
        console.log("calll");
        button.addEventListener('click', function (event) {
            const avatar = button.querySelector('img').src;
            const name = button.querySelector('span').textContent;
            currentCell.innerHTML = `<img src="${avatar}" alt="avatar" class="avatar"><span>${name}</span>`;
            event.stopPropagation();
            personPopup.style.display = 'none';
        });
    });

    const dependencyItems = document.querySelectorAll('.dependency-item');
    dependencyItems.forEach(item => {
        item.addEventListener('click', function (event) {
            const label = item.textContent;
            const newSpan = document.createElement('span');
            newSpan.textContent = label;
            newSpan.style.backgroundColor = 'lightblue';
            newSpan.style.marginRight = '5px';
            currentCell.appendChild(newSpan);
            event.stopPropagation();
            dependencyPopup.style.display = 'none';
        });
    })

    const editLabelsButton = document.getElementById('editLabels');
    const editLabelForm = document.getElementById('editLabelForm');
    const newLabelInput = document.getElementById('newLabelInput');
    const newColorInput = document.getElementById('newColorInput');
    const createNewLabelButton = document.getElementById('createNewLabel');

    editLabelsButton.addEventListener('click', function (event) {
        editLabelForm.style.display = 'block';
        event.stopPropagation();
    });

    createNewLabelButton.addEventListener('click', function () {
        const newLabel = newLabelInput.value.trim();
        const newColor = newColorInput.value;
        if (newLabel) {
            const newButton = document.createElement('button');
            newButton.className = 'status-button';
            newButton.style.backgroundColor = newColor;
            newButton.textContent = newLabel;
            newButton.addEventListener('click', function (event) {
                lastClickedButton = newButton;
                const color = newButton.style.backgroundColor;
                const label = newButton.textContent;
                currentCell.style.backgroundColor = color;
                currentCell.textContent = label;
                event.stopPropagation();
                statusPopup.style.display = 'none';
            });
            statusPopup.insertBefore(newButton, editLabelsButton.parentElement.nextSibling);
            newLabelInput.value = '';
            newColorInput.value = '#ffffff'; 
            editLabelForm.style.display = 'none';
        }
    });

    document.addEventListener('click', function (event) {
        if (!statusPopup.contains(event.target) && !event.target.classList.contains('status-cell')) {
            statusPopup.style.display = 'none';
        }
        if (!personPopup.contains(event.target) && !event.target.classList.contains('person-cell')) {
            personPopup.style.display = 'none';
        }
        if (!dependencyPopup.contains(event.target) && !event.target.classList.contains('dependency-cell')) {
            dependencyPopup.style.display = 'none';
        }
        editLabelForm.style.display = 'none'; // Hide the form when clicking outside
    });

    const initialInput = document.getElementById("newItemInput");
    initialInput.addEventListener("keydown", handleEnterKey);

})

//Dependency cell

document.addEventListener('DOMContentLoaded', function () {
    const dependencyCells = document.querySelectorAll('.dependency-cell');
    const popup = document.getElementById('dependencyPopup');
    const searchInput = document.getElementById('searchInput');
    const newLabelInput = document.getElementById('newLabelInput');
    const createLabelButton = document.getElementById('createLabelButton');
    const popupOptionsContainer = popup.querySelector('ul');
    let popupOptions = Array.from(popupOptionsContainer.querySelectorAll('li'));
    let currentCell = null;
    let editingOption = null;

    dependencyCells.forEach(cell => {
        cell.addEventListener('click', function (event) {
            currentCell = this;
            const cellRect = this.getBoundingClientRect();
            popup.style.top = (window.scrollY + cellRect.bottom) + 'px';
            popup.style.left = (window.scrollX + cellRect.left) + 'px';
            popup.style.display = 'block';
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.dependency-cell') && !event.target.closest('#dependencyPopup')) {
            popup.style.display = 'none';
        }
    });

    popupOptions.forEach(option => {
        option.addEventListener('dblclick', function () {
            editingOption = this;
            const label = this.textContent;
            this.innerHTML = `<input type="text" value="${label}" class="edit-option-input">`;
            const input = this.querySelector('.edit-option-input');
            input.focus();
            input.addEventListener('blur', handleOptionEdit);
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    handleOptionEdit(event);
                }
            });
        });
    });

    function handleOptionEdit(event) {
        const editedLabel = event.target.value.trim();
        if (editedLabel) {
            editingOption.textContent = editedLabel;
            editingOption = null;
        } else {
            editingOption.remove();
        }
    }

    popupOptions.forEach(option => {
        option.addEventListener('click', function () {
            const selectedOption = this.textContent;
            const existingTags = Array.from(currentCell.querySelectorAll('.tag'));
            if (existingTags.some(tag => tag.textContent.includes(selectedOption))) {
                return;
            }
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `${selectedOption} <span class="close-btn">&times;</span>`;
            tag.querySelector('.close-btn').addEventListener('click', function (event) {
                event.stopPropagation();
                tag.remove();
            });
            currentCell.appendChild(tag);
            popup.style.display = 'none';
        });
    });

    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        popupOptions.forEach(option => {
            const text = option.textContent.toLowerCase();
            option.style.display = text.includes(filter) ? '' : 'none';
        });
    });

    createLabelButton.addEventListener('click', function () {
        newLabelInput.style.display = 'block';
        newLabelInput.focus();
    });

    newLabelInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const newLabel = newLabelInput.value.trim();
            if (newLabel) {
                const newOption = document.createElement('li');
                newOption.textContent = newLabel;
                newOption.addEventListener('click', function () {
                    const selectedOption = this.textContent;
                    const existingTags = Array.from(currentCell.querySelectorAll('.tag'));
                    if (existingTags.some(tag => tag.textContent.includes(selectedOption))) {
                        return;
                    }
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.innerHTML = `${selectedOption} <span class="close-btn">&times;</span>`;
                    tag.querySelector('.close-btn').addEventListener('click', function (event) {
                        event.stopPropagation();
                        tag.remove();
                    });
                    currentCell.appendChild(tag);
                    popup.style.display = 'none';
                });
                popupOptionsContainer.appendChild(newOption);
                newLabelInput.value = '';
                newLabelInput.style.display = 'none';
                popupOptions.push(newOption);
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.innerHTML = `${newLabel} <span class="close-btn">&times;</span>`;

                tag.querySelector('.close-btn').addEventListener('click', function (event) {
                    event.stopPropagation();
                    tag.remove();
                });
                currentCell.appendChild(tag);
            }
        }
    });
});

// Tag cell

document.addEventListener('DOMContentLoaded', function () {
    const tagCell = document.querySelector('.tags-cell');
    const popup = document.getElementById('tagsPopup');
    const searchInput = document.getElementById('tagSearchInput');
    const newTagInput = document.getElementById('newTagInput');
    const createTagButton = document.getElementById('createTagButton');
    const popupOptionsContainer = popup.querySelector('ul');
    let popupOptions = Array.from(popupOptionsContainer.querySelectorAll('li'));

    tagCell.addEventListener('click', function (event) {
        const cellRect = this.getBoundingClientRect();
        popup.style.top = (window.scrollY + cellRect.bottom) + 'px';
        popup.style.left = (window.scrollX + cellRect.left) + 'px';
        popup.style.display = 'block';
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.tags-cell') && !event.target.closest('#tagsPopup')) {
            popup.style.display = 'none';
        }
    });

    popupOptions.forEach(option => {
        option.addEventListener('click', function () {
            const selectedOption = this.textContent;
            const existingTags = Array.from(tagCell.querySelectorAll('.tag'));
            if (existingTags.some(tag => tag.textContent.includes(selectedOption))) {
                return;
            }
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `${selectedOption} <span class="close-btn">&times;</span>`;
            tag.querySelector('.close-btn').addEventListener('click', function (event) {
                event.stopPropagation();
                tag.remove();
            });
            tagCell.appendChild(tag);
            popup.style.display = 'none';
        });
    });

    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        popupOptions.forEach(option => {
            const text = option.textContent.toLowerCase();
            option.style.display = text.includes(filter) ? '' : 'none';
        });
    });

    createTagButton.addEventListener('click', function () {
        newTagInput.style.display = 'block';
        newTagInput.focus();
    });

    newTagInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const newTag = newTagInput.value.trim();
            if (newTag) {
                const newOption = document.createElement('li');
                const newTagElement = document.createElement('span');
                newOption.textContent = newTag;
                newTagElement.className = 'tag';
                newTagElement.innerHTML = `${newTag} <span class="close-btn">&times;</span>`;
                newTagElement.querySelector('.close-btn').addEventListener('click', function (event) {
                    event.stopPropagation();
                    newTagElement.remove();
                });
                popupOptionsContainer.appendChild(newOption);
                tagCell.appendChild(newTagElement);
                newTagInput.value = '';
                newTagInput.style.display = 'none';
            }
        }
    });
});

// Person cell

document.addEventListener('DOMContentLoaded', function () {
    const statusCells = document.querySelectorAll('.status-cell');
    const popup = document.getElementById('statusPopup');
    const searchInput = document.getElementById('searchInput');
    const popupList = document.getElementById('popupList');

    const people = [
        { name: 'John Doe', avatar: 'images/download.png' },
        { name: 'Jane Smith', avatar: 'images/download.jpg' },
        { name: 'Alice Johnson', avatar: 'images/images.png' },
        { name: 'Diana Fedrick', avatar: 'images/avtaar1.jpg' }
    ];

    function filterPeople(query) {
        const filteredPeople = people.filter(person => person.name.toLowerCase().includes(query.toLowerCase()));
        displayPeople(filteredPeople);
    }

    function displayPeople(peopleToDisplay) {
        popupList.innerHTML = '';
        peopleToDisplay.forEach(person => {
            const popupContent = document.createElement('div');
            popupContent.className = 'popup-content';

            const img = document.createElement('img');
            img.src = person.avatar;
            img.alt = 'Avatar';
            img.className = 'avatar';

            const span = document.createElement('span');
            span.textContent = person.name;

            popupContent.appendChild(img);
            popupContent.appendChild(span);

            popupContent.addEventListener('click', function () {
                const avatarImg = document.createElement('img');
                avatarImg.src = person.avatar;
                avatarImg.alt = 'Avatar';
                avatarImg.className = 'status-avatar';
                console.log("currentCell", currentCell);

                if (currentCell) {
                    currentCell.appendChild(avatarImg);
                }
                popup.style.display = 'none';
            });

            popupList.appendChild(popupContent);
        });
    }

    let currentCell;
    statusCells.forEach(cell => {
        cell.addEventListener('click', function (event) {
            currentCell = cell;
            filterPeople('');
            const rect = cell.getBoundingClientRect();
            popup.style.left = `${rect.left + window.scrollX}px`;
            popup.style.top = `${rect.bottom + window.scrollY}px`;
            popup.style.display = 'block';
            event.stopPropagation();
        });
    });

    searchInput.addEventListener('input', function () {
        const query = searchInput.value;
        filterPeople(query);
    });

    document.addEventListener('click', function (event) {
        if (!popup.contains(event.target)) {
            popup.style.display = 'none';
        }
    });
    displayPeople(people);
});

// status cell

document.addEventListener('DOMContentLoaded', function () {
    const personCells = document.querySelectorAll('.person-cell');
    const statusPopup = document.getElementById('statusPopups');
    let currentCell;
    let lastClickedButton;
    function generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    personCells.forEach(cell => {
        cell.addEventListener('click', function (event) {
            event.stopPropagation();
            if (currentCell) {
                currentCell.style.removeProperty('background-color');
                currentCell.style.removeProperty('text-content'); 
            }
            currentCell = cell; 
            newCurrent = currentCell
            const rect = cell.getBoundingClientRect();
            statusPopup.style.top = `${rect.bottom + window.scrollY}px`;
            statusPopup.style.left = `${rect.left + window.scrollX}px`;
            statusPopup.style.display = 'block';
        });
    });

    const statusButtons = document.querySelectorAll('.status-button');
    statusButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            lastClickedButton = button;

            const color = button.style.backgroundColor;
            const label = button.textContent;
            if (!newCurrent.id) {
                currentCell.style.backgroundColor = color;
                currentCell.textContent = label;
                personCells.forEach(cell => {
                    cell.setAttribute('id', generateUniqueId());
                });
            }
            event.stopPropagation();
        });
    });

    const editLabelsButton = document.getElementById('editLabels');
    const editLabelForm = document.getElementById('editLabelForm');
    const newLabelInput = document.getElementById('newLabelInput');
    const newColorInput = document.getElementById('newColorInput');
    const createNewLabelButton = document.getElementById('createNewLabel');

    editLabelsButton.addEventListener('click', function (event) {
        editLabelForm.style.display = 'block';
        event.stopPropagation();
    });

    createNewLabelButton.addEventListener('click', function () {
        const newLabel = newLabelInput.value.trim();
        const newColor = newColorInput.value;

        if (newLabel) {
            const newButton = document.createElement('button');
            newButton.className = 'status-button';
            newButton.style.backgroundColor = newColor;
            newButton.textContent = newLabel;

            newButton.addEventListener('click', function (event) {
                lastClickedButton = newButton;
                const color = newButton.style.backgroundColor;
                const label = newButton.textContent;

                currentCell.style.backgroundColor = color;
                currentCell.textContent = label;
                event.stopPropagation();
            });

            statusPopup.insertBefore(newButton, editLabelsButton.parentElement.nextSibling);
            newLabelInput.value = '';
            newColorInput.value = '#ffffff';
            editLabelForm.style.display = 'none';
        }
    });

    document.addEventListener('click', function (event) {
        if (!statusPopup.contains(event.target) && !event.target.classList.contains('person-cell')) {
            statusPopup.style.display = 'none';
            editLabelForm.style.display = 'none';
        }
    });
});

