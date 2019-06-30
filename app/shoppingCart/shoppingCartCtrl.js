app.controller("shoppingCartCtrl", function($scope, $location, userSrv, productSrv, shoppingCartSrv, $log) {

    $scope.shoppingCarts = [];
    $shoppingCartIsEmpty = false;
    $scope.subtotal = 0;

    shoppingCartSrv.getShoppingCartPerUserID().then(function(shoppingCarts) {
        $scope.shoppingCarts = shoppingCarts;
    }, function(err) {
        console.error(err);
    });

    if ($scope.shoppingCarts.length > 0) {
        $shoppingCartIsEmpty = true;
    }

    function removeItemFromCart(shoppingCart) {

    }

    function updateProductQuantityInCart(productQuantity) {

    }

    //         updateQuantity(this);
    //    remove button-
    //         removeItem(this);



    //     /* Recalculate cart */
    //     function recalculateCart() {
    //         var subtotal = 0;

    //         /* Sum up row totals */
    //         $('.product').each(function() {
    //             subtotal += parseFloat($(this).children('.product-line-price').text());
    //         });

    //         /* Calculate totals */
    //         var tax = subtotal * taxRate;
    //         var shipping = (subtotal > 0 ? shippingRate : 0);
    //         var total = subtotal + tax + shipping;

    //         /* Update totals display */
    //         $('.totals-value').fadeOut(fadeTime, function() {
    //             $('#cart-subtotal').html(subtotal.toFixed(2));
    //             $('#cart-tax').html(tax.toFixed(2));
    //             $('#cart-shipping').html(shipping.toFixed(2));
    //             $('#cart-total').html(total.toFixed(2));
    //             if (total == 0) {
    //                 $('.checkout').fadeOut(fadeTime);
    //             } else {
    //                 $('.checkout').fadeIn(fadeTime);
    //             }
    //             $('.totals-value').fadeIn(fadeTime);
    //         });
    //     }


    //     /* Update quantity */
    //     function updateQuantity(quantityInput) {
    //         /* Calculate line price */
    //         var productRow = $(quantityInput).parent().parent();
    //         var price = parseFloat(productRow.children('.product-price').text());
    //         var quantity = $(quantityInput).val();
    //         var linePrice = price * quantity;

    //         /* Update line price display and recalc cart totals */
    //         productRow.children('.product-line-price').each(function() {
    //             $(this).fadeOut(fadeTime, function() {
    //                 $(this).text(linePrice.toFixed(2));
    //                 recalculateCart();
    //                 $(this).fadeIn(fadeTime);
    //             });
    //         });
    //     }


    //     /* Remove item from cart */
    //     function removeItem(removeButton) {
    //         /* Remove row from DOM and recalc cart total */
    //         var productRow = $(removeButton).parent().parent();
    //         productRow.slideUp(fadeTime, function() {
    //             productRow.remove();
    //             recalculateCart();
    //         });
    //     }

    // });



})