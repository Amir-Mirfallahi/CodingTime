<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Carbon\Carbon;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Post::query();
        if (request('title')) {
            $query->where('title', 'like', '%' . request('title') . '%');
        }
        if (request('category_id')) {
            $query->where('category_id', request('category_id'));
        }
        $posts = $query->paginate('10')->onEachSide(1);

        return inertia('Post/Index', [
            'posts' => PostResource::collection($posts),
            'queryParams' => request()->query() ?: null,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return inertia('Post/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();
        $image_path = null;
        $image_public_id = null;
        if ($request->hasFile('image_path')) {
            $image_path = cloudinary()->upload($request->file('image_path')->getRealPath())->getSecurePath();
            $image_public_id = cloudinary()->getPublicId();
        }
        Post::query()->create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'content' => $validated['content'],
            'image_path' => $image_path,
            'image_public_id' => $image_public_id,
            'time_to_read' => $validated['time_to_read'],
            'user_id' => auth()->id(),
            'category_id' => $validated['category_id']
        ]);
        return to_route('posts.index')->with('success', 'Post `' . Str::limit($validated['title'], 17) . '` Created Successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('Post/Show', [
            'post' => new PostResource($post),
            'createdAt' => (new Carbon($post->created_at))->format('Y, M d'),
            'author' => $post->author
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $categories = Category::all();
        return inertia('Post/Edit', [
            'oldPost' => $post,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $image_path = $post->image_path;
        $image_public_id = $post->image_public_id;

        $validated = $request->validated();

        // Check if a new file has been uploaded and it's different from the existing one
        if ($request->hasFile('image_path')) {
            if ($image_public_id) {
                // Delete the old image from Cloudinary
                cloudinary()->destroy($image_public_id);
            }
            // Upload the new image
            $uploadedImage = cloudinary()->upload($request->file('image_path')->getRealPath());
            $image_path = $uploadedImage->getSecurePath();
            $image_public_id = $uploadedImage->getPublicId();
        }
        // Update the post with validated data
        $post->update([
            'title' => $validated['title'],
            'image_path' => $image_path,
            'image_public_id' => $image_public_id,
            'content' => $validated['content'],
            'time_to_read' => $validated['time_to_read'],
            'category_id' => $validated['category_id'],
        ]);

        return to_route('posts.index')->with('success', 'Post `' . Str::limit($validated['title'], 17) . '` Updated Successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        // Get the title of the post for the toast message
        $title = $post->title;
        if ($post->image_public_id) {
            // Delete image from cloudinary if exists
            cloudinary()->destroy($post->image_public_id);
        }
        // delete the post
        $post->delete();
        // Redirect to the list page with a success message
        return to_route('posts.index')->with('success', "Post `" . $title . '` Deleted Successfully!');
    }
}
