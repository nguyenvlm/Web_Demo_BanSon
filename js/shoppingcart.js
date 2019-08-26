$(window).scroll(function () {
    var cart = $('.shopping-item');

    if (window.pageYOffset >= 82 && $(document).width() >= 559) cart.addClass('shopping-cart');
    else cart.removeClass('shopping-cart');
});

var listCart = [];

$(document).ready(function () {
    if (typeof (Storage) !== 'undefined') {
        if (localStorage.cart) {
            listCart = JSON.parse(localStorage.cart);
        }
    }
    fillCart();
    displayCart();
    displayCheckout();
});

function fillCart() {
    var price = calcPrice() + '<sup>đ</sup>';
    $('.product-count').html(listCart.length);
    $('.cart-amunt').html(price);
}

function calcPrice() {
    var totalPrice = 0;
    if (listCart.length > 0) {
        listCart.forEach(item => totalPrice += item.SaleSP * item.amount);
    }
    return totalPrice;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function itemDrag(ev) {
    // console.log(ev.target.dataset.itemid);
    ev.dataTransfer.setData("item", ev.target.dataset.itemid);
    // console.log(ev.target);
}

function addToCart(id, amount = 1) {
    var item;
    var has = false;
    console.log(listCart.length);
    for (var i = 0; i < listCart.length; i++) {
        console.log(listCart[i].Id == id);

        if (listCart[i].Id == id) {
            // console.log(`ID: ${id} -- listCart ${listCart[i].Id}`)
            item = listCart[i];
            item.amount += parseInt(amount);
            has = true;
            break;
        }
    }
    // console.log(item);
    item = item || getItemById(id);
    item.amount = item.amount || parseInt(amount);
    if (!has) listCart.push(item);
    if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(listCart));
    }
    fillCart();
}

function dropCart(ev) {
    ev.preventDefault();
    var item_id = ev.dataTransfer.getData("item");
    console.log(item_id);
    addToCart(item_id);
}

function displayCart() {
    var txt = "";
    if (listCart.length > 0) {
        for (var i = 0; i < listCart.length; ++i) {
            txt += '<tr class="cart_item"><td class="product-remove"><a title="Remove this item" class="remove" href="javascript:removeItem(' + i + ')">×</a></td>\
            <td class="product-thumbnail"><a href="single-product.html?id=' + listCart[i].Id + '"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="' + listCart[i].LinkImageSP + '"></a></td>\
            <td class="product-name"><a href="single-product.html?id=' + listCart[i].Id + '" onclick="return false;">' + listCart[i].NameSP + '</a></td>\
            <td class="product-price"><span class="amount">' + listCart[i].SaleSP + '<sup>đ</sup></span></td>\
            <td class="product-quantity">\
                <div class="quantity buttons_added">\
                    <input type="button" class="minus" value="-" onclick="decQty(' + i + ')">\
                    <input type="text" size="1" class="input-text qty text" title="Qty" value="' + listCart[i].amount + '" onkeypress="validateNumber(event)" onchange="modifyQty( ' + i + ', event)"  style="padding: 5px" >\
                    <input type="button" class="plus" value="+" onclick="incQty(' + i + ')">\
                </div>\
            </td>\
            <td class="product-subtotal"><span class="amount">' + listCart[i].SaleSP * listCart[i].amount + '<sup>đ</sup> </span></td>\
            </tr>';
        }
    } else {
        txt = '\
        <tr class="cart_item">\
            <td colspan="6">Đơn hàng trống. <a href="shop.html">Mua hàng ngay <i class="fa fa-shopping-cart"></i></a></td>\
        </tr>\
        '
    }
    $("#cart_items tbody").html(txt + '<tr><td class="actions" colspan="6"><input type="submit" value="Thanh toán" name="proceed" class="checkout-button button alt wc-forward" onclick="event.preventDefault(); location.href=\'checkout.html\'"> <input type="submit" value="Xóa đơn hàng" name="proceed" class="checkout-button button alt wc-forward" onclick="event.preventDefault(); cancelOrder();"></td></tr>');

    $("#cart_subtotal").html(calcPrice() + '<sup>đ</sup>');
    $("#order_total").html(calcPrice() + '<sup>đ</sup>');
}

function cancelOrder() {
    localStorage.removeItem('cart');
    listCart = [];
    fillCart();
    displayCart();
}

function removeItem(id) {
    listCart.splice(id, 1);
    localStorage.setItem('cart', JSON.stringify(listCart));
    fillCart();
    displayCart();
}

function incQty(id) {
    listCart[id].amount += 1;
    localStorage.setItem('cart', JSON.stringify(listCart));
    fillCart();
    displayCart();
}

function decQty(id) {
    if (listCart[id].amount > 1) {
        listCart[id].amount -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(listCart));
    fillCart();
    displayCart();
}

function modifyQty(id, e) {
    if (e.target.value == "" || e.target.value == 0) {
        e.target.value = listCart[id].amount;
    } else {
        listCart[id].amount = parseInt(e.target.value);
        localStorage.setItem('cart', JSON.stringify(listCart));
        fillCart();
        displayCart();
    }
}

function validateNumber(e) {
    // if (e.key >= '0' && e.key <= '9') {
    //     e.target.value += e.key;
    // }
    // console.log(e.key);
    if (/^[^0-9]{1}$/.test(e.key)) {
        // console.log("prevented!");
        e.preventDefault();
    }
}

function displayCheckout() {
    var txt = "";
    if (listCart.length > 0) {
        for (var i = 0; i < listCart.length; ++i) {
            txt += '<tr class="cart_item">\
                        <td class="product-name"> ' + listCart[i].NameSP + ' <strong class="product-quantity">× ' + listCart[i].amount + '</strong> </td>\
                        <td class="product-total"><span class="amount">' + listCart[i].SaleSP * listCart[i].amount + '<sup>đ</sup> </span> </td>\
                    </tr>'
        }
    } else {
        txt = '\
        <tr class="cart_item">\
            <td colspan="2">Đơn hàng trống<a href="shop.html">Mua hàng ngay <i class="fa fa-shopping-cart"></i></a></td>\
        </tr>\
        '
    }
    $("#checkout_items tbody").html(txt);
    $("#cart_checkout_total").html(calcPrice() + '<sup>đ</sup>');
    $("#order_checkout_total").html(calcPrice() + '<sup>đ</sup>');
}