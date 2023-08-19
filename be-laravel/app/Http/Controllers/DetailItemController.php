<?php

namespace App\Http\Controllers;

use App\Models\DetailItem;
use App\Models\Item;
use Illuminate\Http\Request;


class DetailItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $detail_items = DetailItem::select([
            'detail_items.id as id', 'item_id', 'category_id', 'stock', 'sales_qty', 'transaction_date', 'item_name', 'category_name'
        ])->join('items', 'detail_items.item_id', '=', 'items.id')
            ->join('categories', 'detail_items.category_id', 'categories.id')
            ->where('item_name', 'like', "%" . request('search') . "%")
            ->orWhere('category_name', 'like', "%" . request('search') . "%")
            ->orWhere('stock', 'like', "%" . request('search') . "%")
            ->orWhere('sales_qty', 'like', "%" . request('search') . "%")
            ->orWhere('transaction_date', 'like', "%" . request('search') . "%")
            ->orderBy('item_name', request('sort-item') ? request('sort-item') : 'desc')
            ->orderBy('item_name', request('sort-date') ? request('sort-date') : 'desc')
            ->paginate(5);

        return response()->json([
            'message' => 'detail items retrieved successfully',
            'data' => $detail_items
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required',
            'category_id' => 'required',
            'stock' => 'required',
            'sales_qty' => 'required',
            'transaction_date' => 'required',
        ]);

        $detail_item = DetailItem::create($validated);
        return response()->json(['message' => 'detail item created successfully', 'data' => $detail_item], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $detail_item = DetailItem::select([
            'detail_items.id as id', 'item_id', 'category_id', 'stock', 'sales_qty', 'transaction_date', 'item_name', 'category_name'
        ])->join('items', 'detail_items.item_id', '=', 'items.id')
            ->join('categories', 'detail_items.category_id', 'categories.id')
            ->where('detail_items.id', '=', $id)
            ->first();
        if (!$detail_item) {
            return response()->json(['message' => 'detail item not found'], 404);
        }
        return response()->json(['message' => 'detail item retrieved successfully', 'data' => $detail_item], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $detail_item = DetailItem::find($id);
        if (!$detail_item) {
            return response()->json(['message' => 'detail item not found'], 404);
        }

        $validated = $request->validate([
            'item_id' => 'required',
            'category_id' => 'required',
            'stock' => 'required',
            'sales_qty' => 'required',
            'transaction_date' => 'required',
        ]);

        $detail_item->update($validated);
        return response()->json(['message' => 'detail item updated successfully', 'data' => $detail_item], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $detail_item = DetailItem::find($id);
        if (!$detail_item) {
            return response()->json(['message' => 'detail item not found'], 404);
        }
        $detail_item->delete();
        return response()->json(['message' => 'detail item deleted successfully'], 204);
    }
}
