const searchButton = () =>{
    const searchText = document.getElementById('input-value');
    const input = searchText.value ;
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`
     //console.log(url);
     fetch(url)
     .then(res => res.json())
     .then(data => displayShowsPhone(data.data));
     searchText.value='';
    // phoneGallery.innerText='';

}
//for phones gallery
const displayShowsPhone = phones => {
    //console.log(phones);

    const phoneGallery = document.getElementById('phone-gallery');
    const mainphones = phones.slice(0, 20);
    for(const phone of mainphones){
        //console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.innerHTML=`  
        <div class="card border-0 mt-2 h-100vh">
        <img width="150px" class="" src=" ${phone.image} " alt="">
        <h5>Name: ${phone.phone_name}</h5>
        <h5>brand: ${phone.brand}</h5>
        <button onclick ="showDetails('${phone.slug}')" class="bg-success border-0 text-white p-1 rounded">Details</button>
        </div>
        `
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
    console.log(info);
    const phoneDetails = document.getElementById('display-details');
    phoneDetails.textContent=''; 
    const div = document.createElement('div');
    div.innerHTML =`
    <img width="150px" class="" src=" ${info.image} " alt="">
    <p>Name: ${info.name}</p> 
    <p>Release Date: ${info.releaseDate ? info.releaseDate :'release date not available'}</p>
    <p>chipSet : ${info.mainFeatures.chipSet}</p>
    <p>displaySize : ${info.mainFeatures.displaySize}</p>
    <p>memory : ${info.mainFeatures.memory}</p>
    <p>sensors : ${info.mainFeatures.sensors}</p>
   `;
   phoneDetails.appendChild(div);
   for(const prop in info.others){
    //console.log(prop,arr[prop]);
    const div = document.createElement('div');
    div.innerHTML=`
    <p>${prop}: ${prop,info.others[prop]}</p>
    `;
    phoneDetails.appendChild(div);
  }

} 
