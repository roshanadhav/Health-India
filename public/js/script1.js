

const followbtn = document.querySelector("#follobtn")
let doctoridval = document.querySelector("#doctorid")
let user = document.querySelector("#user")
if (user) {
    let userid = user.innerHTML;
}
let check = 0;
followbtn.addEventListener("click", () => {
    if (user && doctorid) {
        if (check === 0) {
            fetch(`/doctors/follow/${doctorid}`).then(data => {
                followbtn.innerHTML = "Following"

                // followbtn.style.backgroundColor = "linear-gradient(45deg,#fff,#fff)"
                // followbtn.style.color = "black"
                // followbtn.style.border = "solid black 1px"
                check = 1

            })
            check = 1

        } else {
            fetch(`/doctors/unfollow/${doctorid}`).then(data => {
                followbtn.innerHTML = "Follow"
                followbtn.style.background = "linear-gradient(45deg,#df4881,#c430d7)"
                followbtn.style.color = "white"
                followbtn.style.border = "none"
                check = 0
            })
        }
    }
    else {
        alert("Please Login First To Follow This Account");

        window.location.href = '/users/login';
    }
})



const doctorid = doctoridval.innerHTML
// console.log(doctorid)
let newcheck = 0
followbtn.addEventListener("click", function () {
    if (newcheck === 0) {
        followbtn.innerHTML = "Following"
        followbtn.style.background = "linear-gradient(45deg,#fff,#fff)"
        followbtn.style.color = "black"
        followbtn.style.border = "solid black 1px"
        newcheck = 1
        fetch(`/doctors/follow/${doctorid}`).then(data => {

        })

    } else {
        followbtn.innerHTML = "Follow"
        followbtn.style.background = "linear-gradient(45deg,#df4881,#c430d7)"
        followbtn.style.color = "white"
        followbtn.style.border = "none"
        newcheck = 0
    }

})

const post = document.querySelector("#post")
const likebtn = document.querySelector("#likebtn")

if(post && likebtn){
    post.addEventListener("dblclick", () => {
        likebtn.style.transform = "translate(-1%,-20%)scale(1)";
        likebtn.style.opacity = "0.8";
    
        setInterval(() => {
            likebtn.style.color = "#ff3c3c"
        }, 200)
        setTimeout(() => {
            likebtn.style.color = "#ffffff"
            likebtn.style.transform = "translate(-1%,-20%)scale(0)";
            likebtn.style.opacity = "0";
    
        }, 500)
    })
}




let followers = document.querySelector("#followers")
let following = document.querySelector("#following")

followers.addEventListener("click", () => {
    fetch(`/doctors/show-followers/${doctorid}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        let body = document.querySelector("body")
        let closebtn = document.createElement("i")
        let heading = document.createElement("h4")
        heading.innerText = "Followers"
        closebtn.classList.add("fa-regular")
        closebtn.classList.add("fa-circle-xmark")
        let div = document.createElement("div")
        div.classList.add("newbestdiv")
        div.appendChild(heading)
        div.appendChild(closebtn)
        data.forEach(element => {
            let span = document.createElement("span")
            span.classList.add("follo-following")
            span.innerHTML = `
                                <br>
                                <img src="${element.profile}" alt="img">
                                <b><a href="/users/home-doctor/${element.id}" style="color: black;" >&nbsp; &nbsp;&nbsp; &nbsp;${element.name}</a></b>
                                <br>
                            `
            div.appendChild(span)
        });
        body.appendChild(div)
        closebtn.addEventListener("click",()=>{
            body.removeChild(div)
        })
        body.addEventListener("click",()=>{
            body.removeChild(div)
        })
    })
})


following.addEventListener("click", () => {
    fetch(`/doctors/show-following/${doctorid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            let body = document.querySelector("body")
            let div = document.createElement("div")
            let closebtn = document.createElement("i")
            let heading = document.createElement("h4")
            closebtn.classList.add("fa-regular")
            closebtn.classList.add("fa-circle-xmark")
            div.classList.add("newbestdiv")
            heading.innerText = "Following"

            div.appendChild(heading)
            div.appendChild(closebtn)
            data.forEach(element => {
                let span = document.createElement("span")
                span.classList.add("follo-following")
                span.innerHTML = `
                                    <br>
                                    <img src="${element.profile}" alt="img">
                                    <b><a href="/users/home-doctor/${element.id}" style="color: black;" >&nbsp; &nbsp;&nbsp; &nbsp;${element.name}</a></b>
                                    <br>
                                `
                div.appendChild(span)
            });
            body.appendChild(div)
            closebtn.addEventListener("click",()=>{
                body.removeChild(div)
            })
            body.addEventListener("click",()=>{
                body.removeChild(div)
            })
        })
})


