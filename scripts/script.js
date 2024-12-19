// Function to sanitize HTML inputs to prevent XSS attacks
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Function to load projects into the DOM
function loadProjects() {
    const projectContainer = document.getElementById('projects-container');
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    setTimeout(() => { // Simulate loading delay
        projectContainer.innerHTML = ''; // Clear existing content

        projects.forEach(project => {
            // Create project card elements
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            const projectImg = document.createElement('img');
            projectImg.src = project.image;
            projectImg.alt = `${project.title} image`;
            projectImg.loading = 'lazy';

            const projectInfo = document.createElement('div');
            projectInfo.classList.add('project-info');

            const projectTitle = document.createElement('h3');
            projectTitle.textContent = project.title;

            const projectDesc = document.createElement('p');
            projectDesc.textContent = project.description;

            const projectActions = document.createElement('div');
            projectActions.classList.add('project-actions');

            const viewProject = document.createElement('a');
            viewProject.href = project.link;
            viewProject.target = '_blank'; // Opens in new tab
            viewProject.classList.add('btn');
            viewProject.textContent = 'View Project';
            viewProject.setAttribute('aria-label', `View project: ${project.title}`);

            projectActions.appendChild(viewProject);

            projectInfo.appendChild(projectTitle);
            projectInfo.appendChild(projectDesc);
            projectInfo.appendChild(projectActions);

            projectCard.appendChild(projectImg);
            projectCard.appendChild(projectInfo);

            projectContainer.appendChild(projectCard);
        });

        loader.style.display = 'none';
    }, 1000);
}

// Function to save a new project
function saveNewProject() {
    // Fetch input values
    const titleInput = document.getElementById('project-title');
    const descriptionInput = document.getElementById('project-description');
    const imageInput = document.getElementById('project-image');

    // Create a new project object
    const newProject = {
        title: sanitizeHTML(titleInput.value.trim()),
        description: sanitizeHTML(descriptionInput.value.trim()),
        image: sanitizeHTML(imageInput.value.trim()),
        link: '' 
    };

    // Validate that all fields are filled
    if (newProject.title && newProject.description && newProject.image) {
        
        projects.push(newProject);

        // Save the updated projects array to Local Storage
        localStorage.setItem('projects', JSON.stringify(projects));

        // Reload the projects display
        loadProjects();

        // Clear the form inputs
        titleInput.value = '';
        descriptionInput.value = '';
        imageInput.value = '';

        // Success message
        alert('Project added successfully!');
    } else {
        alert('Please fill in all fields.');
    }
}

// Function for theme toggle and persist preference
function handleThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    const body = document.body;

    // Load theme from Local Storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
        localStorage.setItem('theme', currentTheme);

        // Change icon based on theme
        themeToggle.innerHTML = body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Function for Back to Top button visibility and functionality
function handleBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { 
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Function for contact form submission
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simple validation
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (name && email && message) {
            contactForm.classList.add('hidden');
            contactSuccess.classList.remove('hidden');
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Initialize all functionalities on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    if (storedProjects && Array.isArray(storedProjects)) {
        projects.length = 0; // Clear existing projects
        storedProjects.forEach(project => projects.push(project)); 
    }

    loadProjects();
    handleThemeToggle();
    handleBackToTop();
    handleContactForm();
});
