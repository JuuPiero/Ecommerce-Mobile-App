@extends('admin.layouts._masterLayout')

@section('content')

<div class="col-lg-12">
    <div class="block">
        @if(session('message'))
            <div class="alert alert-success">
                {{ session('message') }}
            </div>
        @endif
        <div class="title"><strong>Create new product</strong></div>
        <div class="block-body">
            <form class="form-horizontal" id="mainForm" method="POST" action="{{ route('admin.product.store') }}" enctype="multipart/form-data">
                @csrf
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Store Name</label>
                    <div class="col-sm-9">
                        <input name="name" type="text" class="form-control" required />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Store Owner</label>
                    <div class="col-sm-9">
                        <input name="owner" type="text" class="form-control" required />
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Logo</label>
                    <div class="col-sm-4">
                        <input name="image" type="file" class="form-control" required/>
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Address</label>
                    <div class="col-sm-9">
                        <textarea rows="6" name="description" type="text" class="form-control">
                        </textarea>
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">E-mail</label>
                    <div class="col-sm-9">
                        <input name="email" type="text" placeholder="Store Email" class="form-control">
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Phone Number</label>
                    <div class="col-sm-9">
                        <input name="phone_number" type="text" placeholder="Phone Number" class="form-control">
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Currency</label>
                    <div class="col-sm-9">
                        <input name="currency" type="text" placeholder="Currency" class="form-control">
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <div class="col-sm-9 ml-auto">
                        <button type="reset" class="btn btn-secondary">Cancel</button>
                        <button type="submit" class="btn btn-primary submit-btn">Save changes</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  </div>

@endsection

@section('scripts')

@endsection