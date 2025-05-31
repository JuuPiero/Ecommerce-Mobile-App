<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller {
    public function index() {
        $users = User::paginate(15);
        return response()->json([
            'users' => $users,
            // 'admins' =>$admins,
        ]);
    }

    public function detail($id) {
        $user = User::with('orders')->with('ratings')->find($id);
        return response()->json([
            'user' => $user
        ]);
    }

    public function deleteUser($id) {
        $use = User::destroy($id);
        return response()->json([
            'message' => 'xóa thành công user'
        ]);
    }
    public function update($id, Request $request) {
        $user = User::find($id);
        $data = $request->all();
        $data['password'] = Hash::make($data['new_password']);
        $user->update($data);
        return response()->json([
            'message' => "Updated successfully"
        ]);
    }


    public function createAdmin() {

        return view('admin.account.create');
    }

    public function storeAdmin(Request $request) {
        Admin::create([
            ...$request->all(),
            'password' => Hash::make($request->password)
        ]);
        return redirect()->route('admin.account')->with([
            'message' => 'tạo tài khoản admin thành công'
        ]);
    }
}