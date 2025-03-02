@extends('admin.layouts._layout')

@section('body')
    @include('admin.layouts._header')


    <div class="d-flex align-items-stretch">
        <!-- Sidebar Navigation-->
        @include('admin.layouts._sidebar')
        <!-- Sidebar Navigation end-->

        <div class="page-content">
            <div class="page-header">
                <div class="container-fluid">
                    <h2 class="h5 no-margin-bottom">Dashboard</h2>
                </div>
            </div>

            @yield('content')

            

            @include('admin.layouts._footer')
           
        </div>

    </div>



@endsection



