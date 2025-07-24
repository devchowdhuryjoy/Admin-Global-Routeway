import React, { useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";

const initialVideos = [
  {
    id: 1,
    // title: 'Study in UK #studyabroad #UK #education',
    tags: ["#studyabroad", "#UK", "#education"],
    defaultUrl: "https://youtube.com/embed/uk-study-video",
    // thumbnail: "Study in UK",
  },
  {
    id: 2,
    // title: 'Study in UK #visa #education #students',
    tags: ["#visa", "#education", "#students"],
    defaultUrl: "https://youtube.com/embed/uk-student-visa",
    // thumbnail: "Study in UK",
  },
  {
    id: 3,
    // title: 'Want To Study in New Zealand #studyabroad #NZ',
    tags: ["#studyabroad", "#USA", "#scholarship"],
    defaultUrl: "https://youtube.com/embed/nz-study-program",
    // thumbnail: "Study in NZ",
  },
];

const VideoGallery = () => {
  const [videos, setVideos] = useState(
    initialVideos.map((v) => ({ ...v, url: v.defaultUrl }))
  );

  const handleChange = (index, newUrl) => {
    const updatedVideos = [...videos];
    updatedVideos[index].url = newUrl;
    setVideos(updatedVideos);
  };

  const updateVideoAPI = async (id, url) => {
    try {
      const response = await fetch(`${BASE_URL}video`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, url }),
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    for (const video of videos) {
      await updateVideoAPI(video.id, video.url);
    }
    Swal.fire(
      "Saved!",
      "Changes saved successfully! These will now appear on the user side.",
      "success"
    );
  };

  const handlePublish = async () => {
    for (const video of videos) {
      await updateVideoAPI(video.id, video.url);
    }
    Swal.fire(
      "Published!",
      "Changes published! Users can now see the updated videos.",
      "success"
    );
  };

  const handleReset = () => {
    const resetVideos = initialVideos.map((v) => ({ ...v, url: v.defaultUrl }));
    setVideos(resetVideos);
    Swal.fire(
      "Reset!",
      "URLs have been reset to their original values.",
      "info"
    );
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <header className="bg-white shadow-md py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Video Testimonials Admin
          </h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Manage Video URLs
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Update the video URLs below. Changes will be reflected immediately
            on the user side.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-44 flex items-center justify-center text-slate-500 font-semibold bg-slate-200">
                  {video.thumbnail}
                </div>
                <div className="p-4">
                  <div className="font-semibold text-slate-900 h-[50px] overflow-hidden mb-2">
                    {video.title}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <input
                    type="url"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={video.url}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder="Enter video URL"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
            <button
              onClick={handleReset}
              className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded"
            >
              Reset
            </button>
            <button
              onClick={handlePublish}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Publish Changes
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VideoGallery;
