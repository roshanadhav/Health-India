document.addEventListener('DOMContentLoaded', () => {
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const formSteps = document.querySelectorAll('.form-step');
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    // Show the first step
    formSteps[currentStep].classList.add('active');

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateFormStep(currentStep)) {
                formSteps[currentStep].classList.remove('active');
                steps[currentStep].classList.add('completed');
                currentStep++;
                formSteps[currentStep].classList.add('active');
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            formSteps[currentStep].classList.remove('active');
            currentStep--;
            steps[currentStep].classList.remove('completed');
            formSteps[currentStep].classList.add('active');
        });
    });

    document.querySelector('.submit-btn').addEventListener('click', () => {
        if (validateFormStep(currentStep)) {
            // Handle form submission, e.g., send data to the server
            alert('Form submitted!');
        }
    });

    function validateFormStep(step) {
        const inputs = formSteps[step].querySelectorAll('input, textarea');
        let valid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                valid = false;
            }
        });

        return valid;
    }
});
