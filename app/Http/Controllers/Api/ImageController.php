<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{

    public function toggleFavourite(Image $image)
    {
        $user = auth()->user();
        
        if ($user->favouriteImages()->where('image_id', $image->id)->exists()) {
            return response()->json(['message' => 'Image already in favourites'], 409);
        } else {
            $user->favouriteImages()->attach($image->id);
            return response()->json(['message' => 'Added to favourites']);
        }
    }

    public function favourites()
    {
        $user = auth()->user();
        $favouriteImages = $user->favouriteImages;
        return response()->json($favouriteImages);
    }

    public function getAllImages()
    {
       $images = Image::where('user_id', auth()->user()->id)->get();
       return response()->json($images);
    }

    public function getImageById($id)
    {
       $images = Image::find($id);
       return response()->json($images);

    }

    public function upload(Request $request) {
        $request->validate([
            'title' => 'required|string',
            'description' => 'string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imageName = time() . '.' . $request->image->extension();  
        $request->image->move(public_path('storage/images'), $imageName);
        
        $image = new Image();
        $image->title = $request->title;
        $image->path = 'images/' . $imageName;
        $image->description = $request->description;
        $image->user_id = auth()->user()->id;
        $image->save();

        return response()->json([
            'message' => 'Image uploaded successfully',
            'data' => $image
        ]);
    }
}
