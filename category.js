const handleCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  console.log(data.data);
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
  console.log(data.data);

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  data.data?.forEach((videos) => {
    console.log(videos.authors[0]);
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
            <h2 class="card-title">
             ${videos.title}
            </h2>
            
            <h3> totoal viws: ${
              videos.others.views ? videos.others.views : "no views"
            }</h3>
            <h3> Time: ${time ? convertAndDisplayPostedDate(time) : " "}</h3>

            <div class="card-footer flex justify-between mt-8">
              <div class="flex">
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
                  <h6>${videos.authors[0]?.profile_name}</h6>            
                </div>
              </div>
              
            </div>
          </div>
        </div>
          
          `;

    cardContainer.appendChild(div);
  });
};

function convertAndDisplayPostedDate(apiData) {
  const milliseconds = parseInt(apiData); // Convert to milliseconds
  const postedDate = new Date(milliseconds);

  const hours = postedDate.getHours();
  const minutes = postedDate.getMinutes();

  return (formattedPostedTime = `${hours} hours :${minutes} min`);

  // Display the converted time
  // console.log(`Posted Time: ${formattedPostedTime}`);
}



handleCategory();
