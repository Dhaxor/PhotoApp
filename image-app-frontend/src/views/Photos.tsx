import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { PhotoModel } from '../interfaces/project';
import { asset } from '../utils/assets';
import toast from 'react-hot-toast';
import UploadModal from '../components/UploadModal';

export default function Photos() {
  const [images, setImages] = useState<PhotoModel[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchImages = () => {
        const toastId = toast.loading('loading..');
        axiosClient.get('/images')
          .then(({data}) => {
            setImages(data)
            toast.success('Images loaded!', {id: toastId})
          }).catch((error) => {
            toast.error(error.response.data.message, {id: toastId})
          })
    };

    fetchImages();
}, []);

  const addFavourite = async (id: number) => {
      const toastId = toast.loading('Loading...')
      axiosClient.post(`/images/${id}/favourites`)
        .then(() => {
          toast.success('Added to favourites!', {id: toastId})
        }).catch((error) => {
          toast.error(error.response.data.message, {id: toastId})
        })
  }

   const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!selectedFile) {
          toast.error('Please select a file before uploading');
          return;
      }
      
      const toastId = toast.loading('Loading...');
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', title);
      formData.append('description', description);

      axiosClient.post('/images', formData)
        .then(({data}) => {
          toast.success('File Uploaded successfully', {id: toastId});
          setImages(prevPhotos => [...prevPhotos, data.data]);
          setShowModal(false);
          setTitle('');
          setDescription('');
        }).catch((error) => {
          toast.error(error.response.data.message, {id: toastId});
        })
    };

  const hasImages = Array.isArray(images) && images.length > 0;

  return (
	<>
    <div className="flex justify-end">
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Upload Image
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       <UploadModal
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onFileChange={handleFileChange}
        title={title}
        onTitleChange={setTitle}
        description={description}
        onDescriptionChange={setDescription}
        onUpload={handleImageUpload}
      />
      {hasImages ?  ( images.map(image => (
        <div key={image.id} className="rounded overflow-hidden shadow-lg">
          <Link to={`/photos/${image.id}`}>
            <img 
              src={asset(image.path)}
              alt={image.title} 
              className="w-full h-48 object-cover" 
            />
         </Link>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{image.title}</div>
            <p className="text-gray-700 text-base mb-4">
              {image.description}
            </p>

            <button
              onClick={() => addFavourite(image.id)}
              className={`bg-indigo-500 text-white font-bold py-2 px-4 rounded block w-full 'hover:bg-indigo-600'`}>
               Add Favorite
            </button>
          </div>
        </div>
      ))) :
        (
          <div className="bg-gray-100 text-gray-500 text-center font-semibold rounded shadow-lg p-8">
            No images found
          </div> 
        )
      }
      
    </div>
  </>
  )
}
