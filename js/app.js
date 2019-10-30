(() => {
    const EVENTS = {
        addToCartListener() {
            let productInner = document.querySelectorAll('.card')
            productInner.forEach(product => {
                product.addEventListener('click', METHODS.addItemToCart)
            })
        },

        deleteItemFromCartListener(){
            let findDeleteButtonFromChart = document.querySelectorAll('.borrar-curso')
            findDeleteButtonFromChart.forEach(deleteButton => {
                deleteButton.addEventListener('click', METHODS.deleteItem)
                })  
            
        },

        deleteAllItemsListener(){
            let removeAllButton = document.getElementById('vaciar-carrito')
            removeAllButton.addEventListener('click', METHODS.deleteAllItems)
        }
    }
    const METHODS = {
        start(){
        EVENTS.addToCartListener()
        EVENTS.deleteAllItemsListener()
        // EVENTS.deleteItemFromCart()
        },
        addItemToCart(product) {
            product.preventDefault()
            console.log(product)
            if (product.target.classList.contains('agregar-carrito')){
                console.log(`producto en addItemToCart ${product}` )
                const item = product.target.parentElement.parentElement
                METHODS.createItemInCart(item)
                // METHODS.deleteItem(item)
                // EVENTS.addToCartListener()
                
            } else {
                console.log('nop')
            }
            // EVENTS.deleteAllItemsListener()
            // return true
        },
        createItemInCart(product){
            let productCard = document.createElement('tr')
            let img = product.querySelector('img').src
            let title = product.querySelector('h4').textContent
            let price = product.querySelector('.precio span').textContent
            let id = product.querySelector('a').getAttribute('data-id')
            productCard.innerHTML = `
            <tr>
              <td>
                <img src="${img}" width=100>
               </td>
               <td>
               ${title}
               </td>
               <td> 
               ${price}
               </td>
              <td>
                 <a href="#" class="borrar-curso" data-id=${id}>X</a>
            </td>
           </tr>
            `
            console.log(productCard)
            let itemListInCart = document.querySelector('#lista-carrito tbody')
            itemListInCart.appendChild(productCard)
            EVENTS.deleteItemFromCartListener(productCard)
        },
        deleteItem(product){
              if (product.target.classList.contains('borrar-curso')){
           product.target.parentElement.parentElement.remove()
        }
   
        },
        deleteAllItems(products){
            console.log('que llega ', products)
            console.log('hijo', products.target.parentElement.firstChild)
            console.log('borra todos los productos', products)
            // return false
        }
    }
    window.addEventListener('load', METHODS.start )
})()
