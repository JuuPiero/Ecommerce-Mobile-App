<?php 
namespace App\Repositories\Product;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductImage;
use App\Repositories\IRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;

class ProductRepository implements IRepository {
    
    public function all() {
        
    }
    public function paginate(int $perPage = 10, bool $onlyActive = true) {
        if($onlyActive) {
            return  Product::
                    with('images')->
                    where('status', 1)
                    ->where('quantity', '>', 0)
                    ->orderByDesc('updated_at')
                    ->paginate($perPage);
        }
        
        return Product::with('images')
        ->with('attributes')
        ->orderByDesc('updated_at')
        ->paginate($perPage);;
    }

    public function find($id) {
        return Product::with('images')->with('attributes')->findOrFail($id);
    }

    public function create($request) {
        $data = $request->all();
        $data['status'] = $data['status'] == 'true' ? 1 : 0;
        $product = Product::create($data);
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('images', 'public');
             
                ProductImage::create([
                    'product_id' => $product->id,
                    'name' => $imagePath
                ]);
            }
        }

        if(isset($data['attributes'])) {
            foreach (json_decode($data['attributes']) as $attribute) {
                ProductAttribute::create([
                    'product_id' => $product->id,
                    'name' => $attribute->name,
                    'value' => $attribute->value
                ]);
            }
        }
        return $this->find($product->id);
    }

    public function update($id, $request) {
        $product = Product::findOrFail($id);
        $data = $request->all();

        $data['status'] = $data['status'] == 'true' ? 1 : 0;
        if($request->hasFile('images')) {
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image);
                ProductImage::destroy($image->id);
            }
            $images = $request->file('images');
            foreach ($images as $index => $image) {
                $imagePath = $image->store('images', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'name' => $imagePath
                ]);
            }
        }

        // Handle attributes
        if(is_string($data['attributes'])) {
            $existingAttributes = $product->attributes()->pluck('value', 'name')->toArray();
            $newAttributes = json_decode($data['attributes'], true);
            // Update or create new attributes
            foreach ($newAttributes as $attr) {
                $attribute = $product->attributes()->firstOrNew(['name' => $attr['name']]);
                $attribute->value = $attr['value'];
                $attribute->save();
            }
            $newAttributeNames = array_map(fn($attr) => $attr['name'], $newAttributes);
            // Delete removed attributes
            foreach ($existingAttributes as $name => $value) {
                if (!in_array($name, $newAttributeNames)) {
                    ProductAttribute::where([
                        'product_id' => $product->id,
                        'name' => $name
                    ])->delete();
                }
            }
        }
        $product->update($data);
        return $this->find($product->id);
    }

    public function delete($id) {
        $product = $this->find($id);
           
        // Xóa tất cả hình ảnh liên kết với các sản phẩm 
        $images = ProductImage::where('product_id', $id)->get();
        foreach ($images as $image) {
            Storage::disk('public')->delete($image->name);
        }
        // Xóa sản phẩm
        Product::destroy($id);
        // $product->delete();
        return $product;
    }

    public function search($keywords) {
        $keywords = explode(' ', $keywords);
        $products = Product::where('is_active', 1);
        foreach ($keywords as $keyword) {
            $products->where('name', 'like', '%' . $keyword . '%');
        }
        $products = $products->orderByDesc('updated_at')
        ->paginate(15);

        return $products;
        // return Product::where('is_active', true)
        // ->where('name', 'LIKE', '%' . $keyword . '%')
        // ->where('is_active', true)
        // ->orderByDesc('updated_at')
        // ->paginate(15);
    }

    public function searchPrivate($keyword) {
        return Product::
        where('name', 'LIKE', '%' . $keyword . '%')
        ->orWhere('id', $keyword)
        ->orderByDesc('updated_at')
        ->paginate(15);
    }

    public function getsuggestProducts($productId) {
        // Lấy ra sản phẩm hiện tại
        $currentProduct = Product::find($productId);

        // if (!$currentProduct) {
        //     // Xử lý trường hợp không tìm thấy sản phẩm
        //     return [];
        // }
        // Lấy ra các danh mục của sản phẩm hiện tại
        $categories = $currentProduct->categories;
        // Lấy ra các sản phẩm thuộc các danh mục của sản phẩm hiện tại
        $suggestedProducts = Product::whereHas('categories', function ($query) use ($categories) {
                                        $query->whereIn('id', $categories->pluck('id'));
                                    })->where('id', '!=', $productId) // Loại trừ sản phẩm hiện tại
                                    ->paginate(10);
        return $suggestedProducts;
    }

    public function getProductsByCategory($categoryId, int $perPage = 10) {
        return Product::whereHas('categories', function ($query) use ($categoryId) {
            $query->where('category_id', $categoryId);
        })
        ->where('is_active', true)
        ->paginate($perPage);
        // $products = Product::whereHas('categories', function ($query) use ($categoryID) {
        //     $query->where('category_id', $categoryID);
        // })->get();
    }

    public function filter($data) {
        return Product::whereHas('categories', function ($query) use ($data) {
            $query->where('category_id', $data['category_id']);
        })
        ->where('is_active', true)
        ->whereBetween('price', explode(" ", $data['price']))
        // ->where('price', '>=', $data['priceFrom'])
        ->paginate(10);
    }
}
