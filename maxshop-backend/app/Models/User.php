<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use Illuminate\Support\Str;
use App\Models\Shop;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function favorites()
    {
        return $this->belongsToMany(Product::class, 'favorites');
    }

    public function makeOrder($info, $products)
    {
        return DB::transaction(function () use ($info, $products) {
            $realProducts = Product::all();
            $newSlug = Str::random(8);
            $order = $this->orders()->create([
                'status' => 0,
                'name' => $info['name'],
                'email' => $info['email'],
                'shop_id' => $info['shop_id'],
                'slug' => $newSlug,
                'user_id' => $info['user_id'],
                'total' => collect($products)->map(function ($product) use ($realProducts) {
                    $realProduct = $realProducts->find($product['id']);
                    return $realProduct->price * $product['quantity'];
                })->sum(),
            ]);

            $shop = Shop::find($info['shop_id']);
            $order->shop_id = $shop->id;
            // $order->user_id = $this->id;
            $order->save();

            foreach ($products as $product) 
                $realProduct = $realProducts->find($product['id']);{
                $order->products()->attach($product['id'], [
                    'quantity' => $product['quantity'],
                    'price' => $realProduct['price'],
                ]);
            }
            $order->shop = $shop;
            $result = $order;

            return $result;
        });
    }



    public function markAsFavorite($productId)
    {
        $this->favorites()->attach($productId);
    }

    public function unmarkAsFavorite($productId)
    {
        $this->favorites()->detach($productId);
    }

    public function isFavorite($productId)
    {
        return $this->favorites()->where('product_id', $productId)->exists();
    }

    public function getFavorites()
    {
        return $this->favorites()->get();
    }
}
