const container=document.querySelector('.container')
const remove=document.querySelector('.remove')
const total=document.querySelector('.total')
const checkout=document.querySelector('.checkout')
const clear=document.querySelector('.clear')

const getItem=localStorage.getItem('cartItems')
const goods=JSON.parse(getItem)
console.log(goods)

let sum=0

goods.forEach((name,index)=>{
    const carrier=document.createElement('div')
    carrier.classList.add('carrier')
  
    carrier.innerHTML=`
                <div><img  class="image" src="${name.thumbnail}"/></div>
                <h2>${name.title}</h2>
                <p>Price: <span>$</span>${name.price}</p>
                    <button class="remove">
                    <b>
                    Remove from cart
                    </b>
                    </button>
    `
    
    sum += name.price
    total.innerHTML= `SumTotal:  $${sum}`
    checkout.innerHTML=`Checkout   $${sum}`


container.appendChild(carrier)

const remove=carrier.querySelector('.remove')

remove.addEventListener('click', ()=>{
        goods.splice(index, 1)
        localStorage.setItem('cartItems',JSON.stringify(goods))
        window.location.reload()
})
    
})

clear.addEventListener('click', ()=>{
        goods.splice(0,goods.length)
        localStorage.removeItem('cartItems')
        window.location.reload()
})


