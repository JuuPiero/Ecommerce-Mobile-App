<!--Search Form Drawer-->
<div class="search">
    <div class="search__form">
        <form class="search-bar__form" action="{{route('home.search')}}" method="GET">
            <button class="go-btn search__button" type="submit"><i class="icon anm anm-search-l"></i></button>
            <input class="search__input" type="search" placeholder="Search entire store..." aria-label="Search" autocomplete="off" name="keywords" />
        </form>
        <button type="submit" class="search-trigger close-btn"><i class="anm anm-times-l"></i></button>
    </div>
</div>
<!--End Search Form Drawer-->
<!--Top Header-->
<div class="top-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-10 col-sm-8 col-md-5 col-lg-4">
                <p class="phone-no"><i class="anm anm-phone-s"></i> +440 0(111) 044 833</p>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 d-none d-lg-none d-md-block d-lg-block">
                <div class="text-center"><p class="top-header_middle-text"> Worldwide Express Shipping</p></div>
            </div>
            <div class="col-2 col-sm-4 col-md-3 col-lg-4 text-right">
                <span class="user-menu d-block d-lg-none"><i class="anm anm-user-al" aria-hidden="true"></i></span>
                <ul class="customer-links list-inline">
                     <li><a href="wishlist.html">Wishlist</a></li>

                    @auth
                      <li class="account-actions" style="position: relative">
                        <a href="#"> {{ Auth::user()->first_name . ' ' . Auth::user()->last_name }}</a>
                        <ul>
                          <li><a href="{{route('user.profile')}}">Profile</a></li>
                          <li><a href="{{route('user.purchase')}}">Đơn hàng</a></li>
                        </ul>
                      </li>
                      <li><a href="{{ route('user.logout') }}">Logout</a></li>

                    @endauth
                    @guest
                      <li><a href="{{ route('user.login') }}">Login</a></li>
                      <li><a href="{{ route('user.register') }}">Signup</a></li>
                    @endguest
                </ul>
            </div>
        </div>
    </div>
