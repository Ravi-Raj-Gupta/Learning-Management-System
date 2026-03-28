import { useState } from "react";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    headings: "",
    description: "",
    price: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex justify-between">
      
      {/* LEFT FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6"
      >
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Type here"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* HEADINGS */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Course Headings
          </label>
          <input
            type="text"
            name="headings"
            placeholder="Type here"
            value={formData.headings}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Course Description
          </label>
          <textarea
            name="description"
            placeholder="Type here"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PRICE + THUMBNAIL */}
        <div className="flex items-center gap-6 flex-wrap">
          
          {/* PRICE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="0"
              value={formData.price}
              onChange={handleChange}
              className="w-32 border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Thumbnail
            </label>

            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                Upload
                <input
                  type="file"
                  name="thumbnail"
                  hidden
                  onChange={handleChange}
                />
              </label>

              {formData.thumbnail && (
                <img
                  src={URL.createObjectURL(formData.thumbnail)}
                  alt="preview"
                  className="w-14 h-14 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          ADD
        </button>
      </form>

      {/* RIGHT SIDE PROFILE BOX */}
      <div className="hidden md:block border border-gray-300 rounded p-4 h-fit bg-white">
        <p className="text-sm mb-3 cursor-pointer hover:text-blue-600">
          My Profile
        </p>
        <p className="text-sm cursor-pointer hover:text-red-500">
          Logout
        </p>
      </div>
    </div>
  );
};

export default AddCourse;