let BookBtn = document.querySelector(".BookBtn")

if (BookBtn) {
    let delcheck = 0 ;
    let div = document.createElement("div")

    BookBtn.addEventListener("click",()=>{
        let body = document.querySelector("body")
        delcheck = 1 ;
        div.classList.add("addform")
        let doctoremail = document.querySelector(".profile-email")
        div.innerHTML = `
                <div class="form-div">
                <i class="fa-solid fa-xmark " id="rmbtn"></i>
                <form  class="needs-validation body" method="post" action="/users/new-appoinment-booking">
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Name :</label>
                        <input type="text" class="form-control" id="inputEmail4" placeholder="eg . Mrunal Thakur" name="name" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword4">Doctor Email :</label>
                        <input type="email" class="form-control" id="inputPassword4" readonly value="${doctoremail.innerText}" placeholder="eg . exgample@gmail.com" name="doctorEmail" >
                    </div>
                    </div>
                    <div class="form-group">
                    <label for="inputAddress">Reason For Appointment :</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="eg Fevar and Cold" name="reason" required>
                    </div>
                    <div class="form-group">
                    <label for="inputAddress2">Address :</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name="location" required>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputCity">Appointment Date : </label>
                        <input type="date" class="form-control" id="inputCity" name="date" placeholder="eg . Genune And Authenticate" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputState">Your Phone Number  :</label>
                        <input id="inputState" class="form-control" name="phone_no" required placeholder="eg . 95XXXXXX43">
                    </div>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <!-- State Dropdown -->
                    <label for="state">Select State:</label>
                    <select id="state"  onchange="updateCities()" class="form-control" id="inputState" name="state">
                        <option value="">--Select State--</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CT">Chhattisgarh</option>
                        <option value="GA">Goa</option>
                        <option value="GJ">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JH">Jharkhand</option>
                        <option value="KA">Karnataka</option>
                        <option value="KL">Kerala</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="MN">Manipur</option>
                        <option value="ME">Meghalaya</option>
                        <option value="MZ">Mizoram</option>
                        <option value="NL">Nagaland</option>
                        <option value="OD">Odisha</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TS">Telangana</option>
                        <option value="TR">Tripura</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="UT">Uttarakhand</option>
                        <option value="WB">West Bengal</option>
                    </select>
                    </div>
                    <div class="form-group col-md-6">
                        <!-- City Dropdown -->
                        <label for="city">Select City:</label>
                        <select id="city" id="inputCity" class="form-control" name="city" required>
                        <option value="">--Select City--</option>
                        <!-- Cities will be populated based on state selection -->
                    </select>
                    </div>
                    </div>
                    <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck">
                        <label class="form-check-label" for="gridCheck">
                            Agree <a href="">Terms </a> & <a href=""> Conditions</a>
                        </label>
                    </div>
                    </div>
                    <button type="submit" class="user-login-btn new-joinbtn">Book Appointment</button>
                </form>
                
                </div>

                            `



                            const script = document.createElement('script');
                            script.textContent = `
                                const cities = {
                    AP: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kakinada', 'Nellore', 'Rajahmundry', 'Anantapur', 'Chittoor', 'Kadapa'],
                    AR: ['Itanagar', 'Naharlagun', 'Tawang', 'Pasighat', 'Ziro', 'Bomdila', 'Along', 'Tezu'],
                    AS: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tinsukia', 'Nagaon', 'Bongaigaon', 'Diphu', 'Tezpur', 'Sivasagar'],
                    BR: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Sasaram', 'Arrah', 'Katihar', 'Purnia', 'Begusarai'],
                    CT: ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Janjgir-Champa', 'Kawardha', 'Bemetara'],
                    GA: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Cortalim', 'Dabolim', 'Sanguem', 'Quepem'],
                    GJ: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Junagadh', 'Bhavnagar', 'Gandhinagar', 'Anand', 'Mehsana', 'Porbandar'],
                    HR: ['Gurugram', 'Faridabad', 'Hisar', 'Ambala', 'Karnal', 'Panipat', 'Sonipat', 'Yamunanagar', 'Rohtak', 'Jhajjar'],
                    HP: ['Shimla', 'Dharamshala', 'Kangra', 'Mandi', 'Solan', 'Hamirpur', 'Bilaspur', 'Nahan', 'Palampur', 'Kullu'],
                    JH: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Dumka', 'Chaibasa', 'Koderma'],
                    KA: ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangalore', 'Belagavi', 'Gulbarga', 'Shimoga', 'Tumakuru', 'Udupi', 'Chikkamagaluru'],
                    KL: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Alappuzha', 'Kannur', 'Kottayam', 'Thrissur', 'Palakkad', 'Ernakulam', 'Wayanad'],
                    MP: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Ratlam', 'Dewas', 'Katni', 'Shivpuri'],
                    MH: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Thane', 'Kolhapur', 'Ratnagiri'],
                    MN: ['Imphal', 'Thoubal', 'Ukhrul', 'Bishnupur', 'Churachandpur', 'Senapati', 'Tamenglong', 'Jiribam', 'Kakching'],
                    ME: ['Shillong', 'Tura', 'Jowai', 'Nongpoh', 'Bamban', 'Mawkyrwat', 'Ranikor', 'Khliehriat', 'Mairang'],
                    MZ: ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Kolasib', 'Lawngtlai', 'Serchhip', 'Hnahthial', 'Khawzawl'],
                    NL: ['Kohima', 'Dimapur', 'Wokha', 'Mokokchung', 'Tuensang', 'Mon', 'Phek', 'Zunheboto'],
                    OD: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Balasore', 'Kendrapara', 'Dhenkanal', 'Koraput', 'Angul'],
                    PB: ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Mohali', 'Bathinda', 'Hoshiarpur', 'Firozpur', 'Mansa'],
                    RJ: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Pali', 'Sikar', 'Alwar', 'Jhunjhunu'],
                    SK: ['Gangtok', 'Namchi', 'Pelling', 'Mangan', 'Rangpo', 'Gyalshing', 'Singtam'],
                    TN: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Tiruchirapalli', 'Karur'],
                    TS: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Rangareddy', 'Karimnagar', 'Mahabubnagar', 'Adilabad', 'Nalgonda'],
                    TR: ['Agartala', 'Udaipur', 'Sabroom', 'Belonia', 'Kailasahar', 'Teliamura', 'Khowai', 'Kamalanagar'],
                    UP: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Aligarh', 'Bareilly', 'Ghaziabad', 'Noida', 'Jhansi'],
                    UT: ['Dehradun', 'Haridwar', 'Nainital', 'Rishikesh', 'Roorkee', 'Udham Singh Nagar', 'Pauri', 'Tehri'],
                    WB: ['Kolkata', 'Siliguri', 'Durgapur', 'Asansol', 'Howrah', 'Kharagpur', 'Jalpaiguri', 'Malda', 'Burdwan', 'Hooghly']
                    };

                    
                                function updateCities() {
                                    const stateSelect = document.getElementById('state');
                                    const citySelect = document.getElementById('city');
                                    const selectedState = stateSelect.value;
                    
                                    citySelect.innerHTML = '<option value="">--Select City--</option>';
                    
                                    if (selectedState) {
                                        cities[selectedState].forEach(city => {
                                            const option = document.createElement('option');
                                            option.value = city;
                                            option.textContent = city;
                                            citySelect.appendChild(option);
                                        });
                                    }
                                }
                            `;
                            document.body.appendChild(script);
            
        body.appendChild(div)
        const closeForm = (event) => {
            if (!div.contains(event.target) && event.target !== BookBtn) {
                body.removeChild(div);
                body.removeEventListener("click", closeForm);
            }

        };
        let rmbtn = document.querySelector("#rmbtn")

        rmbtn.addEventListener("click" , ()=>{
            body.removeChild(div);
        })
        body.addEventListener("click", closeForm);
        
    })
    
}