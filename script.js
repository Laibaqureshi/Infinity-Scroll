const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
//console.log('hi!!!');
let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];

// Unsplash API
const count=30;
const apiKey='gBJYcqCSGxJhJ2FCQB1G5IJjg3t03bDq7RYvAdZ_t6I';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
//check if all images were loaded
function imageLoaded(){
    console.log('image Loaded');
   // console.log('image Loaded');
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        console.log('ready =',ready);
}
}
//console.log('bi!!!');
// Create elements for link and photos ,ADD to DOM
function displayPhotos(){
    imagesLoaded='0';
    totalImages=photosArray.length;
    console.log('total images',totalImages);
    //Rum function for each object in photosArray
    photosArray.forEach((photo) => {
     // Create <a> to link to unsplash
     const item=document.createElement('a');
     item.setAttribute('href',photo.links.html);
     item.setAttribute('target', '_blank');
     // Create <img> for photo
     const img=document.createElement('img');
     img.setAttribute('src',photo.urls.regular);
     img.setAttribute('alt',photo.alt_description);
     img.setAttribute('title', photo.alt_description);
     // Event listener,check when each is finished loading
     img.addEventListener('load',imageLoaded);


     // Put <img> inside <a>, then put both inside imageContainer Element
     item.appendChild(img);
     imageContainer.appendChild(item);



    })
}

// get photos from Unplash API
async function getPhotos(){
   try{
   const response=await fetch(apiUrl);
   photosArray=await response.json();
   //console.log(photosArray);
   displayPhotos();
   }
   catch(error){
     // Catch Error here

   }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',()=>{
   if(window.innerHeight+scrollY>=document.body.offsetHeight-1000&&ready){
       getPhotos();
   }
});

// on Load
getPhotos();

