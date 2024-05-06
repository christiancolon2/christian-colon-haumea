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