<?php 
namespace App\Repositories\Category;

use App\Models\Category;
use App\Models\CategoryImage;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductImage;
use App\Repositories\IRepository;
use App\Repositories\Product\ProductRepository;

class CategoryRepository implements IRepository {
    private $productRepository;

    public function __construct(ProductRepository $productRepository) {
        $this->productRepository = $productRepository;
    }

    public function paginate(int $perPage = 10, bool $onlyActive = true) {
        if($onlyActive) {
            return Category::where('status', 1)
                    ->orderByDesc('updated_at')
                    ->paginate($perPage);
        }
        return Category::orderByDesc('updated_at')
        ->paginate($perPage);;
    }

    public function all() {

    }

    public function find($id) {
        return Category::with('children')->with('images')->with('products')->findOrFail($id);
    }

    public function create($request) {
        $data = $request->all();
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $data['image'] = $imagePath;
        }
        $category = Category::create($data);

        return response()->json([
            'message' => 'Blog created successfully!',
            'category' => $category,
            'success' => true
        ], 201);
    }

    public function update($id, $request) {
        $category = $this->find($id);
        // $category = Category::with('images')->with('children')->findOrFail($id);
        $data = $request->all();
        $data['is_active'] = empty($data['is_active']) ? false : true;

        if($request->hasFile('images')) {
            foreach ($category->images as $image) {
                $filePath = public_path(Category::IMAGE_UPLOAD_PATH . '/' . $image->name);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
                CategoryImage::destroy($image->id);
            }
            $images = $request->file('images');
            foreach ($images as $index => $image) {
                $fileName = $category->id . '_' . $index . '_' . time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path(Category::IMAGE_UPLOAD_PATH), $fileName);
                CategoryImage::create([
                    'category_id' => $category->id,
                    'name' => $fileName
                ]);
            }
        }
       
        $category->update($data);
    }

    public function delete($id) {
        // Tìm category cha và tất cả category con của nó
        $category = Category::with('children')->findOrFail($id);
        $category->products()->detach();
        
    }

    public function deleteCategoryWithChildren($categoryId) {
        // Tìm category cha và tất cả category con của nó
        $category = Category::with('children')->findOrFail($categoryId);

        // Xóa tất cả hình ảnh liên kết với category
        $images = CategoryImage::where('category_id', $categoryId)->get();
        foreach ($images as $image) {
            $filePath = public_path( Category::IMAGE_UPLOAD_PATH . '/' . $image->name);
            if (file_exists($filePath)) {
                unlink($filePath);
                $image->delete();
            }
        }
        // Xóa tệp hình ảnh từ thư mục được upload prouduct
        $productImages = ProductImage::whereIn('product_id', $category->products()->pluck('id'))->get();
        foreach ($productImages as $productImage) {
            $filePath = public_path( Product::IMAGE_UPLOAD_PATH . '/' . $productImage->name);
            if (file_exists($filePath)) {
                unlink($filePath);
                $productImage->delete();
            }
        }
        // Xóa tất cả thuộc tính của sản phẩm trong category
        ProductAttribute::whereIn('product_id', $category->products()->pluck('id'))->delete();
        // Xóa tất cả category con và sản phẩm của chúng
        foreach ($category->children as $childCategory) {
            $this->deleteCategoryWithChildren($childCategory->id);
        }
        Product::whereHas('categories', function ($query) use ($categoryId) {
            $query->where('id', $categoryId);
        })->delete();

        // Xóa liên kết sản phẩm từ các category con
        $category->products()->detach();
        // Xóa category cha
        $category->delete();
    }

    public function search($keyword) {
        return Category::
        where('is_active', true)
        ->where('name', 'LIKE', '%' . $keyword . '%')
        // ->orderByDesc('updated_at')
        ->paginate(15);
    }

    public function searchPrivate($keyword) {
        return Category::
        where('name', 'LIKE', '%' . $keyword . '%')
        ->orWhere('id', $keyword)
        // ->orderByDesc('updated_at')
        ->paginate(15);
    }

}