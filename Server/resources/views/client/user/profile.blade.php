@extends('client.layouts._masterLayout')

@section('content')
<!--Page Title-->
<div class="page section-header text-center">
    <div class="page-title">
      <div class="wrapper"><h1 class="page-width">Profile</h1></div>
    </div>
</div>
    <!--End Page Title-->
@if(session('message'))
    <div class="alert alert-danger">
        {{ session('message') }}
    </div>
@endif   
<div class="container">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
            <div class="mb-4">
                <form method="post" action="{{route('user.profile.update')}}" id="CustomerLoginForm" accept-charset="UTF-8" class="contact-form">	
                    @csrf
                    <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label for="CustomerEmail">Email</label>
                            <input type="email" name="email" readonly autocorrect="off" autocapitalize="off" value="{{$user->email}}">
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 row m-0 justify-content-between">
                        <div class="form-group">
                            <label for="inlineFormInput" class="sr-only">First Name</label>
                            <input  value="{{$user->first_name}}" name="first_name" id="inlineFormInput" type="text" placeholder="First Name" class="mr-sm-5">
                          </div>
                        <div class="form-group">
                            <label for="inlineFormInputGroup" class="sr-only">Last Name</label>
                            <input value="{{$user->last_name}}" name="last_name" id="inlineFormInputGroup" type="text" placeholder="Last Name" class="mr-sm-5">
                        </div>
                    </div>
                    

                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="form-group">
                            <label for="CustomerEmail">Phone Number</label>
                            <input type="text" name="phone_number" placeholder="" id="CustomerEmail" class="" autocorrect="off" autocapitalize="off" value="{{$user->phone_number}}">
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
                            <label for="CustomerPassword"New >New Password</label>
                            <input type="password" value="" name="new_password" placeholder="" id="CustomerPassword" class="">                        	
                        </div>
                    </div>
                    </div>
                    <div class="row">
                        <div class="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                            <input type="submit" class="btn mb-3" value="Update Profile">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection