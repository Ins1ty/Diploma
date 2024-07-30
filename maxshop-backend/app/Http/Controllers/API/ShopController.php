<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Shop;

class ShopController extends Controller
{
    public function list(Request $request)
    {
        $shops = Shop::all();
        $categories = Category::all();
        $user = null;
        $favorites = [];
        if ($request->user()) {
            $user = $request->user();
            $favorites = $user->favorites()->get()->pluck('id');
        }
        foreach ($categories as $category) {
            $category->products = $category->products()->get();
        }

        $orders = [];
        if ($user) {
            $orders = $user->orders()->get();
        }
        foreach ($orders as $order) {
            $order->products = $order->products()->get();
        }
        return [
            'categories' => $categories,
            'shops' => $shops,
            'favorites' => $favorites ?? [],
            'orders' => $orders ?? [],
        ];
    }
}
