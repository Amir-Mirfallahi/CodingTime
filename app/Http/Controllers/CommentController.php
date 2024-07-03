<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Post;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {
        $validated = $request->validated();
        $comment = Comment::query()->create([
            'comment' => $validated['comment'],
            'user_id' => auth()->user()->id,
        ]);
        $post = Post::find(auth()->user()->id);
        $post->comments()->attach($comment->id);
        return to_route('posts.show', $post->id)->with('success', 'Your Comment is Successfully Created!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->posts()->detach();
        $comment->delete();
    }
}
