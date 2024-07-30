<?php

use App\Http\Controllers\API\ShopController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoryContoller;
use App\Http\Controllers\API\FavoriteController;
use App\Http\Controllers\API\OrderController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware([])->controller(CategoryContoller::class)->prefix('categories')->group(function () {
    // Route::get('/', 'listCategories');
    Route::post('/add', 'addCategory');
});

Route::middleware(['auth:sanctum'])->controller(FavoriteController::class)->prefix('favorites')->group(function () {
    Route::post('/add', 'addToFavorites');
    Route::post('/remove', 'removeFromFavorites');
});


Route::middleware(['auth:sanctum'])->controller(OrderController::class)->prefix('orders')->group(function () {
    Route::post('/', 'order');
});

Route::get('/shop', [ShopController::class, 'list']);

Route::post('/orders/guest', [OrderController::class, 'orderGuest']);