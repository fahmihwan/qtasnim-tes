<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => 'categories retrieved successfully',
            'data' => Category::latest()->paginate(5)
        ], 200);
    }

    public function get_all()
    {
        return response()->json([
            'message' => 'categories retrieved successfully',
            'data' => Category::select(['id', 'category_name as name'])->latest()->get()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required'
        ]);

        $category = Category::create($validated);
        return response()->json(['message' => 'category created successfully', 'data' => $category], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'category not found'], 404);
        }
        return response()->json(['message' => 'category retrieved successfully', 'data' => $category], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'category not found'], 404);
        }
        $validated = $request->validate([
            'category_name' => 'required'
        ]);
        $category->update($validated);
        return response()->json(['message' => 'category updated successfully', 'data' => $category], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'category not found'], 404);
        }
        $category->delete();
        return response()->json(['message' => 'category deleted successfully'], 204);
    }
}
