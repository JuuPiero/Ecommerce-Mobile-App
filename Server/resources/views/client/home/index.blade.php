@extends('client.layouts._masterLayout')

@section('content')
    @if(session('message'))
        <div class="newsletter-wrap" id="popup-container" style="display: block">
            <div id="popup-window">
                <a class="btn closepopup"><i class="icon icon anm anm-times-l"></i></a>
            <!-- Modal content-->
                <div class="display-table splash-bg">
                    <div class="display-table-cell width40"><img src="{{asset('assets/client/images/newsletter-img.jpg')}}" alt="Join Our Mailing List" title="Join Our Mailing List" /> </div>
                    <div class="display-table-cell width60 text-center">
                        <div class="newsletter-left">
                            <h1>{{session('message')}}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif

    {{-- new  --}}
    <!--Home slider-->
    <div class="slideshow slideshow-wrapper pb-section">
        <div class="home-slideshow">
            @foreach ($banners as $banner)
                <div class="slide">
                    <div class="blur-up lazyload">
                        <img class="blur-up lazyload" data-src="{{asset('uploads/category/' . $banner->name)}}" src="{{asset('uploads/category/' . $banner->name)}}" alt="Shop Our New Collection" title="Shop Our New Collection" />
                        <div class="slideshow__text-wrap slideshow__overlay classic middle">
                            <div class="slideshow__text-content middle">
                                <div class="container">
                                    <div class="wrap-caption right">
                                        {{-- <h2 class="h1 mega-title slideshow__title">Our New Collection</h2> --}}
                                        {{-- <span class="mega-subtitle slideshow__subtitle">Save up to 50% Off</span> --}}
                                        <span class="btn">Shop now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
           
        </div>
    </div>
    <!--End Home slider-->

    <!--Featured Product-->
    <div class="product-rows section pb-0">
        <div class="container-fluid">
            <div class="grid-products grid-products-hover-btn">
                <div class="row">
                   
                    @foreach ($products as $product)
                        <div class="col-6 col-sm-6 col-md-3 col-lg-3 item grid-view-item style2">
                            <div class="grid-view_image">
                                <!-- start product image -->
                                <a href="{{route('home.product.detail', $product->id)}}" class="grid-view-item__link">
                                    <!-- image -->
                                    <img class="grid-view-item__image primary blur-up lazyload" data-src="{{asset('uploads/product/' . $product->images[0]->name)}}" src="{{asset('uploads/product/' . $product->images[0]->name)}}" alt="image" title="product">
                                    <!-- End image -->
                                    <!-- Hover image -->
                                    <img class="grid-view-item__image hover blur-up lazyload" data-src="{{asset('uploads/product/' . $product->images[count($product->images) - 1]->name )}}" src="{{asset('uploads/product/' . $product->images[count($product->images) - 1]->name )}}" alt="image" title="product">
                                    <!-- End hover image -->
                                 
                                </a>
                                <!-- end product image -->
                                <!--start product details -->
                                <div class="product-details hoverDetails text-center mobile">
                                    <!-- product name -->
                                    <div class="product-name">
                                        <a href="{{route('home.product.detail', $product->id)}}">{{ $product->name }}</a>
                                    </div>
                                    <!-- End product name -->
                                    <!-- product price -->
                                    <div class="product-price">
                                        {{-- <span class="old-price">500.00₫</span>  --}}
                                        <span class="price">{{ $product->price }}₫</span>
                                    </div>
                                    <!-- End product price -->
                                    
                                    <!-- product button -->
                                    <div class="button-set">
                                        {{-- <a href="javascript:void(0)" title="Quick View" class="quick-view-popup quick-view" data-toggle="modal" data-target="#content_quickview">
                                            <i class="icon anm anm-search-plus-r"></i>
                                        </a> --}}
                                        <!-- Start product button -->
                                        <form class="variants add" action="#" method="post">
                                            <button data-id="{{ $product->id }}" class="btn cartIcon btn-addto-cart" type="button" tabindex="0"><i data-id="{{ $product->id }}" class="icon anm anm-bag-l"></i></button>
                                        </form>
                                        <div class="wishlist-btn">
                                            <a class="wishlist add-to-wishlist" href="wishlist.html">
                                                <i class="icon anm anm-heart-l"></i>
                                            </a>
                                        </div>
                                      
                                    </div>
                                    <!-- end product button -->
                                </div>
                                <!-- End product details -->
                            </div>
                        </div>
                    @endforeach
                    
                   
                </div>
            </div>
    </div>
    </div>	
    <!--End Featured Product-->

    <!--Collection Box slider-->
    {{-- <div class="collection-box collection-box-style1 section">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="section-header text-center">
                        <h2 class="h2">Most Trending Collection</h2>
                        <p>collection from world's top fashion designer</p>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                    <div class="collection-grid-item">
                        <a href="collection-page.html" class="collection-grid-item__link">
                            <img data-src="assets/images/collection/collection1.jpg" src="assets/images/collection/collection1.jpg" alt="Hot" class="blur-up lazyload"/>
                            <div class="collection-grid-item__title-wrapper">
                                <h3 class="collection-grid-item__title btn btn--secondary no-border">Hot</h3>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                    <div class="collection-grid-item">
                        <a href="collection-page.html" class="collection-grid-item__link">
                            <img data-src="assets/images/collection/collection2.jpg" src="assets/images/collection/collection2.jpg" alt="Denim" class="blur-up lazyload"/>
                            <div class="collection-grid-item__title-wrapper">
                                <h3 class="collection-grid-item__title btn btn--secondary no-border">Denim</h3>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                    <div class="collection-grid-item">
                        <a href="collection-page.html" class="collection-grid-item__link">
                            <img data-src="assets/images/collection/collection3.jpg" src="assets/images/collection/collection3.jpg" alt="Summer" class="blur-up lazyload"/>
                            <div class="collection-grid-item__title-wrapper">
                                <h3 class="collection-grid-item__title btn btn--secondary no-border">Summer</h3>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 col-sm-6 col-md-3 col-lg-3">
                    <div class="collection-grid-item">
                        <a href="collection-page.html" class="collection-grid-item__link">
                            <img data-src="{{asset('assets/client/images/collection/collection4.jpg')}}" src="{{asset('assets/client/images/collection/collection4.jpg')}}" alt="Classic" class="blur-up lazyload"/>
                            <div class="collection-grid-item__title-wrapper">
                                <h3 class="collection-grid-item__title btn btn--secondary no-border">Classic</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div> --}}
    <!--End Collection Box slider-->
    
@endsection
