<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function addToFavorites(Request $request)
    {
        $request->validate([
            'id' => 'required | integer'
        ]);
        $product = Product::find($request->id);
        $user = $request->user();
        $isFavorite = $user->isFavorite($product->id);
        if ($isFavorite) {
            return response()->json(null, 409);
        } else {
            $user->markAsFavorite($product);
            return $user->getFavorites()->pluck('id');
        }
    }

    public function removeFromFavorites(Request $request)
    {
        $request->validate([
            'id' => 'required | integer'
        ]);
        $product = Product::find($request->id);
        $user = $request->user();
        $isFavorite = $user->isFavorite($product->id);
        if ($isFavorite) {
            $user->unmarkAsFavorite($product);
            return $user->getFavorites()->pluck('id');
        } else {
            return response()->json(null, 404);
        }
    }

    public function index(Request $request)
    {
        return $request->user()->favorites()->get();
    }

    public function store(Request $request, Product $product)
    {
        $request->user()->markAsFavorite($product->id);

        return response()->json(null, 201);
    }

    public function destroy(Request $request, Product $product)
    {
        $request->user()->unmarkAsFavorite($product->id);

        return response()->json(null, 204);
    }
}
