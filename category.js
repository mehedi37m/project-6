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
  console.log(category_id);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${category_id}`
  );
  const data = await response.json();
  sortView(data);
  // console.log(parseFloat(data.data[0].others.views));
  // console.log(parseFloat(data.data[1].others.views));

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  if (data.data.length === 0) {
    const setImg = document.getElementById("set-img");
    setImg.innerHTML = " ";
    const p = document.createElement("p");
    p.innerHTML = `  <img src="./image/Icon.png" alt="">
   <h2 class="mt-5 text-4xl font-extrabold">Oops!! Sorry, There is no content here</h2>
   `;

    setImg.appendChild(p);
  } else {
    data.data?.forEach((videos) => {
     
      // console.log(videos)
     

      const time = parseFloat(videos.others.posted_date);
      console.log(time);
      const div = document.createElement("div");

      div.innerHTML = `
          <div class="card bg-base-100">
          <figure>
            <img
              src=${videos?.thumbnail}
            />
          </figure>

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
       
         <i id="verified-id" class="fa-regular fa-circle-check mt-2 text-blue-600 ">${
           videos.authors[0]?.verified === "true"
             ? videos.authors[0]?.verified
             : "no"
         }</i>

       </div>
       <h3> ${videos.others.views ? videos.others.views : "no views"} views</h3>
      <h3> Time: ${time ? convertAndDisplayPostedDate(time) : " "}</h3>

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

function convertAndDisplayPostedDate(apiData) {
  const milliseconds = parseInt(apiData); // Convert to milliseconds
  const postedDate = new Date(milliseconds);

  const hours = postedDate.getHours();
  const minutes = postedDate.getMinutes();

  return (formattedPostedTime = `${hours} hours :${minutes} min`);
}

function sortView(data) {
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
}
handleCategory();
