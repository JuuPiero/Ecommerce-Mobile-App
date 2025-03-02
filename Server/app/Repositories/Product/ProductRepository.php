<?php 
namespace App\Repositories\Product;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductImage;
use App\Repositories\IRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductRepository implements IRepository {
    
    public function all() {
        
    }
    public function paginate(int $perPage = 10, bool $onlyActive = true) {
        if($onlyActive) {
            return  Product::
                    where('is_active', 1)
                    ->where('quantity', '>', 0)
                    ->orderByDesc('updated_at')
                    ->paginate($perPage);
        }
        
        return Product::with('images')
        ->with('categories')
        ->with('attributes')
        ->orderByDesc('updated_at')
        ->paginate($perPage);;
    }

    public function find($id) {
        return Product::findOrFail($id);
    }

    public function create($request) {
        $data = $request->all();
        $data['is_active'] = empty($data['is_active']) ? false : true;
        $product = Product::create($data);
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            foreach ($images as $index => $image) {
                $fileName = $product->id . '_' . $index . '_' . time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path(Product::IMAGE_UPLOAD_PATH), $fileName);
                ProductImage::create([
                    'product_id' => $product->id,
                    'name' => $fileName
                ]);
            }
        }
        foreach ($data['categoryIds'] as $categoryId) {
            $category = Category::find($categoryId);
            if ($category) {
                $product->categories()->attach($category);
            }
        }

        if($data['attributes'] != null) {
            foreach (json_decode($data['attributes']) as $nameAttribute => $value) {
                $product->attributes()->create([
                    'product_id' => $product->id,
                    'name' => $nameAttribute,
                    'value' => $value
                ]);
            }
        }

    }

    public function update($id, $request) {
        $product = Product::findOrFail($id);
        $data = $request->all();
        $data['is_active'] = !empty($data['is_active']);

        // Handle images
        if($request->hasFile('images')) {
            foreach ($product->images as $image) {
                $filePath = public_path(Product::IMAGE_UPLOAD_PATH . '/' . $image->name);
                if (file_exists($filePath)) unlink($filePath);
                ProductImage::destroy($image->id);
            }

            $images = $request->file('images');
            foreach ($images as $index => $image) {
                $fileName = $product->id . '_' . $index . '_' . time() . '.' .  $image->getClientOriginalExtension();
                $image->move(public_path(Product::IMAGE_UPLOAD_PATH), $fileName);
                ProductImage::create([
                    'product_id' => $product->id,
                    'name' => $fileName
                ]);
            }
        }

        // Handle categories
        {
            $existingCategoryIds = $product->categories->pluck('id')->toArray();
            $newCategoryIds = $data['categoryIds'];

            $categoriesToAttach = array_diff($newCategoryIds, $existingCategoryIds);
            $categoriesToDetach = array_diff($existingCategoryIds, $newCategoryIds);

            if ($categoriesToAttach) {
                foreach ($categoriesToAttach as $categoryId) {
                    $category = Category::find($categoryId);
                    $product->categories()->attach($category);
                }
            }
        
            if ($categoriesToDetach) {
                $product->categories()->detach($categoriesToDetach);
            }

        }

        // Handle attributes
        {
            $existingAttributes = $product->attributes()->pluck('value', 'name')->toArray();
            $newAttributes = json_decode($data['attributes'], true);

            // Update or create new attributes
            foreach ($newAttributes as $name => $value) {
                $attribute = $product->attributes()->firstOrNew(['name' => $name]);
                $attribute->value = $value;
                $attribute->save();
            }

            // Delete removed attributes
            foreach ($existingAttributes as $name => $value) {
                if (!array_key_exists($name, $newAttributes)) {
                    ProductAttribute::where(['product_id' => $id, 'name' => $name])->delete();
                }
            }
        }

        $product->update($data);
    }

    public function delete($id) {
        $product = Product::find($id);

        // Xóa tất cả hình ảnh liên kết với các sản phẩm 
        $images = ProductImage::where('product_id', $id)->get();
        foreach ($images as $image) {
            $filePath = public_path(Product::IMAGE_UPLOAD_PATH . '/' . $image->name);
            if (file_exists($filePath)) {
                unlink($filePath);
                // $image->delete();
            }
        }
        // Xóa sản phẩm
        $product->delete();
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
