const products = document.querySelector(".products");
const loading = document.querySelector(".loading");

//disable scroll when loading
document.body.style.overflow = "hidden";

//display loading screen for 3 seconds then remove it from the DOM
setTimeout(() => {
  loading.remove();
  //enable scroll when loading is done
  document.body.style.overflow = "auto";
}, 3000);

/****Fetch products from the FakeStoreAPI, obviosly******/
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach(function (product) {
      //destructure the product object
      const { id, title, price, image, rating } = product;

      /******truncate the title if it is longer than 20 characters*************/
      const shortTitle =
        title.length > 20 ? title.substring(0, 20) + "..." : title;
      /********************************************************************************/

      /*convert the price to naira, format with commas and add the naira sign*/
      const nairaPrice = price * 415;
      const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(nairaPrice);
      /**************************************************************************/

      //convert rating to the nearest whole number
      const ratingNumber = Math.round(rating.rate);
      //convert the rating to a star rating
      const starRating = [];
      for (let i = 0; i < ratingNumber; i++) {
        starRating.push("⭐");
      }

      //remove commas from the rating
      const formattedRating = starRating.join("");

      /***create template for each product**************************/
      const productData = `
          <div class="product" data-id="${id}">
          <i class="fal fa-heart"></i>
          <i class="fal fa-plus"></i>
          <img src="${image}" alt="" />
          <h4>${shortTitle}</h4>
          <p>${formattedPrice}</p>
          <p>${formattedRating}</p>
        </div>
          `;
      /*****************************************************************************/

      //add event listner to the heart icon
      //append the product template to the products container
      products.innerHTML += productData;
    });
  });
