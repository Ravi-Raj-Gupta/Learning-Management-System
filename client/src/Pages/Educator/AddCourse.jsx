import { AppContext } from "@/Context/AppContext";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const AddCourse = () => {

  const { backendUrl, getToken } = useContext(AppContext);

  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    coursePrice: "",
    discount: "",
    courseThumbnail: null,
  });

  const [chapters, setChapters] = useState([]);

  // 🔥 MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [tempChapter, setTempChapter] = useState({
    chapterTitle: "",
    chapterContent: [],
  });

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "courseThumbnail") {
      setFormData({ ...formData, courseThumbnail: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ---------------- OPEN MODAL ----------------
  const openChapterModal = () => {
    setTempChapter({
      chapterTitle: "",
      chapterContent: [],
    });
    setShowModal(true);
  };

  // ---------------- ADD LECTURE IN MODAL ----------------
  const addLectureToTemp = () => {
    setTempChapter({
      ...tempChapter,
      chapterContent: [
        ...tempChapter.chapterContent,
        {
          lectureId: Date.now().toString(),
          lectureTitle: "",
          lectureUrl: "",
          lectureDuration: 0,
          lectureOrder: tempChapter.chapterContent.length + 1,
          isPreviewFree: false,
        },
      ],
    });
  };

  const handleTempLectureChange = (index, field, value) => {
    const updated = [...tempChapter.chapterContent];
    updated[index][field] = value;

    setTempChapter({
      ...tempChapter,
      chapterContent: updated,
    });
  };

  // ---------------- SAVE CHAPTER ----------------
  const saveChapter = () => {
    const newChapter = {
      chpaterId: Date.now().toString(),
      chapterTitle: tempChapter.chapterTitle,
      chapterOrder: chapters.length + 1,
      chapterContent: tempChapter.chapterContent,
    };

    setChapters([...chapters, newChapter]);
    setShowModal(false);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!formData.courseThumbnail) {
        return toast.error("Thumbnail not selected");
      }

      const courseData = {
        courseTitle: formData.courseTitle,
        courseDescription: formData.courseDescription,
        coursePrice: Number(formData.coursePrice),
        discount: Number(formData.discount),
        courseContent: chapters,
      };

      const sendData = new FormData();
      sendData.append("courseData", JSON.stringify(courseData));
      sendData.append("image", formData.courseThumbnail);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/educator/add-course",
        sendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Course Added ✅");

        setFormData({
          courseTitle: "",
          courseDescription: "",
          coursePrice: "",
          discount: "",
          courseThumbnail: null,
        });

        setChapters([]);

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex justify-between">

      {/* LEFT FORM */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">

        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Course Description</label>
          <textarea
            name="courseDescription"
            rows="4"
            value={formData.courseDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex gap-6">
          <input
            type="number"
            name="coursePrice"
            placeholder="Price"
            value={formData.coursePrice}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={formData.discount}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* THUMBNAIL */}
        <label className="inline-block bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800">
          Upload Thumbnail
          <input type="file" name="courseThumbnail" hidden onChange={handleChange} />
        </label>

        {/* ---------------- COURSE CONTENT ---------------- */}
        <div>
          <h3 className="text-md font-semibold mb-2">Course Content</h3>

          {chapters.map((ch, i) => (
            <div key={i} className="border p-3 rounded mb-2 bg-white">
              <p className="font-medium">{ch.chapterTitle}</p>
              <p className="text-sm text-gray-500">
                {ch.chapterContent.length} Lectures
              </p>
            </div>
          ))}

          <button
            type="button"
            onClick={openChapterModal}
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
          >
            + Add Chapter
          </button>
        </div>

        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
          ADD
        </button>

      </form>

      {/* RIGHT SIDE */}
      <div className="hidden md:block border border-gray-300 rounded p-4 h-fit bg-white">
        <p className="text-sm mb-3 cursor-pointer hover:text-blue-600">My Profile</p>
        <p className="text-sm cursor-pointer hover:text-red-500">Logout</p>
      </div>

      {/* ---------------- MODAL ---------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-lg p-6 rounded-lg space-y-4">

            <h2 className="text-lg font-semibold">Add Chapter</h2>

            <input
              type="text"
              placeholder="Chapter Title"
              value={tempChapter.chapterTitle}
              onChange={(e) =>
                setTempChapter({ ...tempChapter, chapterTitle: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            {tempChapter.chapterContent.map((lecture, index) => (
              <div key={index} className="border p-3 rounded">

                <input
                  type="text"
                  placeholder="Lecture Title"
                  value={lecture.lectureTitle}
                  onChange={(e) =>
                    handleTempLectureChange(index, "lectureTitle", e.target.value)
                  }
                  className="w-full border px-2 py-1 mb-2"
                />

                <input
                  type="text"
                  placeholder="Lecture URL"
                  value={lecture.lectureUrl}
                  onChange={(e) =>
                    handleTempLectureChange(index, "lectureUrl", e.target.value)
                  }
                  className="w-full border px-2 py-1"
                />

              </div>
            ))}

            <button
              type="button"
              onClick={addLectureToTemp}
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Lecture
            </button>

            <div className="flex justify-end gap-3 pt-4">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={saveChapter}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AddCourse;