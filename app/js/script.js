const btnHamburger =  document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const navLinks = document.querySelector('.topnav__links');
const topNav = document.querySelector('.topnav');
const overlay = document.querySelector('.overlay');

btnHamburger.addEventListener('click', function() {
    console.log('click hamburger');

    body.classList.toggle('noscroll');
    topNav.classList.toggle('open');
    overlay.classList.toggle('active');     
    navLinks.classList.toggle('active')
  }
);

// switching image with next and prev on small mobile

// Array of image URLs
let images = [
  "/img/image-product-1.jpg",
  "/img/image-product-2.jpg",
  "/img/image-product-3.jpg",
  "/img/image-product-4.jpg"
];

// Initialize current image index
let currentImage = 0;
// Get previous and next button elements 
const prevImg = document.getElementById('prev');
const nextImg = document.getElementById('next');
// Get the container element for the background image
const hero = document.querySelector('.hero__image');

// Set the initial background image
hero.style.backgroundImage = `url(${images[currentImage]})`;

// Event listener for previous button click
prevImg.addEventListener('click', () => {
  console.log('click prev');
  if (currentImage > 0) {
    currentImage--;
    hero.style.backgroundImage = `url(${images[currentImage]})`;
  }
});

// Event listener for next button click
nextImg.addEventListener('click', () => {
  console.log('click next');
  if (currentImage < images.length - 1) {
    currentImage++;
    hero.style.backgroundImage = `url(${images[currentImage]})`;
  } 
});

// increasing stock with cart plus and cart minus

// Get plus and minus buttons
const cartPlus = document.getElementById('cart-plus');
const cartMinus = document.getElementById('cart-minus');
// Get element displaying the item number
const itemNumber = document.getElementById('item-number');

// Initialize cart number and set the initial display
let cartNumber = 0;
itemNumber.innerText = 0;

// Event listener for cart minus button click
cartMinus.addEventListener('click', () => {
  console.log('click cart-minus');
  if (cartNumber > 0) {
    cartNumber--;
    itemNumber.innerText = cartNumber;
  }
});

// Event listener for cart next button click
cartPlus.addEventListener('click', () => {
  console.log('click cart-plus');
  if (cartNumber < 10) {
    cartNumber++;
    itemNumber.innerText = cartNumber;
  } 
});


// clicking of thumbnail to change to change hero image

// get thumbnail elements
const thumbnail1 = document.getElementById('thumbnail1');
const thumbnail2 = document.getElementById('thumbnail2');
const thumbnail3 = document.getElementById('thumbnail3');
const thumbnail4 = document.getElementById('thumbnail4');

// add click event listeners to the thumbnails
thumbnail1.addEventListener('click', function () {
  console.log('click thumbail1');
  changeImage('/img/image-product-1.jpg');
  setActiveThumbnail(thumbnail1);
});

thumbnail2.addEventListener('click', function () {
  console.log('click thumbail2');
  changeImage('/img/image-product-2.jpg');
  setActiveThumbnail(thumbnail2);
});

thumbnail3.addEventListener('click', function () {
  console.log('click thumbail3');
  changeImage('/img/image-product-3.jpg');
  setActiveThumbnail(thumbnail3);
});

thumbnail4.addEventListener('click', function () {
  console.log('click thumbail4');
  changeImage('/img/image-product-4.jpg');
  setActiveThumbnail(thumbnail4);
});


// function to change hero image
function changeImage(imagePath) {
  document.querySelector('.hero__image').style.backgroundImage = `url(${imagePath})`;
}

// function to set active state with clicked thumbnail
function setActiveThumbnail(thumbnail) {
  // remove active state for allthumbnails
  document.querySelectorAll('.hero__thumbnail').forEach(thumbnail => {
    thumbnail.classList.remove('active');
  });

  // active state to the clicked thumbnail
  thumbnail.classList.add('active');
}

// add number of items from * it by price and give the total price and result

const itemPrice = document.getElementById('item-price');
const featureIntroHeading = document.querySelector('.features__intro h1');
const submitPrice =  document.querySelector('.features__submit');
const checkoutItems = document.getElementById('checkout-items');

submitPrice.addEventListener('click', function () {
  // Retrieve the price value as a number
  const price = parseFloat(itemPrice.innerText);
  // Retrieve the item number as an integer
  const quantity = parseInt(itemNumber.innerText);
  // Calculate the total price
  const totalPrice = price * quantity;

  // Create a new row element
  const checkoutRow = document.createElement('div');
  checkoutRow.classList.add('checkout-row'); // Add class "checkout-row"

  // Create HTML content for the row
  const rowContent = `
    <img class="checkout-image" src="${images[currentImage]}"> 
    <div class="checkout-contents">
      <div class="checkout-details">
        <p>${featureIntroHeading.innerText}</p>
        <p>${price} x ${quantity} <span class="checkout-total">$${totalPrice}</span></p>
      </div>
      <img class="delete-button" src="/img/icon-delete.svg" alt="Delete">
    </div>
  `;

  // Set the row content
  checkoutRow.innerHTML = rowContent;

  // Add the row to the checkoutItems element
  checkoutItems.appendChild(checkoutRow);

  // Remove "Your cart is empty" message if there are items in the cart
  const emptyCartMessage = document.getElementById('empty-cart-message');
  if (checkoutItems.childElementCount === 0) {
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
  }

  // Reset cartNumber to 0
  cartNumber = 0;
  itemNumber.innerText = cartNumber;
});


// Get all the delete buttons
const deleteButtons = document.querySelectorAll('.delete-button');

// Add event listener to the parent element of delete buttons
checkoutItems.addEventListener('click', function(event) {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains('delete-button')) {
    // Remove the parent element of the delete button (the entire row)
    event.target.parentElement.parentElement.remove();

    // Check if the cart is empty
    const emptyCartMessage = document.getElementById('empty-cart-message');
    if (checkoutItems.childElementCount === 0) {
      emptyCartMessage.style.visibility = "visible";
    } else {
      emptyCartMessage.style.visibility = "hidden";
    }
  }
});


document.querySelector('.topnav__cart').addEventListener('click', function () {
  document.querySelector('.topnav__checkout').classList.toggle('open');
});
