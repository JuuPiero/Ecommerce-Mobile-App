@extends('admin.layouts._masterLayout')

@section('content')
<div class="container-fluid">
    <div class="row justify-content-center">
        <!-- Basic Form-->
        <div class="col-lg-6">
          <div class="block">
            <div class="title"><strong class="d-block">Add new Admin account</strong><span class="d-block">Lorem ipsum dolor sit amet consectetur.</span></div>
            <div class="block-body">
              <form action="{{route('admin.store')}}" method="POST">
                @csrf
                <div class="form-group">
                    <label class="form-control-label">First Name</label>
                    <input type="text" name="first_name" placeholder="First Name" class="form-control">
                </div>
                <div class="form-group">
                    <label class="form-control-label">Last Name</label>
                    <input type="text" name="last_name" placeholder="Last Name" class="form-control">
                </div>
                <div class="form-group">
                  <label class="form-control-label">Email</label>
                  <input type="email" name="email" placeholder="Email Address" class="form-control">
                </div>
                <div class="form-group">       
                  <label class="form-control-label">Password</label>
                  <input type="password" name="password" placeholder="Password" class="form-control">
                </div>
                <div class="form-group">       
                  <input type="submit" value="Submit" class="btn btn-primary">
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')

@endsection