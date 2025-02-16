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
            steps[currentStep].classList.remove('completed');
            currentStep--;
            formSteps[currentStep].classList.add('active');
        });
    });

    // document.querySelector('.submit-btn').addEventListener('click', (data) => {
    //     if (validateFormStep(currentStep)) {
    //         console.log(data)
    //         alert('Form submitted!');
    //     }
    // });

    // Add click event listeners to progress bar steps
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            if (index <= currentStep) {
                // Hide current step and show the selected step
                formSteps[currentStep].classList.remove('active');
                currentStep = index;
                formSteps[currentStep].classList.add('active');

                // Update step completion state
                steps.forEach((s, i) => {
                    if (i < currentStep) {
                        s.classList.add('completed');
                    } else {
                        s.classList.remove('completed');
                    }
                });
            }
        });
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


const coordinates = document.querySelector("#coordinates")


function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          const { latitude, longitude } = position.coords;
          console.log('User location:', { latitude, longitude });
          // You can now use these coordinates (e.g., send them to your backend)
          coordinates.setAttribute("value",`${latitude} , ${longitude}` )

          sendLocationToBackend(latitude, longitude);

        },
        (error) => {
          console.error('Error getting location:', error);
          // Handle error (e.g., show a message to the user)
          alert('Could not get your location. Please allow location access.');
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by your browser.');
    }

  }
  
  function sendLocationToBackend(latitude, longitude) {
    fetch('/medical/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Location sent successfully!');
      } else {
        console.error('Error sending location:', response.statusText);
      }
    })
    .catch(err => console.error('Fetch error:', err));
  }
  
  
  coordinates.addEventListener("click" , ()=>{
    getUserLocation();
})