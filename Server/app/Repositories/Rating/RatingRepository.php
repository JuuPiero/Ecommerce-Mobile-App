<?php 
namespace App\Repositories\Rating;

use App\Models\Rating;
use App\Repositories\IRepository;
class RatingRepository implements IRepository {
    public function all() {
        return Rating::all();
    }

    public function paginate(int $perPage) {
        return Rating::orderByDesc('created_at')->paginate($perPage);
    }

    public function find($id) {

    }

    public function create($data) {
        
    }

    public function update($id, $data) {
        
    }

    public function delete($id) {
        return Rating::destroy($id);
    }
}