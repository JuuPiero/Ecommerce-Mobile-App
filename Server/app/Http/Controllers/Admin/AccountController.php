<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller {
    public function accounts() {
        $admins = Admin::paginate(5);
        $users = User::paginate(15);
        return view('admin.account.index')->with([
            'users' =>$users,
            'admins' =>$admins,
        ]);
    }

    public function userDetail($id) {
        $user = User::find($id);
        return view('admin.account.detail')->with([
            'account' => $user
        ]);
    }

    public function deleteUser($id) {
        $use = User::destroy($id);
        return response()->json([
            'message' => 'xóa thành công user'
        ]);
    }
    public function updateAccount($id, Request $request) {
        $user = User::find($id);
        $data = $request->all();
        $data['password'] = Hash::make($data['new_password']);
        $user->update($data);
       
        return redirect()->back()->with([
            'message' => 'Cập nhật thành công'
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