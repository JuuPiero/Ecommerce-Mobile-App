<!DOCTYPE html>
<html>
<head> 
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Order Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f8f9fa;
            color: #343a40;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        p {
            margin: 0 0 10px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #dee2e6;
            padding: 8px;
            text-align: left;
            font-size: 0.8rem;
        }
        th {
            background-color: #f2f3f5;
        }
        .total-amount-title,
        .total-amount {
            /* float: right; */
            text-align: end;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">Order-{{ $order->id }}</div>
        {{-- <p><strong>User order : </strong>{{  $order->user->email . ' - ' . $order->user->first_name . ' ' . $order->user->last_name}}</p> --}}
        <p><strong>Customer : </strong>{{ $order->first_name . ' ' . $order->last_name }}</p>
        <p><strong>Phone Number : </strong>{{ $order->phone_number }}</p>
        <strong>Address :</strong>
        <p>{{ $order->address }}</p>
        <strong>Note:</strong>
        <p>{{ $order->note }}</p>
      
        <div class="title">Items</div>
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($orderItems as $item)
                    <tr>
                        <td>{{ $item->product_sku }}</td>
                        @if ($item->product != null)
                            <td>{{ $item->product_name }} 
                                @foreach ($item->product->attributes as $attribute)
                                    {{ $attribute->value }}
                                @endforeach
                            </td>
                        @else
                            <td>{{ $item->product_name }}</td>
                        @endif
                        <td>{{ $item->quantity }}</td>
                        <td>{{ $item->product_price }}VND</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <h3 class="total-amount-title">Total Amount:</h3>
        <p class="total-amount"><strong>{{ $order->total_amount }}</strong>VND</p>
    </div>
</body>
</html>
{{-- <script>
    print()
</script> --}}