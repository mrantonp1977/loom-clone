'use client';

import FileInput from '@/components/FileInput';
import FormFileld from '@/components/FormFileld';
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants';
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from '@/lib/actions/video';
import { useFileInput } from '@/lib/hooks/useFileInput';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';


const uploadFileToBunny = (
  file: File,
  uploadUrl: string,
  accessKey: string
): Promise<void> =>
  fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((response) => {
    if (!response.ok)
      throw new Error(`Upload failed with status ${response.status}`);
  });


const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const router = useRouter();
   


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  useEffect(() => {
    if (video.duration !== null) {
      setVideoDuration(video.duration);
    }
  }, [video.duration]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!video.file || !thumbnail.file) {
        setError("Please select a video and a thumbnail.");
        return;
      }

      if(!formData.title || !formData.description) {
        setError("Please fill in all required fields.");
        return;
      }

      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey
      } = await getVideoUploadUrl();

      if (!videoUploadUrl || !videoAccessKey) throw new Error("Failed to get video upload URL.");

      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      const {
        uploadUrl: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl
      } = await getThumbnailUploadUrl(videoId);

      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) throw new Error("Failed to get thumbnail upload URL.");

      await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey);

      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration,
      })

       router.push(`/video/${videoId}`);

    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}
      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmit}>
        <FormFileld
          id="title"
          label="Title"
          placeholder="Enter the title of your video"
          value={formData.title}
          onChange={handleInputChange}
        />
        <FormFileld
          id="description"
          label="Description"
          placeholder="Describe your video in a few sentences"
          value={formData.description}
          as="textarea"
          onChange={handleInputChange}
        />
        <FileInput
          id="video"
          label="Video"
          accept={'video/*'}
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type={'video'}
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept={'image/*'}
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type={'image'}
        />

        <FormFileld
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          as="select"
          options={[
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
          ]}
          onChange={handleInputChange}
        />
        <button type='submit' disabled={isSubmitting} className='submit-button'>
          {isSubmitting ? 'Uploading...' : 'Upload Video' }
        </button>
      </form>
    </div>
  );
};

export default Page;
