const searchButton = () =>{
    const searchText = document.getElementById('input-value');
    const input = searchText.value ;
    //for error
    const phoneGallery = document.getElementById('phone-gallery');
    const phoneDetails = document.getElementById('display-details');
    phoneDetails.textContent=''; 
    const errorText = document.getElementById('error');
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`
    // console.log(url);
     fetch(url)
     .then(res => res.json())
     .then(data => {
         if(data.status == false){
             errorText.innerText='No device found !';
             searchText.value='';
             phoneGallery.textContent ='';
         }
         else{
            displayShowsPhone(data.data);
            searchText.value='';
            errorText.innerText="";
         }
     });
}
//for phones gallery
const displayShowsPhone = phones => {
    //console.log(phones);
    const phoneGallery = document.getElementById('phone-gallery');
    phoneGallery.textContent ='';
    const mainphones = phones.slice(0, 20);
    for(const phone of mainphones){
        //console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`  
     <div class="card bg-light Larger shadow border-0 h-100 text-center">
          <img src="${phone.image}" class="card-img-top pt-2 w-50 mx-auto" alt="">
        <div class="card-body">
          <p class="card-text"><span class="fw-bold">Name :</span> ${phone.phone_name}</p>
          <p class="card-text"><span class="fw-bold">brand :</span> ${phone.brand}</p>
         <button onclick ="showDetails('${phone.slug}')" class="bg-secondary border-0 px-3 py-1 text-white p-1 rounded">Details</button>
        </div>
     </div>
        `;
         phoneGallery.appendChild(div);   
   }
}
//for shows details
const showDetails = (detailId) => {
    //console.log(detailId);
    const url =` https://openapi.programming-hero.com/api/phone/${detailId}`
    //console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}
const displayDetails = (info) => {
   // console.log(info);
    const phoneDetails = document.getElementById('display-details');
    phoneDetails.textContent=''; 
    const div = document.createElement('div');
    div.innerHTML =`
  <div class="py-2">
  <img width="150px" class="" src=" ${info.image} " alt="">
  </div>
  <div class="">
        <p><span class="fw-bold">Name :</span> ${info.name}</p> 
        <p><span class="fw-bold">Release Date :</span> ${info.releaseDate ? info.releaseDate :'release date not available'}</p>
        <p><span class="fw-bold">chipSet :</span> ${info.mainFeatures.chipSet}</p>
        <p><span class="fw-bold">displaySize :</span> ${info.mainFeatures.displaySize}</p>
        <p><span class="fw-bold">memory :</span> ${info.mainFeatures.memory}</p>
        <p><span class="fw-bold">sensors :</span> ${info.mainFeatures.sensors}</p>
  </div>
   `;
   phoneDetails.appendChild(div);
   for(const prop in info.others){
    //console.log(prop,info.others[prop]);
    const div = document.createElement('div');
    div.innerHTML=`
    <p class="">${prop}: ${prop,info.others[prop]}</p>
    `;
    phoneDetails.appendChild(div);
    window.scrollTo(0,0);
  }
} 
