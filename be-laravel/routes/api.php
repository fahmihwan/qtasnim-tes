<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DetailItemController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/home', [HomeController::class, 'index']);
Route::get('/category/list', [CategoryController::class, 'get_all']);
Route::resource('/category', CategoryController::class, [
    'only' => ['index', 'store', 'update', 'destroy', 'show']
]);

Route::get('/item/list', [ItemController::class, 'get_all']);
Route::resource('/item', ItemController::class, [
    'only' => ['index', 'store', 'update', 'destroy', 'show', 'get_all']
]);

Route::resource('/detail-item', DetailItemController::class, [
    'only' => ['index', 'store', 'update', 'destroy', 'show']
]);
