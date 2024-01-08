const getparams = () => {
  const params = new URLSearchParams(window.location.search).get("doctorId");
  //   console.log(params);
  loadTime(params)
  fetch(`https://testing-8az5.onrender.com/doctor/list/${params}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displayDetails(data);
    });

  fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${params}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      doctorReviews(data);
    });
};

const doctorReviews = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("doc-review-container");
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
            <img src="./Images/girl.png" alt=""> 
            <h4>${review.reviewer}</h4>
            <p>
            ${review.body.slice(0, 100)}.
            </p>
            <h6>${review.rating}</h6>
        `;
    parent.appendChild(div);
  });
};

const displayDetails = (doctor) => {
  // console.log(doctor);
  const parent = document.getElementById("docDetails");
  const div = document.createElement("div");
  div.classList.add("doc-details-container");
  div.innerHTML = `
      <div class="doctor-img">
        <img src="${doctor.image}" alt="">
      </div>
      <div class="doc-info">
        <h2>${doctor.full_name}</h2>
         ${doctor.designation.map((item) => {
           return `<h5>${item}</h5>`;
         })}
         ${doctor.specialization.map((item) => {
           return `<button class="doc-detail-btn">${item}</button>`;
         })}
        <p class="w-50">
          <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quas eligendi nam modi eveniet iure.</small>
        </p>
        <h6><strong>Fees:</strong> ${doctor.fee} BDT</h6>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Take Your Appoinment
        </button>
      </div>
        `;
  parent.appendChild(div);
};

const loadTime = (id) => {
    fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      data.forEach((timeslot)=>{
           const parent = document.getElementById("time-container")
           const option = document.createElement("option")
           option.value = timeslot.id
           option.innerText = timeslot.name
           parent.appendChild(option)
      })
    });
} 

const handleAppoinment = () =>{
    const param = new URLSearchParams(window.location.search).get("doctorId");
    const status = document.getElementsByName("status")
    const selected = Array.from(status).find((button) => button.checked)
    const symptom = document.getElementById("symptom").value
    const time = document.getElementById("time-container")
    const selectedTime = time.options[time.selectedIndex]

    // console.log(selected.value, symptom, selectedTime.value);

    const info = {
        appointment_type: selected.value,
        appointment_status: "Pending",
        time: selectedTime.value,
        symptom: symptom,
        cancel: false,
        patient: 1,
        doctor: param,
      };
    //   console.log(info);

    fetch("https://testing-8az5.onrender.com/appointment/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
    //   window.location.href = `pdf.html?doctorId=${param}`;
      // handlePdf();
      console.log(data);
    });


}
getparams();
