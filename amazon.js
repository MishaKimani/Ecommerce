const categories=document.querySelector('.categories')
const products=document.querySelector('.products')
const form=document.querySelector('.form')
const input=document.querySelector('.input')

let searchparam='phone'

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
    
    form.addEventListener('submit',async(e)=>{
        e.preventDefault()
        searchparam=input.value
        products.innerHTML=''
        const response=await fetch(`https://dummyjson.com/products/search?q=${searchparam}`)
        const data=await response.json()
        console.log(data)
        data.products.forEach((name) =>{
            const container=document.createElement('div')
            container.classList.add('container')
            container.innerHTML=`
            <div class="image"><img src="${name.thumbnail}"></img></div>
            <h2>${name.title}</h2>
            <h2>Ksh ${name.price}</h2>
            <button class="cart">Add to cart</button>`

            products.appendChild(container)
        })
    })


fetchCategories()

categories.addEventListener('click',(e)=>{
    console.log(e.target.tagName)
    const parent = e.target.querySelector('.parent')
    if (e.target.tagName === 'DIV' && parent.style.display === 'none') {
        parent.style.display = 'block'
    } else if(e.target.tagName === 'DIV' && parent.style.display === 'block') {
        parent.style.display = 'none'

    }
})