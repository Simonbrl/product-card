const product = [
    {
        colorName : "Blue",
        colorHexFirst : "#3e61dd",
        colorHexSecondary : "#223783",
        colorHexTransparent : "#e6ebff",
        priceBefore : 130,
        priceAfter : 60,
        src : "blue.png"
    },
    {
        colorName : "Red",
        colorHexFirst :"#e2472f",
        colorHexSecondary : "#681d12",
        colorHexTransparent : "#ffe8e4",
        priceBefore : 130,
        priceAfter : 70,
        src : "red.png"
    },
    {
        colorName : "Green",
        colorHexFirst:"#6cd64f",
        colorHexSecondary :"#42842f",
        colorHexTransparent : null,
        priceBefore : 120,
        priceAfter : null,
        src : "green.png"
    },
    {
        colorName : "Black",
        colorHexFirst:"#747474",
        colorHexSecondary :"#474948",
        colorHexTransparent : null,
        priceBefore : 120,
        priceAfter : null,
        src : "black.png"
    },
    {
        colorName : "Orange",
        colorHexFirst:"#e75516",
        colorHexSecondary :"#7c2804",
        colorHexTransparent : null,
        priceBefore : 120,
        priceAfter : null,
        src : "orange.png"
    },
]

const wrapper = document.querySelector('.wrapper')
const productWrapper = wrapper.querySelector('.product')

const productImage = document.querySelector('.product-image')
const productBrand = productImage.querySelector('.product-brand')
const productBrandBackground = productImage.querySelector('.product-brand-background')
const productPic = productImage.querySelector('.product-pic')

const productRoute = document.querySelectorAll('.product-route span')
const productName = document.querySelector('.product-name')
const productColorName = document.querySelector('.product-color-name')
const productRatePrice = document.querySelector('.product-rate-price')
const productPrice = document.querySelector('.product-price')
const priceBefore = productPrice.querySelector('.price-before')
const productDescription = document.querySelector('.product-description')
const productColor = document.querySelector('.product-color')
const productSize = document.querySelector('.product-size')
const productCart = document.querySelector('.product-cart')

const productColorUl = productColor.querySelector('ul')
const productSizeUl = productSize.querySelector('ul')
const productSizeLi = productSizeUl.querySelectorAll('li')

const cartBtn = document.querySelector('.product-cart .cart')
const favBtn = document.querySelector('.product-cart .fav')

for(let i = 0; i<product.length; i++){
    productColorUl.insertAdjacentHTML('beforeend', 
        `<li li-index="${i}" onclick="selectColor(this)">
            <span class="color" style="background-color:${product[i].colorHexFirst};"></span>
         </li>`
    )
}

const productColorLi = productColorUl.querySelectorAll('li')

let productIndex = 1
loadProduct(product[productIndex])

function loadProduct(product){
    productColorName.innerHTML = product.colorName
    if(product.priceAfter == null){
        priceBefore.innerHTML = `${product.priceBefore}€`
    }
    else{
        priceBefore.innerHTML = `${product.priceBefore}€`
        priceBefore.classList.add('is-before')
        productPrice.insertAdjacentHTML('beforeend', 
            `   <span class="price-after">${product.priceAfter}€</span>
                <span class="discount">${parseInt((product.priceBefore-product.priceAfter)*100/product.priceBefore)}% discount</span>`
        )
        const priceAfter = document.querySelector('.price-after')
        const discount = document.querySelector('.discount')

        priceAfter.style.color = `${product.colorHexFirst}`
        discount.style.color = `${product.colorHexFirst}`
        discount.style.background = `${product.colorHexTransparent}`
    }
    productColorLi[productIndex].querySelector('span.color').classList.add('active')
    productSizeLi.forEach(element => {
        element.querySelector('span.size').style.borderColor = `${product.colorHexFirst}`
    });
    productRoute.forEach(element => {
        element.style.color = `${product.colorHexFirst}`
    });
    productSizeUl.querySelector('li span.active').style.background = `${product.colorHexFirst}`
    cartBtn.style.background = `${product.colorHexFirst}`
    productPic.src = `./src/img/product/${product.src}`
    productImage.style.background = `linear-gradient(${product.colorHexFirst}, ${product.colorHexSecondary})`
}

function selectColor(element){
    productPic.animate(
        [
            {opacity : 0},
            {opacity : 1}
        ],  {duration : 500}
    )
    if(product[productIndex].priceAfter != null){
        productPrice.querySelector('span.price-after').remove()
        productPrice.querySelector('span.discount').remove()
        productPrice.querySelector('span.price-before').classList.remove('is-before')
    }

    
    productColorLi[productIndex].querySelector('span.color').classList.remove('active')
    
    productIndex = element.getAttribute("li-index")
    if(favBtn.querySelector('i').classList.contains('fas')){
        favBtn.style.color = `${product[productIndex].colorHexFirst}`
    }
    loadProduct(product[productIndex])
}
function selectSize(element){
    productSizeLi.forEach(e => {
        e.querySelector('span.size').classList.remove('active')
        e.querySelector('span.size').style.background = 'none'
    });
    element.querySelector('span.size').classList.add('active')
    element.querySelector('li span.active').style.background = `${product[productIndex].colorHexFirst}`
}

function fav(element){
    const heart = element.querySelector('i')
    if(heart.classList.contains('far')){
        heart.classList.remove('far')
        heart.classList.add('fas')
        element.style.color = `${product[productIndex].colorHexFirst}`
    }
    else{
        heart.classList.remove('fas')
        heart.classList.add('far')
        element.style.color = `#444444`
    }
}

productImage.addEventListener("mousemove", (e) => {
    productImage.classList.remove('animate__animated', 'animate__fadeInUp')
    let xAxis = (window.innerWidth/2 - e.pageX) / 25
    let yAxis = (window.innerHeight/2 - e.pageY) / 25
    productImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
  });

productImage.addEventListener("mouseenter", (e) => {
    productImage.style.transition = "none"
    productBrandBackground.style.transition = "all .5s ease"
    productPic.style.transition = "all .5s ease"
    productBrand.style.transition = "all .5s ease"

    productBrandBackground.style.transform = "translateZ(150px)  rotate(-25deg)"
    productPic.style.transform = "translateZ(200px) rotate(-20deg)"
    productBrand.style.transform = "translateZ(200px)"
});
productImage.addEventListener("mouseleave", (e) => {
    productImage.style.transition = "all .5s ease"
    productBrandBackground.style.transition = "all .5s ease"
    productPic.style.transition = "all .5s ease"
    productBrand.style.transition = "all .5s ease"
    productImage.style.transform = `rotateY(0deg) rotateX(0deg)`
    
    productBrandBackground.style.transform = "translateZ(0px) rotate(-25deg)"
    productPic.style.transform = "translateZ(0px) rotate(-20deg)"
    productBrand.style.transform = "translateZ(0px)"
});