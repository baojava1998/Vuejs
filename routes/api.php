<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route::middleware('api')->group(function () {
    Route::post('login', [LoginController::class,'login']);
    Route::post('logout', [LoginController::class,'logout']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('info', [LoginController::class,'info']);
        Route::resource('products', ProductController::class);
    });
});
