// // // data for login resgiter //

// // document.addEventListener('DOMContentLoaded', () => {
// //   const forgotPasswordForm = document.getElementById('forgotPasswordForm');


// //   forgotPasswordForm.addEventListener('submit', function (event) {
// //     event.preventDefault();
// //     const forgotEmail = document.getElementById('forgotEmail').value;
// //     // Implement forgot password logic here
// //     console.log(`Forgot password submitted with email: ${forgotEmail}`);
// //   });
// // });




// // here we will fetch the data from api //
// document.addEventListener('DOMContentLoaded', () => {
//   const appElement = document.getElementById('app');

//   fetch('https://fakestoreapi.com/products')
//     .then(response => response.json())
//     .then(products => {
//       products.forEach(product => {
//         const productElement = document.createElement('div');
//         productElement.classList.add('product');

//         const imageElement = document.createElement('img');
//         imageElement.src = product.image;
//         imageElement.alt = product.title;

//         const productInfoElement = document.createElement('div');
//         productInfoElement.classList.add('product-info');

//         const titleElement = document.createElement('h3');
//         titleElement.classList.add('product-title');
//         titleElement.textContent = product.title;

//         const descriptionElement = document.createElement('p');
//         descriptionElement.classList.add('product-description');
//         descriptionElement.textContent = product.description;

//         const priceElement = document.createElement('div');
//         priceElement.classList.add('product-price');
//         priceElement.textContent = `$${product.price}`;

//         productInfoElement.appendChild(titleElement);
//         productInfoElement.appendChild(descriptionElement);
//         productInfoElement.appendChild(priceElement);

//         productElement.appendChild(imageElement);
//         productElement.appendChild(productInfoElement);

//         appElement.appendChild(productElement);
//       });
//     })
//     .catch(error => console.error('Error fetching data:', error));
// });































































































// // // const ApiKey = "JCD6IMBPRLR1BBAK";

// // document.addEventListener("DOMContentLoaded", () =>{
// //     const stocksDataElement = document.getElementById('stockData');
// //     const stockSymbol = 'AAPl';

// //     fetch(`https://localhost:3000/stock-market/${stockSymbol}`)
// //     .then(response => response.json())
// //     .then(data => {
// //         stocksDataElement.textContent = JSON.stringify(data,null, 2);
// //     })
// //     .catch(error => {
// //         console.error('Error Fetchig stock data');
// //     });
// // });



