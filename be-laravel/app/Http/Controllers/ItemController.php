<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => 'items retrieved successfully',
            'data' => Item::latest()->paginate(5)
        ], 200);
    }

    public function get_all()
    {
        return response()->json([
            'message' => 'items retrieved successfully',
            'data' => Item::select(['id', 'item_name as name'])->latest()->get()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_name' => 'required'
        ]);

        $item = Item::create($validated);
        return response()->json(['message' => 'item created successfully', 'data' => $item], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'item not found'], 404);
        }
        return response()->json(['message' => 'item retrieved successfully', 'data' => $item], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'item not found'], 404);
        }
        $validated = $request->validate([
            'item_name' => 'required'
        ]);
        $item->update($validated);
        return response()->json(['message' => 'item updated successfully', 'data' => $item], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'item not found'], 404);
        }
        $item->delete();
        return response()->json(['message' => 'item deleted successfully'], 204);
    }
}
