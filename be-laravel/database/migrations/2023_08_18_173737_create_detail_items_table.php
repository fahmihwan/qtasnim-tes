<?php

use App\Models\Category;
use App\Models\Item;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Item::class);
            $table->foreignIdFor(Category::class);
            $table->integer('stock');
            $table->integer('sales_qty');
            $table->date('transaction_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_items');
    }
};
