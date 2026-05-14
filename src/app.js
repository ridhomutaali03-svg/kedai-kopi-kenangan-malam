document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items:  [
            { Id: 1, nama: 'Robusta', gambar: '1.jpg', harga: 15000 },
            { Id: 2, nama: 'Arabica', gambar: '2.jpg', harga: 20000 },
            { Id: 3, nama: 'Liberica', gambar: '3.jpg', harga: 25000 },
            { Id: 4, nama: 'Excelsa', gambar: '4.jpg', harga: 30000 },
            { Id: 5, nama: 'Kopi Luwak', gambar: '5.jpg', harga: 50000 },
        ],

        detailItem: null,

            openDetail(barang) { 
                this.detailItem = barang;

                setTimeout(() => {
                    if (window.feather) feather.replace();
                }, 50);
            },
            
            closeDetail() {
                this.item = null;
            }
    })); 
    
    Alpine.store('cart',{
        items:[],
        total:0,
        quantity:0,
        add(newItem){
            // cek apakah item sudah ada di cart//
            const cartItem= this.items.find((item)=> item.Id === newItem.Id);

            // jika belum ada/cart masih kosong//
            if(!cartItem){
                this.items.push({ ...newItem, quantity:1,total:newItem.harga });
                this.quantity++;
                this.total += newItem.harga;
            }else{
                //jika sudah ada di cart,cek apakah barang sudag ada atau sama//
                this.items= this.items.map((item)=>{    
                    //jika barang tidak sama//
                    if(item.Id !== newItem.Id){
                        return item;
                    }else{
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                            total: (item.quantity + 1) * item.harga
                        };
                    }
                });
                this.quantity++;
                this.total += newItem.harga;
            }
        },
        remove(id){
            //hapus item dari cart//
            const cartItem= this.items.find((item)=> item.Id === id);
            if (!cartItem) return;

            //jika item ditemukan//
            if(cartItem.quantity > 1){
                //telusuri item dan kurangi quantity//
                this.items= this.items.map((item)=>{
                    //jika bukan barang yg di klik//
                    if(item.Id !== id){
                        return item;
                    }else{
                        const newQty = item.quantity - 1;
                        return{
                            ...item,
                            quantity:newQty,
                            total:newQty * item.harga
                        };
                    }
                });
                this.quantity--;
                this.total -=  cartItem.harga;
            } else if (cartItem.quantity === 1){
                //hapus item dari cart//
                this.items= this.items.filter((item)=> item.Id !== id);
                this.quantity--;
                this.total -= cartItem.harga;
            }
        }
    });
});


//form validation
const checkoutButton= document.querySelector('.checkout-btn');
checkoutButton.disabled= true;

const form=document.querySelector('#CheckoutForm');

form.addEventListener('keyup', function () {
    for (let i = 0; i < form.elements.length; i++) {
        if(form.elements[i].value.length !== 0){
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled= false;
    checkoutButton.classList.remove('disabled');
});


// kirim data ketika tombol checkout diklik
checkoutButton.addEventListener('click', async function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);
    // window.open('http://wa.me/6281930522954?text=' + encodeURIComponent(message));

    // minta transaction tokoen menggunakan ajax / fetch
    try{
        const response = await fetch('php/placeOrder.php',{
            method:'POST',
            body: data,
        });
        const token = await response.text();
        //console.log(token);
        window.snap.pay(token);
    } catch (err){
        console.log(err.message);
    }
});

// format pesan whatsapp
const formatMessage = (obj) => {
    return `Data Customer
        Nama: ${obj.nama}
        Email: ${obj.email}
        No Hp: ${obj.phone}
Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.nama} (${item.quantity} x ${rupiah(item.total)}) \n`)}
TOTAL: ${rupiah(obj.total)}
Terima kasih.`;
};



// convert harga ke format rupiah//
const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
        style:"currency",
        currency:"IDR",
        minimumFractionDigits:0,
    }).format(number);
};