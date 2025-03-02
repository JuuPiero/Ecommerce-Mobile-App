@extends('client.layouts._masterLayout')

@section('content')
<!--Page Title-->
<div class="page section-header text-center">
    <div class="page-title">
        <div class="wrapper"><h1 class="page-width">Your cart</h1></div>
      </div>
</div>
<!--End Page Title-->

<div class="container">
    <div class="row">
       
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 main-col">
            @if (count($cart))
                <form action="#" method="post" class="cart style2">
                    <table>
                        <thead class="cart__row cart__header">
                            <tr>
                                <th colspan="2" class="text-center">Product</th>
                                <th class="text-center">Price</th>
                                <th class="text-center">Quantity</th>
                                <th class="text-right">Total</th>
                                <th class="action">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{-- <tr class="cart__row border-bottom line1 cart-flex border-top">
                                <td class="cart__image-wrapper cart-flex-item">
                                    <a href="#"><img class="cart__image" src="assets/images/product-images/product-image3.jpg" alt="3/4 Sleeve Kimono Dress"></a>
                                </td>
                                <td class="cart__meta small--text-left cart-flex-item">
                                    <div class="list-view-item__title">
                                        <a href="#">3/4 Sleeve Kimono Dress</a>
                                    </div>
                                </td>
                                <td class="cart__price-wrapper cart-flex-item">
                                    <span class="money">$735.00</span>
                                </td>
                                <td class="cart__update-wrapper cart-flex-item text-right">
                                    <div class="cart__qty text-center">
                                        <div class="qtyField">
                                            <a class="qtyBtn minus" href="javascript:void(0);"><i class="icon icon-minus"></i></a>
                                            <input class="cart__qty-input qty" type="text" name="updates[]" id="qty" value="1" pattern="[0-9]*">
                                            <a class="qtyBtn plus" href="javascript:void(0);"><i class="icon icon-plus"></i></a>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-right small--hide cart-price">
                                    <div><span class="money">$735.00</span></div>
                                </td>
                                <td class="text-center small--hide"><a href="#" class="btn btn--secondary cart__remove" title="Remove tem"><i class="icon icon anm anm-times-l"></i></a></td>
                            </tr> --}}
                            @foreach ($items as $item)
                                <tr class="cart__row border-bottom line1 cart-flex border-top">
                                    <td class="cart__image-wrapper cart-flex-item">
                                        <a href="#"><img class="cart__image" src="{{asset('uploads/product/' . $item['product']->images[0]->name)}}" alt="3/4 Sleeve Kimono Dress"></a>
                                    </td>
                                    <td class="cart__meta small--text-left cart-flex-item">
                                        <div class="list-view-item__title">
                                            <a href="#">{{$item['product']->name}}</a>
                                        </div>
                                    </td>
                                    <td class="cart__price-wrapper cart-flex-item">
                                        <span class="money">{{$item['product']->price}}₫</span>
                                    </td>
                                    <td class="cart__update-wrapper cart-flex-item text-right">
                                        <div class="cart__qty text-center">
                                            <div class="qtyField">
                                                {{-- <a class="qtyBtn minus" href="javascript:void(0);"><i class="icon icon-minus"></i></a> --}}
                                                <input class="cart__qty-input qty" type="text" readonly name="total_amout" id="qty" value="{{$item['quantity']}}" pattern="[0-9]*">
                                                {{-- <a class="qtyBtn plus" href="javascript:void(0);"><i class="icon icon-plus"></i></a> --}}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right small--hide cart-price">
                                        <div><span class="money">{{$item['quantity'] * $item['product']->price}}₫</span></div>
                                    </td>
                                    <td class="text-center small--hide"><a href="{{route('cart.remove', $item['product']->id)}}" class="btn btn--secondary cart__remove" title="Remove tem"><i class="icon icon anm anm-times-l"></i></a></td>
                                </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-left"><a href="{{route('home')}}" class="btn--link cart-continue"><i class="icon icon-arrow-circle-left"></i> Continue shopping</a></td>
                            </tr>
                        </tfoot>
                    </table>
                
                </form>
            @endif
        </div>
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 cart__footer">
            <div class="solid-border">
                <div class="row mb-2" >
                    <span class="col-12 col-sm-6 cart__subtotal-title"><strong style="font-size: 1.3rem">Subtotal</strong></span>
                    <span class="col-12 col-sm-6 cart__subtotal-title cart__subtotal text-right"><span class="money" style="font-size: 1.3rem">₫</span></span>
                </div>
              {{-- <div class="cart__shipping">Shipping &amp; taxes calculated at checkout</div> --}}
              {{-- <p class="cart_tearm">
                <label>
                  <input type="checkbox" name="tearm" id="cartTearm" class="checkbox" value="tearm" required="">
                   I agree with the terms and conditions</label>
              </p> --}}
              {{-- <input type="submit" name="checkout" id="cartCheckout" class="btn btn--small-wide checkout" value="Checkout" > --}}
                @auth
                    @if(count($cart))
                        <a href="{{route('checkout')}}" id="cartCheckout" class="btn btn--small-wide checkout">Checkout</a>
                    
                    @else
                        <a href="{{route('home')}}" id="cartCheckout" class="btn btn--small-wide checkout">Add something to cart</a>
                    @endif
                @endauth
                @guest
                    <a href="{{route('user.login')}}" id="cartCheckout" class="btn btn--small-wide checkout">You Need To Login</a>
                @endguest
              <div class="paymnet-img"><img src="{{asset('assets/client/images/payment-img.jpg')}}" alt="Payment"></div>
            </div>
        </div>
    </div>
</div>


@endsection
@section('scripts')
<script>
    const subTotalEl = document.querySelector('.cart__subtotal')
    const priceEl = document.querySelectorAll('.cart-price .money')
    let subTotal = 0
    priceEl.forEach(el => {
        console.log(el.textContent);
        subTotal += parseInt(el.textContent)
    });
    subTotalEl.innerHTML = `${subTotal}₫`

</script>    
@endsection