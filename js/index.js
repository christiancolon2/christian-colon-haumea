// Get references to elements
const body = document.querySelector("body");
const footer = document.createElement("footer");
const copyright = document.createElement("p");
const skillsSection = document.getElementById("Skills");
const skillsList = skillsSection.querySelector("ul");
const messageForm = document.forms.leave_message;
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");
const projectsSection = document.getElementById("Projects");
const projectList = document.createElement('ul');
projectsSection.appendChild(projectList); // Add the list to the section

// Skills array
const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "Adobe Photoshop",
    "GitHub",
    "AWS",
    "Azure"
];

// Set up footer with dynamic year
body.appendChild(footer);
const thisYear = new Date().getFullYear();
copyright.innerHTML = `\u00A9 Copyright ${thisYear} Christian Colon`;
footer.appendChild(copyright);

// Add skills to the skills list
skills.forEach((skillText) => {
    const skillItem = document.createElement("li");
    skillItem.textContent = skillText;
    skillsList.appendChild(skillItem);
});

// Fetch and display GitHub repositories
fetch("https://api.github.com/users/christiancolon2/repos")
    .then((response) => response.json())
    .then((repositories) => {
        repositories.forEach((repo) => {
            const projectItem = document.createElement("li");
            const projectLink = document.createElement("a");
            projectLink.href = repo.html_url;
            projectLink.target = "_blank";
            projectLink.textContent = repo.name;

            projectItem.appendChild(projectLink);
            projectList.appendChild(projectItem);
        });
    })
    .catch((error) => {
        console.error("Error fetching GitHub data:", error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Sorry, there was an error loading my projects. Please try again later.";
        projectsSection.appendChild(errorMessage);
    });

// Function to show/hide messages section
function updateMessageVisibility() {
    messageSection.style.display = messageList.children.length > 0 ? "block" : "none";
}

// Initial call to hide messages section if empty on page load
updateMessageVisibility();

// Form submission handler
messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form field values
    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;

    // Create new message elements
    const newMessage = document.createElement("li");
    const messageContent = document.createElement('div');
    const messageText = document.createElement("span");
    const removeButton = document.createElement('button');
    
    // Set content for message elements
    messageText.textContent = userMessage;
    removeButton.textContent = "Remove";

    // Event listeners for buttons
    removeButton.addEventListener("click", function () {
        newMessage.remove();
        updateMessageVisibility();
    });

    // Assemble the message element
    messageContent.appendChild(messageText);
    newMessage.appendChild(messageContent);
    newMessage.appendChild(removeButton);

    // Append the new message to the message list
    messageList.appendChild(newMessage);

    // Show the message section if it was hidden
    updateMessageVisibility();

    // Reset the form
    messageForm.reset();
});
