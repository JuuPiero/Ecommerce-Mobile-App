<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Repositories\Category\CategoryRepository;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $categoryRepository;
   
    public function __construct(CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    public function index() {
        $categories =  $this->categoryRepository->paginate(10, false);
        return response()->json($categories);
    }

    public function get($id) {
        $category =  $this->categoryRepository->find($id);
        return response()->json([
            'category' => $category,
        ]);
    }

    public function all() {
        $categories =  $this->categoryRepository->all();
        return response()->json([
            'categories' => $categories,
            'message' => 'Danh sách danh mục',
        ]);
    }

    public function create(Request $request) {
        $request->validate([
            'file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $category = $this->categoryRepository->create($request);
        return response()->json([
            'message' => 'Category created successfully!',
            'category' => $category,
            'success' => true
        ], 201);
        // return $this->categoryRepository->create($request);
    }

    public function delete($id) {
        $category =  Category::find($id);
        if( $category && $this->categoryRepository->delete($id)) {
            return response()->json([
               'message' => 'Item deleted successfully',
                'category' => $category,
               'success' => true
            ]);
        }
        return response()->json([
            'message' => 'Item deleted failed',
            'success' =>  false,
        ]);
    }


    public function update(int $id, Request $request) {
        $request->validate([
            'file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        // dd($request->all());

        $result = $this->categoryRepository->update($id, $request);
        return response()->json([
           'success' => $result,
           'message' => 'Item updated successfully',
           'category' => Category::find($id),
        ]);
    }
}
