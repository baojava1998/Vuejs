<?php

namespace App\Http\Resources;

use App\Http\Resources\PaginateResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CollectionResource extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    // Remove default tag "meta", "links" in response
    public function toResponse($request)
    {
        return JsonResource::toResponse($request);
    }

    // Add pagination format of collection
    public function with($request)
    {
        return [
            'paginate' => new PaginateResource($this)
        ];
    }
}
