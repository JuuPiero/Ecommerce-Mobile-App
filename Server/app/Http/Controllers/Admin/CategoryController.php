<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CategoryImage;
use App\Repositories\Category\CategoryRepository;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $categoryRepository;
   
    public function __construct(CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    public function index() {
        $categories =  $this->categoryRepository->paginate(3, false);
        return view('admin.category.index', compact('categories'));
    }

    public function create() {
        $categories = Category::all();
        return view('admin.category.create')->with([
            'categories' => $categories,
            
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $this->categoryRepository->create($request);
        return redirect()->back()->with('message', 'tạo thành công');
    }

    public function delete($id) {
        $this->categoryRepository->deleteCategoryWithChildren($id);

        return response()->json(['message' => 'Item deleted successfully']);
        // return redirect()->back()->with('message', 'xóa thành công');
    }

    public function edit($id) {
        $category = $this->categoryRepository->find($id);
        
        $categories = Category::where('id', '!=', $id)->get();
        return view('admin.category.edit')->with([
            'category' => $category,
            'categories' => $categories,
        ]);
    }

    public function update($id, Request $request) {
        $request->validate([
            'file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $this->categoryRepository->update($id, $request);
        
        return redirect(route('admin.category'))->with([
            'message' => 'cập nhật thành công'
        ]);
    }
}
