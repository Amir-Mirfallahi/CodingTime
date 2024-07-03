<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Category::query();
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        $categories = $query->paginate('5')->onEachSide(1);

        return inertia('Category/Index', [
            'categories' => CategoryResource::collection($categories),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();
        Category::query()->create([
            'name' => $validated['name'],
            'svg_icon' => $validated['svg_icon'],
        ]);
        return to_route('categories.index')->with('success', "Category `" . $validated['name'] . '` Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return inertia('Category/Show', [
            'category' => $category,
            'postsCount' => count($category->posts()->get()),
            'createdAt' => (new Carbon($category->created_at))->format('M d, Y')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Category/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validated = $request->validated();
        $category->update([
            'name' => $validated['name'],
            'svg_icon' => $validated['svg_icon']
        ]);
        return to_route('categories.index')->with('success', 'Category `' . $validated['name'] . '` Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $name = $category->name;
        $category->delete();
        return to_route('categories.index')->with('success', "Category `" . $name . '` Deleted Successfully!');
    }
}
