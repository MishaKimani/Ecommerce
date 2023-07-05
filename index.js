const categories=document.querySelector('.categories')
const products=document.querySelector('.products')
const form=document.querySelector('.form')
const input=document.querySelector('.input')
const navbar=document.querySelector('.navbar')
const button=document.querySelector('.button')
const dropdown=document.querySelector('.dropdown')
const signin=document.querySelector('.signin')
const toggle=document.querySelector('.toggle')
const num=navbar.querySelector('.num')

let searchparam='phone'
let cartItems = []

let object = localStorage.getItem('cartItems')
let cartObjects = JSON.parse(object)
if (cartObjects) {
    num.innerHTML= cartObjects.length

}


const fetchCategories=async() =>{

    const response=await fetch('https://dummyjson.com/products/categories')
    const data=await response.json()
    console.log(data)
    data.forEach (async(element) => {
        const list=document.createElement('ul')
        list.classList.add('list')
        list.innerHTML=`<div class="categoryname">${element}</div>`
        const parent = document.createElement('div')
        parent.classList.add('parent')
        
        const response=await fetch(`https://dummyjson.com/products/category/${element}`)
        const data=await response.json()
        const categoryname=list.querySelector('.categoryname')
        categoryname.appendChild(parent)
        data.products.forEach(product => {
            const item=document.createElement('ul')
            item.classList.add('item')
            item.innerHTML=`
            <li class="prodcategory">${product.title}</li>
            `
            parent.appendChild(item)
        });

    parent.style.display = 'none'
     categories.appendChild(list)
    });
}

fetchCategories()


const fetchProducts=async() =>{
    const response=await fetch('https://dummyjson.com/products')
    const data=await response.json()
    console.log(data)
    data.products.forEach((name) =>{
        const productCont=document.createElement('div')
        productCont.classList.add('productCont')
        productCont.innerHTML=`
            <div><img  class="image" src="${name.thumbnail}"/></div>
            <h2>${name.title}</h2>
            <p>Price: <span>$</span>${name.price}</p>
            <button class="cart">Add To Cart</button>
        `

        const addButton=productCont.querySelector('.cart')
            const cartNum = navbar.querySelector('.mallincart')
            

            addButton.addEventListener('click', ()=>{
                const productObj = {
                    title: name.title,
                    price: name.price,
                    thumbnail: name.thumbnail
                }
                cartItems.push(productObj)
                localStorage.setItem('cartItems', JSON.stringify(cartItems))
            
                num.innerHTML=cartItems.length
                

            })

            cartNum.addEventListener('click',()=>{
                window.open("product.html",target="_blank")
            })


        products.appendChild(productCont)
    })
}

fetchProducts()
    
    form.addEventListener('submit',async(e)=>{
        e.preventDefault()
        searchparam=input.value
        products.innerHTML=''
        const response=await fetch(`https://dummyjson.com/products/search?q=${searchparam}`)
        const data=await response.json()
        console.log(data)
        data.products.forEach((name) =>{
            const productCont=document.createElement('div')
            productCont.classList.add('productCont')
            productCont.innerHTML=`
                <div><img  class="image" src="${name.thumbnail}"/></div>
                <h2>${name.title}</h2>
                <p>Price: <span>$</span>${name.price}</p>
                <button class="cart">Add To Cart</button>
            `

            const addButton=productCont.querySelector('.cart')
            const cartNum = navbar.querySelector('.mallincart')
            

            addButton.addEventListener('click', ()=>{
                const productObj = {
                    title: name.title,
                    price: name.price,
                    thumbnail: name.thumbnail
                }
                cartItems.push(productObj)
                localStorage.setItem('cartItems', JSON.stringify(cartItems))
            
                console.log(cartItems)
                

            })

            cartNum.addEventListener('click',()=>{
                window.open("product.html",target="_blank")
            })


            products.appendChild(productCont)
        })
    })


categories.addEventListener('click',(e)=>{
    console.log(e.target.tagName)
    const parent = e.target.querySelector('.parent')
    if (e.target.tagName === 'DIV' && parent.style.display === 'none') {
        parent.style.display = 'block'
    } else if(e.target.tagName === 'DIV' && parent.style.display === 'block') {
        parent.style.display = 'none'

    }
})

dropdown.style.display= 'none'

button.addEventListener('click',(e)=>{
    
    if (e.target.tagName === 'DIV' && dropdown.style.display === 'none') {
        dropdown.style.display= 'block'
    } else if(e.target.tagName === 'DIV' && dropdown.style.display === 'block') {
        dropdown.style.display = 'none'

    }
})


     
categories.style.display= 'none'

toggle.addEventListener('click',(e)=>{
    if (e.target.tagName === 'DIV' && categories.style.display === 'none') {
        categories.style.display= 'block'
    } else if(e.target.tagName === 'DIV' && categories.style.display === 'block') {
        categories.style.display = 'none'
    }
})

signin.addEventListener('click' ,()=>{
    window.open('./account.html')
})