@extends('admin.layouts._masterLayout')

@section('content')

<section class="no-padding-top no-padding-bottom">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 col-sm-6">
                <div class="statistic-block block">
                <div class="progress-details d-flex align-items-end justify-content-between">
                    <div class="title">
                        <div class="icon"><i class="icon-user-1"></i></div>
                        <strong>New Clients</strong>
                    </div>
                    <div class="number dashtext-1">{{ $userCount }}</div>
                </div>
                <div class="progress progress-template">
                    <div role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" class="progress-bar progress-bar-template dashbg-1"></div>
                </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="statistic-block block">
                <div class="progress-details d-flex align-items-end justify-content-between">
                    <div class="title">
                    <div class="icon"><i class="icon-contract"></i></div><strong>Categories</strong>
                    </div>
                    <div class="number dashtext-4">{{ count($categories) }}</div>
                </div>
                <div class="progress progress-template">
                    <div role="progressbar" style="width: {{ count($categories) }}%" aria-valuemin="0" aria-valuemax="100" class="progress-bar progress-bar-template dashbg-4"></div>
                </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="statistic-block block">
                <div class="progress-details d-flex align-items-end justify-content-between">
                    <div class="title">
                    <div class="icon"><i class="icon-writing-whiteboard"></i></div><strong>Products</strong>
                    </div>
                    <div class="number dashtext-2" >{{ count($products) }}</div>
                </div>
                <div class="progress progress-template">
                    <div role="progressbar" style="width: {{ count($products) }}%" aria-valuemin="0" aria-valuemax="100" class="progress-bar progress-bar-template dashbg-2"></div>
                </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="statistic-block block">
                <div class="progress-details d-flex align-items-end justify-content-between">
                    <div class="title">
                    <div class="icon"><i class="icon-paper-and-pencil"></i></div><strong>New Order</strong>
                    </div>
                    <div class="number dashtext-3">{{ $newOrderCount }}</div>
                </div>
                <div class="progress progress-template">
                    <div role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" class="progress-bar progress-bar-template dashbg-3"></div>
                </div>
                </div>
            </div>
         
        </div>
    </div>
</section>


@endsection