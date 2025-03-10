@extends('client.layouts._masterLayout')

@section('content')
<!--Page Title-->
<!--Page Title-->
<div class="page section-header text-center">
    <div class="page-title">
        <div class="wrapper"><h1 class="page-width">Create an Account</h1></div>
      </div>
</div>
<!--End Page Title-->

<div class="container">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
            <div class="mb-4">
                <form method="post" action="{{route('user.post.register')}}" id="CustomerLoginForm" accept-charset="UTF-8" class="contact-form">
                    @csrf	
                    <div class="row">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="FirstName">First Name</label>
                                <input type="text" name="first_name" placeholder="" id="FirstName" autofocus="">
                            </div>
                       </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="LastName">Last Name</label>
                                <input type="text" name="last_name" placeholder="" id="LastName">
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="">Phone Number</label>
                                <input type="text" name="phone_number" placeholder="" id="">
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="CustomerEmail">Email</label>
                                <input type="email" name="email" placeholder="" id="CustomerEmail" class="" autocorrect="off" autocapitalize="off" autofocus="">
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="CustomerPassword">Password</label>
                                <input type="password" value="" name="password" placeholder="" id="CustomerPassword" class="">                        	
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="">Address</label>
                                <textarea name="address" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                  </div>
                  <div class="row">
                    <div class="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                        <input type="submit" class="btn mb-3" value="Create">
                    </div>
                 </div>
             </form>
            </div>
           </div>
    </div>
</div>

@endsection