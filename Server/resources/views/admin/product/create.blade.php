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
                    <label class="col-sm-3 form-control-label">Name</label>
                    <div class="col-sm-9">
                        <input name="name" type="text" class="form-control" required />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">SKU</label>
                    <div class="col-sm-9">
                        <input name="sku" type="text" class="form-control" required />
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Category</label>
                    <div class="col-sm-9">
                        <select multiple name="categoryIds[]" class="form-control mb-3 mb-3" required>
                            @foreach ($categories as $category)
                                @include('admin.product._categoryCreateForm', [
                                    'category' => $category, 
                                    'name' => $category->name,
                                ])
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Image</label>
                    <div class="col-sm-4">
                        <input name="images[]" type="file" class="form-control" multiple required/>
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Price</label>
                    <div class="col-sm-9">
                        <input name="price" type="number" placeholder="0 VNĐ" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Quantity</label>
                    <div class="col-sm-9">
                        <input name="quantity" type="number" placeholder="0 item" class="form-control">
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Description</label>
                    <div class="col-sm-9">
                        <textarea rows="6" name="description" type="text" class="form-control" id="description">
                        </textarea>
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group row">
                    <label class="col-sm-3 form-control-label">Active</label>
                    <div class="col-sm-9">
                        <div class="i-checks">
                            <input name="is_active" checked id="checkboxCustom1" type="checkbox" value="1" class="checkbox-template">
                            <label for="checkboxCustom1">Is Active</label>
                        </div>
                    </div>
                </div>
                <div class="title"><strong>Atributes</strong></div>
                <div class="form-group row ml-1 attribute">
                    <input type="text" placeholder="Name " class="mr-sm-3 form-control col-sm-5">
                    <input type="text" placeholder="Value" class=" mr-sm-3 form-control col-sm-5">
                </div>
                <button type="button" class="btn btn-primary add-new-attr-btn">Add new atribute</button>
                
                <input type="hidden" class="attributes-input" name="attributes" value="" />
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
<script src="{{ asset('custom/admin/js/addNewProductAttribute.js') }}"></script>
<script src="{{ asset('assets/admin/ckeditor/ckeditor.js') }}"></script>
<script>
    CKEDITOR.replace('description'); 
</script>

@endsection