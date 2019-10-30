(() => {
  const EVENTS = {
    addToCartListener() {
      let productInner = document.querySelectorAll(".card");
      productInner.forEach(product => {
        product.addEventListener("click", METHODS.addItemToCart);
      });
    },

    deleteItemFromCartListener() {
      let findDeleteButtonFromChart = document.querySelectorAll(
        ".borrar-curso"
      );
      findDeleteButtonFromChart.forEach(deleteButton => {
        deleteButton.addEventListener("click", METHODS.deleteItem);
      });
    },

    deleteAllItemsListener() {
      let removeAllButton = document.getElementById("vaciar-carrito");
      removeAllButton.addEventListener("click", METHODS.deleteAllItems);

    },
  };
  const METHODS = {
    start() {
      EVENTS.addToCartListener();
      EVENTS.deleteAllItemsListener()
      EVENTS.deleteItemFromCartListener();
    //   EVENTS.loadProductsAddedListener()
    },
    loadProductAdded(){
        let productsLS 
        productsLS = METHODS.checkProductsToBeSaved()
        console.log('cursos cazxcrgados' ,productsLS)
        productsLS.forEach( product => {
            console.log('product en ls' ,product)
            let productCard = document.createElement("tr")
            productCard.innerHTML = `
            <tr>
                  <td>
                    <img src="${product.img}" width=100>
                   </td>
                   <td>
                   ${product.title}
                   </td>
                   <td> 
                   ${product.price}
                   </td>
                  <td>
                     <a href="#" class="borrar-curso" data-id=${product.id}>X</a>
                </td>
               </tr>
                `;
                let itemListInCart = document.querySelector(".container-products");
      itemListInCart.appendChild(productCard);
        })
    },
    addItemToCart(product) {
      product.preventDefault();
      console.log('producasdasdasdasdto',product)
    //   console.log('otra cosa', product.querySelector('img').src)
      if (product.target.classList.contains("agregar-carrito")) {
        const item = product.target.parentElement.parentElement;
        METHODS.createItemInCart(item);
      }
    },
    createItemInCart(product) {
        const card = {
            img : product.querySelector("img").src,
            title : product.querySelector("h4").textContent,
            price : product.querySelector(".precio span").textContent,
            id : product.querySelector("a").getAttribute("data-id")
        }
        let productCard = document.createElement("tr")
        productCard.innerHTML = `
        <tr>
              <td>
                <img src="${card.img}" width=100>
               </td>
               <td>
               ${card.title}
               </td>
               <td> 
               ${card.price}
               </td>
              <td>
                 <a href="#" class="borrar-curso" data-id=${card.id}>X</a>
            </td>
           </tr>
            `;
      let itemListInCart = document.querySelector(".container-products");
      itemListInCart.appendChild(productCard);
      EVENTS.deleteItemFromCartListener(productCard);
      METHODS.saveProductLocalStorage(card)
    },
    deleteItem(product) {
        let item, itemId
      if (product.target.classList.contains("borrar-curso")) {
        product.target.parentElement.parentElement.remove();
        item = product.target.parentElement.parentElement
        itemId = item.querySelector('a').getAttribute('data-id')
      }
      METHODS.removeItemFromLocalStorage(itemId)
    },
    removeItemFromLocalStorage(product){
        let productsLS
        productsLS = METHODS.checkProductsToBeSaved()
        productsLS.forEach( (item, index) => {
            if ( item.id === product ){
                productsLS.splice(index,1)
            }
        })
        localStorage.setItem('products', JSON.stringify(productsLS))
    },
    deleteAllItems() {
      let productAdded = document.querySelectorAll(".container-products tr");
      if (productAdded.length >= 0) {
        for (let i = 0; i < productAdded.length; i++) {
          productAdded[i].remove();
        }
      }
      METHODS.emptyLocalStorage()
    },
    saveProductLocalStorage(product){
        console.log(product)
        let products ;
        products  = METHODS.checkProductsToBeSaved()
        products.push(product)
        // console.log('el item 1',item)
        localStorage.setItem('products', JSON.stringify(products))
        
        // console.log('el item 2',item)
    },
    checkProductsToBeSaved(){
        let productsLS
        if(localStorage.getItem('products') === null ){
            productsLS = []
        }
        else {
            productsLS = JSON.parse(localStorage.getItem('products'))
        }
        return productsLS
    },
    emptyLocalStorage(){
        localStorage.clear()
    }
  };
  document.addEventListener('DOMContentLoaded', METHODS.loadProductAdded)
  window.addEventListener("load", METHODS.start);
})();
