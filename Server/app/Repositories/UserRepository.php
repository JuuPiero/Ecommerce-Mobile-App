<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository implements IRepository {

    public function all() {
        return User::all();
    }

    public function paginate($perPage = 10) {
        return User::paginate($perPage);
    }

    public function find($id) {
        return User::find($id);
    }

    public function create( $data) {
        return User::create([
            ...$data,
            'password' => Hash::make($data['password']),
        ]);
    }

    public function update($data, $id) {
        $user = User::findOrFail($id)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->update($data);
        return $user;
    }

    public function delete($id) {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return $user;
    }


}