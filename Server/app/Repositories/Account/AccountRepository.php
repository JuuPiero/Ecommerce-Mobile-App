<?php 
namespace App\Repositories\Account;

use App\Models\User;
use App\Repositories\IRepository;

class AccountRepository implements IRepository {

    public function users(int $perPage) {
        return User::orderByDesc('created_at')->paginate($perPage);
    }

    public function all() {

    }
    public function find($id) {

    }

    public function create($data) {
        
    }

    public function update($id, $data) {
        
    }

    public function delete($id) {
    
    }
}