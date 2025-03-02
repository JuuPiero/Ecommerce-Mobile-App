<!DOCTYPE html>
<html>
@include('admin.layouts._head')
<body>
    <!-- Header -->
    {{-- @include('admin.layouts._header') --}}
    @yield('body')
    
    <!-- JavaScript files-->
    @include('admin.layouts._scripts')    
</body>
</html>