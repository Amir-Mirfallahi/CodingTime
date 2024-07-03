<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\CategoryResource;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            $categories = CategoryResource::collection(Category::query()->orderByDesc('id')->paginate(7));
            $posts = Post::query()->orderByDesc('id')->paginate(7);
            $latestPosts = PostResource::collection($posts);
            return inertia('Dashboard', [
                'categories' => $categories,
                'latestPosts' => $latestPosts,
            ]);
        })->name('dashboard');
        Route::resource('posts', PostController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('comments', CommentController::class);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('', [HomeController::class, 'index'])->name('home');

require __DIR__ . '/auth.php';


