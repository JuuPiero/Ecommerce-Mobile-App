<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Rating\RatingRepository;
use Illuminate\Http\Request;

class RatingController extends Controller {
    private $ratingRepository;

    public function __construct(RatingRepository $ratingRepository) {
        $this->ratingRepository = $ratingRepository;
    }

    public function index() {
        $ratings = $this->ratingRepository->paginate(10);
        return view('admin.rating.index')->with([
            'ratings' => $ratings
        ]);
    }

    public function delete($id) {
        try {
            $this->ratingRepository->delete($id);
            return response()->json([
                'message' => 'xóa thành công'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'không xóa được'
            ]);
        }
    }

}
