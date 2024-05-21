// Get a reference to the body element
const body = document.querySelector('body');

// Create the footer element
const footer = document.createElement('footer'); 
body.appendChild(footer); // Append the footer to the body

// Create the date variable
const today = new Date();
const thisYear = today.getFullYear();

// Create the copyright paragraph
const copyright = document.createElement('p');
copyright.innerHTML = '\u00A9 Copyright ' + thisYear + ' Christian Colon';
footer.appendChild(copyright); // Append to the footer

const skills = ["JavaScript", "HTML", "CSS", "Adobe Photoshop", "GitHub", "AWS", "Azure"];
const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

// Iterate over the skills array
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.textContent = skills[i]; 

    // Append the skill to the skills list
    skillsList.appendChild(skill); 
}

// Select the message form
const messageForm = document.forms.leave_message;

// Add an event listener for the "submit" event
messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form field values
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');

    // Create a new list item for the message
    const newMessage = document.createElement('li');

    // Set the inner HTML with the name as a link and message
    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>:
        <span>${usersMessage}</span>
    `;

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        const entry = this.parentNode; // Find the parent li element
        entry.remove();  // Remove the message from the DOM
    });

    // Append remove button to the new message
    newMessage.appendChild(removeButton);

    // Append the new message to the message list
    messageList.appendChild(newMessage);


    // Create edit button
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        const messageSpan = newMessage.querySelector('span');
        const originalMessage = messageSpan.textContent;

        // Replace message with an input field for editing
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = originalMessage;
        messageSpan.replaceWith(editInput);

        // Change edit button to a save button
        editButton.textContent = 'Save';
        editButton.removeEventListener('click', arguments.callee); // Remove the old click handler
        editButton.addEventListener('click', function() {
            const newMessageText = editInput.value;
            messageSpan.textContent = newMessageText;
            editInput.replaceWith(messageSpan); // Restore the original span
            editButton.textContent = 'Edit';
            editButton.removeEventListener('click', arguments.callee); // Remove the save handler
            editButton.addEventListener('click', arguments.callee); // Re-add the edit handler
        });
    });

    // Append edit button to the new message
    newMessage.appendChild(editButton);

    messageForm.reset();
});