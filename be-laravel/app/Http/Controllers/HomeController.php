<?php

namespace App\Http\Controllers;

use App\Models\DetailItem;

class HomeController extends Controller
{
    public function index()
    {


        $detail_items = DetailItem::selectRaw('category_name, sum(sales_qty) as qty')
            ->join('categories', 'detail_items.category_id', '=', 'categories.id')
            ->groupBy('category_name')
            ->orderBy('qty', 'desc');
        if (request('start-date') && request('end-date')) {
            $detail_items->whereBetween('transaction_date', [request('start-date'), request('end-date')]);
        }

        return response()->json([
            'message' => 'detail items retrieved successfully',
            'data' => $detail_items->paginate(10)
        ], 200);
    }
}
