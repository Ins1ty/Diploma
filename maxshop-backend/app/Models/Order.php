<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'total', 'status', 'email', 'name', 'slug'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_product')->withPivot('quantity', 'price');
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function updateStatus($status)
    {
        $this->status = $status;
        $this->save();
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
