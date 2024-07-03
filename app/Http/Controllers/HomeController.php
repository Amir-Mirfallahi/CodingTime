<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index()
    {
        $query = Post::query();
        $posts = $query->orderByDesc('created_at')->paginate('10');
        return inertia('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'posts' => PostResource::collection($posts),
        ]);
    }
}
