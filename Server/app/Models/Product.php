<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    const IMAGE_UPLOAD_PATH = 'uploads/product';

    protected $fillable = [
        'name',
        'category_id',
        'price',
        'quantity',
        'description',
        'status',
        'sku'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    // public function images()
    // {
    //     return $this->hasMany(ProductImage::class);
    // }
    // public function attributes() {
    //     return $this->hasMany(ProductAttribute::class);
    // }
    

    // public function orders()
    // {
    //     return $this->belongsToMany(Order::class);
    // }

    // public function ratings() {
    //     return $this->hasMany(Rating::class);
    // }

    // public function averageRating() {
    //     return $this->ratings()->avg('rating');
    // }

   
}
