<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryContoller extends Controller
{
    public function listCategories(Request $request)
    {
        $categories = Category::all();
        return $categories;
    }

    public function addCategory(Request $request)
    {
        /*
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        */
        
        // do smth

        return response()->json(['status' => 'habub']);
    }
}
