document.addEventListener('DOMContentLoaded', () => {
const homeTitle = document.querySelector(".home-title");

if(homeTitle){

    const phrase = "Premium Shoe Care Service";
    let currentIndex = 0;

    function loop() {
    if (currentIndex < phrase.length) {
        homeTitle.textContent += phrase[currentIndex];
        currentIndex++;
        setTimeout(loop, 100); // Pause for 100 milliseconds between each character
    } else {
        setTimeout(clearLoop, 5000); // Pause for 3000 milliseconds (3 seconds) before clearing the title
        currentIndex = 0;
    }
    }

    function clearLoop() {
    homeTitle.textContent = '';
    setTimeout(loop, 100); // Start the loop again after 100 milliseconds
    }

    // Start the animation initially
    loop();
    }
});
    const menu = document.querySelector('#mobile-menu');

menu.addEventListener('click', () => {

    const menuLinks = document.querySelector('.navbar--menu');    
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});




const form = document.getElementById('contactForm');

if (form) {
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("default prevented");


        // Perform client-side validation
        const nameInput = form.elements['name'];
        const phoneInput = form.elements['phone'];
        const fileInput = form.elements['fileInput'];

        if (!isValidName(nameInput.value)) {
            alert('Please enter a valid name.');
            return;
        }

        if (!isValidPhone(phoneInput.value)) {
            alert('Please enter a valid phone number.');
            return;
        }

        if (!isValidFile(fileInput.value)) {
            alert('Please select a valid JPG image.');
            return;
        }

        try {
            // Disable the submit button to prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            const response = await fetch('/submit-form', {
                method: 'POST',
                body: new FormData(form),
            });

            const textResponse = await response.text();

            if (textResponse === 'ShowModal') {
                // Add code to change style and display the popup modal
                const modal = document.querySelector('.success-modal');
                const mainCont = document.querySelector('.main__content');

                mainCont.style.display = "none";
                    modal.classList.add('show');
            }

            console.log("Modal change success");

            // Re-enable the submit button after a short delay (optional)
            setTimeout(() => {
                submitBtn.disabled = false;
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
            submitBtn.innerText = 'Error Try Again';
            submitBtn.disabled = false;
        }
    });
}


function isValidName(name) {
  // Add your name validation logic here (if needed)
  return name.trim() !== '';
}

function isValidPhone(phone) {
  // Add your phone validation logic here (if needed)
  return /^\d{11}$/.test(phone);
}

function isValidFile(fileName) {
const validExtensions = ['jpg', 'jpeg'];
const extension = fileName.split('.').pop().toLowerCase();
return validExtensions.includes(extension);
};

