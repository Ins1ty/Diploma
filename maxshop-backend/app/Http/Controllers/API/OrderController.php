<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Models\Shop;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->orders()->with('products')->get();
    }

    public function order(Request $request)
    {
        $validated = $request->validate([
            'shop_id' => 'required|numeric',
            'products' => 'required|array',
        ]);

        $info = [
            'user_id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'shop_id' => $validated['shop_id'],
        ];

        $order = $request->user()->makeOrder($info, $validated['products']);

        return response()->json($order, 201);
    }

    public function orderGuest(Request $request)
    {
        $validated = $request->validate([
            'shop_id' => 'required|numeric',
            'name' => 'required|string',
            'email' => 'required|email',
            'products' => 'required|array',
        ]);

        $info = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'shop_id' => $validated['shop_id'],
        ];
        
        $realProducts = Product::all();
        $newSlug = Str::random(8);
        $products = $validated['products'];
        $order = Order::create([
            'status' => 0,
            'name' => $info['name'],
            'email' => $info['email'],
            'shop_id' => $info['shop_id'],
            'slug' => $newSlug,
            'total' => collect($products)->map(function ($product) use ($realProducts) {
                $realProduct = $realProducts->find($product['id']);
                return $realProduct->price * $product['quantity'];
            })->sum(),
        ]);

        $shop = Shop::find($info['shop_id']);
        $order->shop_id = $shop->id;
        $order->save();

        foreach ($products as $product) {
            $realProduct = $realProducts->find($product['id']);
            $order->products()->attach($product['id'], [
                'quantity' => $product['quantity'],
                'price' => $realProduct->price,
            ]);
        }
        $order->shop = $shop;
        $result = $order;

        return response()->json($result, 201);
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);

        return $order->load('products');
    }

    public function updateStatus(Request $request, Order $order)
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $order->updateStatus($validated['status']);

        return response()->json($order);
    }
}
