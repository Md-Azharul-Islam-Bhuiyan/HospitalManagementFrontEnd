const loadServices=()=>{
    fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data)=>displayServices(data))
    .catch((err)=>console.log(err))
}

const displayServices=(services)=>{
    services.forEach((service) => {
        const parent = document.getElementById("service-container")
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="card shadow h-100">
                <div class="ratio ratio-16x9">
                    <img
                        src=${service.image}
                        class="card-img-top"
                        loading="lazy"
                        alt="..."
                    />
                </div>
                <div class="card-body p-3 p-xl-5">
                    <h3 class="card-title h5">${service.name}</h3>
                    <p class="card-text">
                       ${service.description.slice(0,140)}
                    </p>
                    <a href="#" class="btn btn-primary">Details</a>
                </div>
            </div>
        `
        parent.appendChild(li);
    });
}

const loadDoctors = (search) => {
    // console.log(search);
    document.getElementById("doctors").innerHTML=""
    document.getElementById("spinner").style.display="block"

    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${search? search: ""}`)
    .then((res)=> res.json())
    .then((data)=> {
        // console.log(data);
        if (data.results.length > 0){
            document.getElementById("nodata").style.display="none"
            document.getElementById("spinner").style.display="none"
            displayDoctors(data?.results)
        }
        else{
            document.getElementById("doctors").innerHTML=""
            document.getElementById("spinner").style.display="block"
            document.getElementById("nodata").style.display="block"

        }
    })
}

const displayDoctors = (doctors) =>{
    doctors?.forEach((doctor) => {
         const parent = document.getElementById("doctors");
         const div = document.createElement("div");
         div.classList.add("doc-card")
         div.innerHTML = `
            <img class="doc-img" src=${doctor.image} alt="">
            <h4>${doctor.full_name}</h4>
            <h6>sfdsf</h6>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, repellendus.</p>
            <p>
              ${
                 doctor?.specialization.map((item)=>{
                     return `<button>${item}</button>`
                 })
              }
            </p>
            <a class="btn btn-primary" href="docDetails.html?doctorId=${doctor.id}">Details</a>
         `
         parent.appendChild(div)
    });
}

const loadDesignation=()=>{
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((res)=> res.json())
    .then((data)=> {
        data?.forEach((item) => {
            const parent = document.getElementById("drop-designation")
            const li = document.createElement("li")
            li.classList.add("dropdown-item")
            li.innerText = item.name;
            parent.appendChild(li)
        });
    })
}
const loadSpecialization=()=>{
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((res)=> res.json())
    .then((data)=> {
        data?.forEach((item) => {
            const parent = document.getElementById("drop-specialize")
            const li = document.createElement("li")
            li.classList.add("dropdown-item")
            li.innerHTML = `
              <li onclick="loadDoctors('${item.name}')">${item.name}</li>
            `;
            parent.appendChild(li)
        });
    })
}

const loadReviews=()=>{
    fetch("https://testing-8az5.onrender.com/doctor/review/")
    .then((res) => res.json())
    .then((data) =>{
        // console.log(data); 

        displayReviews(data)

        //eibhabe ekoi function er modde o kora jai module a alda display function  a nicher kaj gulo korce bidai amio module follow korlam nicer code  gula comment korlam. r ei kaj gula korlam displayReviews functoin a. 


        // data.forEach((review) =>{
        //     const parent = document.getElementById("review-container");
        //     const div = document.createElement("div")
        //     div.classList.add("review-card");
        //     div.innerHTML = `
        //         <img src="./Images/girl.png" alt=""> 
        //         <h4>${review.reviewer}</h4>
        //         <p>
        //         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius sunt quos quisquam esse perspiciatis maiores.
        //         </p>
        //         <h6>*****</h6>
        //     `
        //     parent.appendChild(div) 
        // })
    })
}

const displayReviews=(reviews)=>{
    reviews.forEach((review) =>{
        const parent = document.getElementById("review-container");
        const div = document.createElement("div")
        div.classList.add("review-card");
        div.innerHTML = `
            <img src="./Images/girl.png" alt=""> 
            <h4>${review.reviewer}</h4>
            <p>
            ${review.body.slice(0, 100)}.
            </p>
            <h6>${review.rating}</h6>
        `
        parent.appendChild(div) 
    })
}

const handleSearch = () => {
    const value = document.getElementById("search").value;
    loadDoctors(value);
};



loadDoctors()
loadServices()
loadDesignation()
loadSpecialization()
loadReviews()