</div>
<!--End Top Header-->
<!--Header-->
<div class="header-wrap animated d-flex">
    <div class="container-fluid">        
        <div class="row align-items-center">
            <!--Desktop Logo-->
            <div class="logo col-md-2 col-lg-2 d-none d-lg-block">
                <a href="{{route('home')}}">
                    <img src="{{asset('assets/client/images/logo.svg')}}" alt="Belle Multipurpose Html Template" title="Belle Multipurpose Html Template" />
                </a>
            </div>
            <!--End Desktop Logo-->
            <div class="col-2 col-sm-3 col-md-3 col-lg-8">
                <div class="d-block d-lg-none">
                    <button type="button" class="btn--link site-header__menu js-mobile-nav-toggle mobile-nav--open">
                        <i class="icon anm anm-times-l"></i>
                        <i class="anm anm-bars-r"></i>
                    </button>
                </div>
                <!--Desktop Menu-->
                <x:client.navigation></x:client.navigation>
                <!--End Desktop Menu-->
            </div>
            <!--Mobile Logo-->
            <div class="col-6 col-sm-6 col-md-6 col-lg-2 d-block d-lg-none mobile-logo">
                <div class="logo">
                    <a href="{{route('home')}}">
                        <img src="{{asset('assets/client/images/logo.svg')}}" alt="Belle Multipurpose Html Template" title="Belle Multipurpose Html Template" />
                    </a>
                </div>
            </div>
            <!--Mobile Logo-->
            <div class="col-4 col-sm-3 col-md-3 col-lg-2">
                <div class="site-cart">
                    <a href="{{ route('cart') }}" class="site-header__cart" >
                        <i class="icon anm anm-bag-l"></i>
                        <span id="CartCount" class="site-header__cart-count" data-cart-render="item_count">{{array_sum(session('cart', []))}}</span>
                    </a>
                    <!--Minicart Popup-->
                    {{-- <div id="header-cart" class="block block-cart">
                        <ul class="mini-products-list">
                            <li class="item">
                                <a class="product-image" href="#">
                                    <img src="assets/images/product-images/cape-dress-1.jpg" alt="3/4 Sleeve Kimono Dress" title="" />
                                </a>
                                <div class="product-details">
                                    <a href="#" class="remove"><i class="anm anm-times-l" aria-hidden="true"></i></a>
                                    <a href="#" class="edit-i remove"><i class="anm anm-edit" aria-hidden="true"></i></a>
                                    <a class="pName" href="cart.html">Sleeve Kimono Dress</a>
                                    <div class="variant-cart">Black / XL</div>
                                    <div class="wrapQtyBtn">
                                        <div class="qtyField">
                                            <span class="label">Qty:</span>
                                            <a class="qtyBtn minus" href="javascript:void(0);"><i class="fa anm anm-minus-r" aria-hidden="true"></i></a>
                                            <input type="text" id="Quantity" name="quantity" value="1" class="product-form__input qty">
                                            <a class="qtyBtn plus" href="javascript:void(0);"><i class="fa anm anm-plus-r" aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                    <div class="priceRow">
                                        <div class="product-price">
                                            <span class="money">$59.00</span>
                                        </div>
                                     </div>
                                </div>
                            </li>
                            <li class="item">
                                <a class="product-image" href="#">
                                    <img src="assets/images/product-images/cape-dress-2.jpg" alt="Elastic Waist Dress - Black / Small" title="" />
                                </a>
                                <div class="product-details">
                                    <a href="#" class="remove"><i class="anm anm-times-l" aria-hidden="true"></i></a>
                                    <a href="#" class="edit-i remove"><i class="anm anm-edit" aria-hidden="true"></i></a>
                                    <a class="pName" href="cart.html">Elastic Waist Dress</a>
                                    <div class="variant-cart">Gray / XXL</div>
                                    <div class="wrapQtyBtn">
                                        <div class="qtyField">
                                            <span class="label">Qty:</span>
                                            <a class="qtyBtn minus" href="javascript:void(0);"><i class="fa anm anm-minus-r" aria-hidden="true"></i></a>
                                            <input type="text" id="Quantity" name="quantity" value="1" class="product-form__input qty">
                                            <a class="qtyBtn plus" href="javascript:void(0);"><i class="fa anm anm-plus-r" aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                       <div class="priceRow">
                                        <div class="product-price">
                                            <span class="money">$99.00</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="total">
                            <div class="total-in">
                                <span class="label">Cart Subtotal:</span><span class="product-price"><span class="money">$748.00</span></span>
                            </div>
                             <div class="buttonSet text-center">
                                <a href="cart.html" class="btn btn-secondary btn--small">View Cart</a>
                                <a href="checkout.html" class="btn btn-secondary btn--small">Checkout</a>
                            </div>
                        </div>
                    </div> --}}
                    <!--EndMinicart Popup-->
                </div>
                <div class="site-header__search">
                    <button type="button" class="search-trigger"><i class="icon anm anm-search-l"></i></button>
                </div>
            </div>
        </div>
    </div>
