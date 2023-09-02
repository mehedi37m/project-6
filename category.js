


const handleCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  // console.log(data.data);
  const tabContainer = document.getElementById("category_id");



  data?.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
          
         <div>
         <h1 onclick="handleLoadCategory('${category.category_id}')" class="tab btn btn-accent hover:bg-red-500 hover:text-white border-none ">${category.category}</h1>
         </div>
          `;
    tabContainer.appendChild(div);
  });
};

const handleLoadCategory = async (category_id) => {
  // console.log(category_id);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${category_id}`
  );
  const data = await response.json();

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  const setImg = document.getElementById("set-img");
  setImg.innerHTML = " ";

  if (data.data.length === 0) {
   
    setImg.innerHTML = `  <img class = "text-center" src="./image/Icon.png" alt="">
   <h2 class="mt-5 text-4xl font-extrabold">Oops!! Sorry, There is no content here</h2>
   `;
   
  } else {
    data.data?.forEach((videos) => {
      // console.log(videos.authors[0]?.verified);

      const time = parseFloat(videos.others.posted_date);
      // console.log(time);
      const div = document.createElement("div");

      div.innerHTML = `
          <div class="card bg-base-100 relative">
          <figure>
            <img class = " h-48 w-96"
              src=${videos?.thumbnail}
            />
          </figure>
          <div class="text-white text-right absolute top-40 right-10 bg-black">
          <h3 class = "w-30">${
            time ? convertAndDisplayPostedDate(time) : " "
          }</h3>
          </div>
         <div class="card-body">

    <div class="flex gap-5">

     <div>
      <div class="avatar online">
        <div class="w-14 rounded-full">
          <img
            src=${videos.authors[0]?.profile_picture}
          />
        </div>
      </div>
    </div>

   <div>
       <h2 class="card-title">
         ${videos.title}
        </h2>
 
        <div class = "flex gap-2 justify-items-center">
         <h6>${videos.authors[0]?.profile_name}</h6> 
        <p>
       
        </p>
        <i class="fa-solid text-blue-600 fa-circle-check"> ${videos.authors[0]?.verified === true ? "yes" : "no"}</i>
        

       </div>
       <h3> ${videos.others.views ? videos.others.views : "no views"} views</h3>
    

    </div>  
  </div>       
        
      </div>
    </div>
  </div>
          
          `;

      cardContainer.appendChild(div);
    });
  }
};

const convertAndDisplayPostedDate = (apiData) => {
  let seconds = parseInt(apiData);
  let hrs = parseInt(seconds / 3600);
  let min = parseInt((seconds / 36000) * 60);
  return `${hrs} hours ${min} min`;
};



const handleSort =async () =>{
 
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  
  sortView(data);
};

  






const sortView = (data) => {
  let data_1 = data[0];
  let data_2 = data[1];
  return data.data.sort((data_1, data_2) => {
    data_1 = parseFloat(data_1.others.views);
    data_2 = parseFloat(data_2.others.views);
    if (data_1 > data_2) {
      return -1;
    } else {
      return 1;
    }
  });
};

handleCategory();
