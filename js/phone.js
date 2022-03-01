const searchButton = () =>{
    const searchText = document.getElementById('input-value');
    const input = searchText.value ;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);
     fetch(url)
     .then(res => res.json())
     .then(data => displayShowsPhone(data.data))
     searchText.value='';
    // phoneGallery.innerText='';

}

const displayShowsPhone = phones => {
    //console.log(phones);

    const phoneGallery = document.getElementById('phone-gallery');
    const mainphones = phones.slice(0, 20);
    for(const phone of mainphones){
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.innerHTML=`  
        <div class="mt-2">
        <img width="150px" class="" src=" ${phone.image} " alt="">
        <h5>Name: ${phone.phone_name}</h5>
        <h5>brand: ${phone.brand}</h5>
        </div>
        `
        phoneGallery.appendChild(div);
    
   }
}