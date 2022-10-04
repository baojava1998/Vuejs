<?php
namespace App\Http\Controllers;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->paginate(5);
        return new ProductCollection($products);
    }
    public function store(ProductRequest $request)
    {
        $data = $request->getData();
        Product::create($data);
        return response()->json('Product created!');
    }
    public function show($id)
    {
        $product = Product::find($id);
        return new ProductResource($product);
    }
    public function update($id, ProductRequest $request)
    {
        $product = Product::find($id);
        $product->update($request->all());
        return response()->json('Product updated!');
    }
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json('Product deleted!');
    }
}
