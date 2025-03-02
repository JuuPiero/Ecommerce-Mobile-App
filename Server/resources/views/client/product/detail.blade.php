@extends('client.layouts._masterLayout')
@section('head')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('content')
<!--MainContent-->
<div id="MainContent" class="main-content" role="main">
    <!--Breadcrumb-->
    <div class="bredcrumbWrap">
        <div class="container breadcrumbs">
            <a href="index.html" title="Back to the home page">Home</a><span aria-hidden="true">›</span><span>{{$product->name}}</span>
        </div>
    </div>
    <!--End Breadcrumb-->
    
    <div id="ProductSection-product-template" class="product-template__container prstyle1 container">
        <!--product-single-->
        <div class="product-single">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="product-details-img">
                        <div class="product-thumb">
                            <div id="gallery" class="product-dec-slider-2 product-tab-left">
                                @foreach ($product->images as $index => $image)
                                    <a data-image="{{asset('uploads/product/' . $image->name )}}" data-zoom-image="{{asset('uploads/product/' . $image->name )}}" class="slick-slide slick-cloned" data-slick-index="-{{$index}}" aria-hidden="true" tabindex="-1">
                                        <img class="blur-up lazyload" src="{{asset('uploads/product/' . $image->name )}}" alt="" />
                                    </a>
                                @endforeach
                               
                            </div>
                        </div>
                        <div class="zoompro-wrap product-zoom-right pl-20">
                            <div class="zoompro-span">
                                <img class="zoompro blur-up lazyload" data-zoom-image="{{asset('uploads/product/' . $product->images[count($product->images) - 1]->name )}}" alt="" src="{{asset('uploads/product/' . $product->images[count($product->images) - 1]->name )}}" />
                            </div>
                           
                            <div class="product-buttons">
                                {{-- <a href="https://www.youtube.com/watch?v=93A2jOW5Mog" class="btn popup-video" title="View Video"><i class="icon anm anm-play-r" aria-hidden="true"></i></a> --}}
                                {{-- <a href="#" class="btn prlightbox" title="Zoom"><i class="icon anm anm-expand-l-arrows" aria-hidden="true"></i></a> --}}
                            </div>
                        </div>
                        <div class="lightboximages">
                            {{-- <a href="assets/images/product-detail-page/cape-dress-1.jpg" data-size="1462x2048"></a> --}}
                            @foreach ($product->images as $image)
                                <a href="{{asset('uploads/product/' . $image->name )}}" data-size="1462x2048"></a>
                            @endforeach
                        </div>

                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="product-single__meta">
                            <h1 class="product-single__title">{{$product->name}}</h1>
                            <div class="prInfoRow">
                                <div class="product-stock"> <span class="instock ">In Stock</span> <span class="outstock hide">Unavailable</span> </div>
                                <div class="product-sku">SKU: <span class="variant-sku">{{$product->sku}}</span></div>
                                
                                <div class="product-review">
                                    <a class="reviewLink" href="#tab2">
                                        @for ($i = 1; $i <= $product->averageRating(); $i++)
                                            <i class="font-13 fa fa-star"></i>
                                        @endfor
                                        @for ($i = 1; $i <= 5 - $product->averageRating(); $i++)
                                            <i class="font-13 fa fa-star-o"></i>
                                        @endfor
                                    
                                        <span class="spr-badge-caption">{{count($product->ratings)}} review(s)</span>
                                    </a>
                                </div>
                            </div>
                            <p class="product-single__price product-single__price-product-template">
                                <span class="visually-hidden">Regular price</span>
                                <s id="ComparePrice-product-template"><span class="money">600.00₫</span></s>
                                <span class="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                                    <span id="ProductPrice-product-template">
                                        <span class="money">{{$product->price}}₫</span>
                                    </span>
                                </span>
                            </p>
                        </div>

                        <div class="product-single__description rte">
                            {{getShortDescription($product->description)}}
                        </div>
                       
                        <form method="post" action="" id="product_form_10508262282" accept-charset="UTF-8" class="product-form product-form-product-template hidedropdown" enctype="multipart/form-data">
                            @foreach ($product->attributes as $attribute)
                                <div class="swatch clearfix " >
                                    <div class="product-form__item">
                                    <label class="header">{{$attribute->name}}: <span class="slVariant">{{$attribute->value}}</span></label>
                                    </div>
                                </div>
                            @endforeach
                            <!-- Product Action -->
                            <div class="product-action clearfix">
                                <div class="product-form__item--quantity">
                                    <div class="wrapQtyBtn">
                                        <div class="qtyField">
                                            <a class="qtyBtn minus" href="javascript:void(0);"><i class="fa anm anm-minus-r" aria-hidden="true"></i></a>
                                            <input type="text" id="Quantity" name="quantity" value="1" class="product-form__input qty" />
                                            <a class="qtyBtn plus" href="javascript:void(0);"><i class="fa anm anm-plus-r" aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                </div>                                
                                <div class="product-form__item--submit">
                                    <button type="button" name="add" class="btn product-form__cart-submit btn-addto-cart" data-id="{{$product->id}}">
                                        <span data-id="{{$product->id}}">Add to cart</span>
                                    </button>
                                </div>
                            </div>
                            <!-- End Product Action -->
                        </form>
                        
                        <div class="display-table shareRow">
                            <div class="display-table-cell medium-up--one-third">
                                <div class="wishlist-btn">
                                    <a class="wishlist add-to-wishlist" href="#" title="Add to Wishlist"><i class="icon anm anm-heart-l" aria-hidden="true"></i> <span>Add to Wishlist</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <!--End-product-single-->
     
        <!--Product Tabs-->
        <div class="tabs-listing">
            <ul class="product-tabs">
                <li rel="tab1"><a class="tablink">Description</a></li>
                <li rel="tab2"><a class="tablink">Product Reviews</a></li>
            </ul>
            <div class="tab-container">
                    <div id="tab1" class="tab-content">
                    <div class="product-detail mb-4">
                        @foreach ($product->attributes as $attribute)
                            <div class="m-2 h3"><strong>{{$attribute->name}}</strong>: {{$attribute->value}}</div>
                        @endforeach
                    </div>

                    <div class="product-description rte mb-4">
                        {!! $product->description !!}

                    </div>
                </div>
                <div id="tab2" class="tab-content">
                    <div id="shopify-product-reviews">
                        <div class="spr-container">
                            <div class="spr-content">
                                <div class="spr-form clearfix">
                                    @auth
                                        <form method="post" action="{{route('user.create.rating')}}" id="new-review-form" class="new-review-form">
                                            @csrf
                                            <input type="hidden" class="rating-product-id" name="product_id" value="{{$product->id}}" />
                                            <h3 class="spr-form-title">Write a review</h3>
                                            <fieldset class="spr-form-review">
                                            <div class="spr-form-review-rating">
                                                <label class="spr-form-label">Rating <i style="color: #ff9500" class="font-13 fa fa-star"></i></label>
                                                <div class="spr-form-input spr-starrating">
                                                    <select name="rating" class="num-star">
                                                        @for ($i = 5; $i >= 1; $i--)
                                                            <option value="{{$i}}">{{$i}}</option>
                                                        @endfor
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="spr-form-review-body">
                                                <label class="spr-form-label" for="review_body_10508262282">Body of Review <span class="spr-form-review-body-charactersremaining">(1500)</span></label>
                                                <div class="spr-form-input">
                                                <textarea class="spr-form-input spr-form-input-textarea rating-comment" id="review_body_10508262282" data-product-id="10508262282" name="comment" rows="5" placeholder="Write your comments here"></textarea>
                                                </div>
                                            </div>
                                            </fieldset>
                                            <fieldset class="spr-form-actions">
                                                <input type="submit" class="spr-button spr-button-primary button button-primary btn btn-primary submit-rating-btn" value="Submit Review">
                                            </fieldset>
                                        </form>
                                    @endauth
                                    @guest
                                        <a href="{{route('user.login')}}" class="btn btn-primary">Login to write your review</a>
                                    @endguest
                                </div>
                                <div class="spr-reviews">
                                    @if (count($ratings))
                                        @foreach ($ratings as $rating)
                                            <div class="spr-review">
                                                <div class="spr-review-header">
                                                    <span class="product-review spr-starratings spr-review-header-starratings">
                                                        <span class="reviewLink">
                                                            @for ($i = 0; $i < $rating->rating; $i++)
                                                                <i class="font-13 fa fa-star"></i>
                                                            @endfor
                                                            @if (5 - $rating->rating > 0)
                                                                @for ($i = 0; $i < 5 - $rating->rating; $i++)
                                                                    <i class="font-13 fa fa-star-o"></i>
                                                                @endfor
                                                            @endif
                                                        </span>
                                                    </span>
                                                    <h3 class="spr-review-header-title">{{$rating->user->first_name . ' ' . $rating->user->last_name}}</h3>
                                                    <span class="spr-review-header-byline">on <strong>{{$rating->created_at}}</strong></span>
                                                </div>
                                                <div class="spr-review-content">
                                                    <p class="spr-review-content-body">{{$rating->comment}}</p>
                                                </div>
                                            </div>
                                        @endforeach
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End Product Tabs-->
        
        <!--Related Product Slider-->
        <div class="related-product grid-products">
            <header class="section-header">
                <h2 class="section-header__title text-center h2"><span>Suggest Products</span></h2>
                {{-- <p class="sub-heading">You can stop autoplay, increase/decrease aniamtion speed and number of grid to show and products from store admin.</p> --}}
            </header>
            <div class="productPageSlider">
                @foreach ($suggests as $suggest)
                    <div class="col-12 item">
                        <!-- start product image -->
                        <div class="product-image">
                            <!-- start product image -->
                            <a href="{{route('home.product.detail', $suggest->id)}}">
                                <!-- image -->
                                <img class="primary blur-up lazyload" data-src="{{asset('uploads/product/' . $suggest->images[0]->name )}}" src="{{asset('uploads/product/' . $suggest->images[0]->name )}}" alt="image" title="product">
                                <!-- End image -->
                                <!-- Hover image -->
                                <img class="hover blur-up lazyload" data-src="{{asset('uploads/product/' . $suggest->images[count($suggest->images) - 1]->name )}}" src="{{asset('uploads/product/' . $suggest->images[count($suggest->images) - 1]->name )}}" alt="image" title="product">
                                <!-- End hover image -->
                            </a>
                            <!-- end product image -->

                            <!-- Start product button -->
                            <form class="variants add" >
                                <button data-id="{{$suggest->id}}" class="btn btn-addto-cart" type="button" tabindex="0">Add to cart</button>
                            </form>
                            <div class="button-set">
                                <a href="#" title="Quick View" class="quick-view" tabindex="0">
                                    <i class="icon anm anm-search-plus-r"></i>
                                </a>
                                <div class="wishlist-btn">
                                    <a class="wishlist add-to-wishlist" href="wishlist.html">
                                        <i class="icon anm anm-heart-l"></i>
                                    </a>
                                </div>
                            </div>
                            <!-- end product button -->
                        </div>
                        <!-- end product image -->
                        <!--start product details -->
                        <div class="product-details text-center">
                            <!-- product name -->
                            <div class="product-name">
                                <a href="{{route('home.product.detail', $suggest->id)}}">{{$suggest->name}}</a>
                            </div>
                            <!-- End product name -->
                            <!-- product price -->
                            <div class="product-price">
                                {{-- <span class="old-price">$500.00₫</span> --}}
                                <span class="price">{{$suggest->price}}₫</span>
                            </div>
                            <!-- End product price -->
                            
                            <!-- Variant -->
                            <ul class="swatches">
                                @foreach ($suggest->images as $image)
                                    <li class="swatch medium rounded"><img src="{{asset('uploads/product/' . $image->name )}}" alt="image" /></li>
                                @endforeach
                            </ul>
                            <!-- End Variant -->
                        </div>
                        <!-- End product details -->
                    </div>
                @endforeach
            </div>
        </div>
        <!--End Related Product Slider-->
    </div>
    <!--#ProductSection-product-template-->
</div>
<!--MainContent-->
<!--End Body Content-->
@endsection
@section('scripts')
<script src="{{ asset('custom/client/js/addNewRating.js') }}"></script>
@endsection