</div>
<!--End Header-->
<!--Mobile Menu-->
{{-- <div class="mobile-nav-wrapper" role="navigation">
    <div class="closemobileMenu"><i class="icon anm anm-times-l pull-right"></i> Close Menu</div>
    <ul id="MobileNav" class="mobile-nav">
        <li class="lvl1 parent megamenu"><a href="index.html">Home <i class="anm anm-plus-l"></i></a>
      <ul>
        <li><a href="#" class="site-nav">Home Group 1<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="index.html" class="site-nav">Home 1 - Classic</a></li>
            <li><a href="home2-default.html" class="site-nav">Home 2 - Default</a></li>
            <li><a href="home15-funiture.html" class="site-nav">Home 15 - Furniture </a></li>
            <li><a href="home3-boxed.html" class="site-nav">Home 3 - Boxed</a></li>
            <li><a href="home4-fullwidth.html" class="site-nav">Home 4 - Fullwidth</a></li>
            <li><a href="home5-cosmetic.html" class="site-nav">Home 5 - Cosmetic</a></li>
            <li><a href="home6-modern.html" class="site-nav">Home 6 - Modern</a></li>
            <li><a href="home7-shoes.html" class="site-nav last">Home 7 - Shoes</a></li>
          </ul>
        </li>
        <li><a href="#" class="site-nav">Home Group 2<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="home8-jewellery.html" class="site-nav">Home 8 - Jewellery</a></li>
            <li><a href="home9-parallax.html" class="site-nav">Home 9 - Parallax</a></li>
            <li><a href="home10-minimal.html" class="site-nav">Home 10 - Minimal</a></li>
            <li><a href="home11-grid.html" class="site-nav">Home 11 - Grid</a></li>
            <li><a href="home12-category.html" class="site-nav">Home 12 - Category</a></li>
            <li><a href="home13-auto-parts.html" class="site-nav">Home 13 - Auto Parts</a></li>
            <li><a href="home14-bags.html" class="site-nav last">Home 14 - Bags</a></li>
          </ul>
        </li>
        <li><a href="#" class="site-nav">New Sections<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="home11-grid.html" class="site-nav">Image Gallery</a></li>
            <li><a href="home5-cosmetic.html" class="site-nav">Featured Product</a></li>
            <li><a href="home7-shoes.html" class="site-nav">Columns with Items</a></li>
            <li><a href="home6-modern.html" class="site-nav">Text columns with images</a></li>
            <li><a href="home2-default.html" class="site-nav">Products Carousel</a></li>
            <li><a href="home9-parallax.html" class="site-nav last">Parallax Banner</a></li>
          </ul>
        </li>
        <li><a href="#" class="site-nav">New Features<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="home13-auto-parts.html" class="site-nav">Top Information Bar </a></li>
            <li><a href="#" class="site-nav">Age Varification </a></li>
            <li><a href="#" class="site-nav">Footer Blocks</a></li>
            <li><a href="#" class="site-nav">2 New Megamenu style</a></li>
            <li><a href="#" class="site-nav">Show Total Savings </a></li>
            <li><a href="#" class="site-nav">New Custom Icons</a></li>
            <li><a href="#" class="site-nav last">Auto Currency</a></li>
          </ul>
        </li>
      </ul>
    </li>
        <li class="lvl1 parent megamenu"><a href="#">Shop <i class="anm anm-plus-l"></i></a>
      <ul>
        <li><a href="#" class="site-nav">Shop Pages<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="shop-left-sidebar.html" class="site-nav">Left Sidebar</a></li>
            <li><a href="shop-right-sidebar.html" class="site-nav">Right Sidebar</a></li>
            <li><a href="shop-fullwidth.html" class="site-nav">Fullwidth</a></li>
            <li><a href="shop-grid-3.html" class="site-nav">3 items per row</a></li>
            <li><a href="shop-grid-4.html" class="site-nav">4 items per row</a></li>
            <li><a href="shop-grid-5.html" class="site-nav">5 items per row</a></li>
            <li><a href="shop-grid-6.html" class="site-nav">6 items per row</a></li>
            <li><a href="shop-grid-7.html" class="site-nav">7 items per row</a></li>
            <li><a href="shop-listview.html" class="site-nav last">Product Listview</a></li>
          </ul>
        </li>
        <li><a href="#" class="site-nav">Shop Features<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="shop-left-sidebar.html" class="site-nav">Product Countdown </a></li>
            <li><a href="shop-right-sidebar.html" class="site-nav">Infinite Scrolling</a></li>
            <li><a href="shop-grid-3.html" class="site-nav">Pagination - Classic</a></li>
            <li><a href="shop-grid-6.html" class="site-nav">Pagination - Load More</a></li>
            <li><a href="product-labels.html" class="site-nav">Dynamic Product Labels</a></li>
            <li><a href="product-swatches-style.html" class="site-nav">Product Swatches </a></li>
            <li><a href="product-hover-info.html" class="site-nav">Product Hover Info</a></li>
            <li><a href="shop-grid-3.html" class="site-nav">Product Reviews</a></li>
            <li><a href="shop-left-sidebar.html" class="site-nav last">Discount Label </a></li>
          </ul>
        </li>
      </ul>
    </li>
        <li class="lvl1 parent megamenu"><a href="product-layout-1.html">Product <i class="anm anm-plus-l"></i></a>
      <ul>
        <li><a href="product-layout-1.html" class="site-nav">Product Page<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="product-layout-1.html" class="site-nav">Product Layout 1</a></li>
            <li><a href="product-layout-2.html" class="site-nav">Product Layout 2</a></li>
            <li><a href="product-layout-3.html" class="site-nav">Product Layout 3</a></li>
            <li><a href="product-with-left-thumbs.html" class="site-nav">Product With Left Thumbs</a></li>
            <li><a href="product-with-right-thumbs.html" class="site-nav">Product With Right Thumbs</a></li>
            <li><a href="product-with-bottom-thumbs.html" class="site-nav last">Product With Bottom Thumbs</a></li>
          </ul>
        </li>
        <li><a href="short-description.html" class="site-nav">Product Features<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="short-description.html" class="site-nav">Short Description</a></li>
            <li><a href="product-countdown.html" class="site-nav">Product Countdown</a></li>
            <li><a href="product-video.html" class="site-nav">Product Video</a></li>
            <li><a href="product-quantity-message.html" class="site-nav">Product Quantity Message</a></li>
            <li><a href="product-visitor-sold-count.html" class="site-nav">Product Visitor/Sold Count </a></li>
            <li><a href="product-zoom-lightbox.html" class="site-nav last">Product Zoom/Lightbox </a></li>
          </ul>
        </li>
        <li><a href="#" class="site-nav">Product Features<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="product-with-variant-image.html" class="site-nav">Product with Variant Image</a></li>
            <li><a href="product-with-color-swatch.html" class="site-nav">Product with Color Swatch</a></li>
            <li><a href="product-with-image-swatch.html" class="site-nav">Product with Image Swatch</a></li>
            <li><a href="product-with-dropdown.html" class="site-nav">Product with Dropdown</a></li>
            <li><a href="product-with-rounded-square.html" class="site-nav">Product with Rounded Square</a></li>
            <li><a href="swatches-style.html" class="site-nav last">Product Swatches All Style</a></li>
          </ul>
        </li>
        <li><a href="#" class="site-nav">Product Features<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="product-accordion.html" class="site-nav">Product Accordion</a></li>
            <li><a href="product-pre-orders.html" class="site-nav">Product Pre-orders </a></li>
            <li><a href="product-labels-detail.html" class="site-nav">Product Labels</a></li>
            <li><a href="product-discount.html" class="site-nav">Product Discount In %</a></li>
            <li><a href="product-shipping-message.html" class="site-nav">Product Shipping Message</a></li>
            <li><a href="product-shipping-message.html" class="site-nav last">Size Guide </a></li>
          </ul>
        </li>
      </ul>
    </li>
        <li class="lvl1 parent megamenu"><a href="about-us.html">Pages <i class="anm anm-plus-l"></i></a>
      <ul>
          <li><a href="cart-variant1.html" class="site-nav">Cart Page <i class="anm anm-plus-l"></i></a>
            <ul class="dropdown">
                <li><a href="cart-variant1.html" class="site-nav">Cart Variant1</a></li>
                <li><a href="cart-variant2.html" class="site-nav">Cart Variant2</a></li>
             </ul>
        </li>
        <li><a href="compare-variant1.html" class="site-nav">Compare Product <i class="anm anm-plus-l"></i></a>
            <ul class="dropdown">
                <li><a href="compare-variant1.html" class="site-nav">Compare Variant1</a></li>
                <li><a href="compare-variant2.html" class="site-nav">Compare Variant2</a></li>
             </ul>
        </li>
        <li><a href="checkout.html" class="site-nav">Checkout</a></li>
        <li><a href="checkout.html" class="site-nav">Checkout</a></li>
        <li><a href="about-us.html" class="site-nav">About Us<span class="lbl nm_label1">New</span></a></li>
        <li><a href="contact-us.html" class="site-nav">Contact Us</a></li>
        <li><a href="faqs.html" class="site-nav">FAQs</a></li>
        <li><a href="lookbook1.html" class="site-nav">Lookbook<i class="anm anm-plus-l"></i></a>
          <ul>
            <li><a href="lookbook1.html" class="site-nav">Style 1</a></li>
            <li><a href="lookbook2.html" class="site-nav last">Style 2</a></li>
          </ul>
        </li>
        <li><a href="404.html" class="site-nav">404</a></li>
        <li><a href="coming-soon.html" class="site-nav">Coming soon<span class="lbl nm_label1">New</span></a></li>
      </ul>
    </li>
        <li class="lvl1 parent megamenu"><a href="blog-left-sidebar.html">Blog <i class="anm anm-plus-l"></i></a>
      <ul>
        <li><a href="blog-left-sidebar.html" class="site-nav">Left Sidebar</a></li>
        <li><a href="blog-right-sidebar.html" class="site-nav">Right Sidebar</a></li>
        <li><a href="blog-fullwidth.html" class="site-nav">Fullwidth</a></li>
        <li><a href="blog-grid-view.html" class="site-nav">Gridview</a></li>
        <li><a href="blog-article.html" class="site-nav">Article</a></li>
      </ul>
    </li>
        <li class="lvl1"><a href="#"><b>Buy Now!</b></a>
    </li>
  </ul>
</div> --}}
<!--End Mobile Menu-->