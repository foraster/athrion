import { useRef, useState } from "react";

/**
 * Handles image upload via drag & drop or file input,
 * and displays preview (URL or file).
 */
const ProductImageUpload = ({ image, setImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const dragCounter = useRef(0);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mt-6">Image</h3>

      {/* Drop zone */}
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          dragCounter.current++;
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          dragCounter.current--;
          if (dragCounter.current === 0) {
            setDragActive(false);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`w-full p-6 border-2 border-dashed rounded transition ${
          dragActive
            ? "border-blue-500 bg-neutral-700"
            : "border-neutral-700 bg-neutral-800"
        }`}
      >
        <p className="text-sm text-gray-400 text-center">
          {image
            ? typeof image === "object" && image.name
              ? `Selected file: ${image.name}`
              : "Image already uploaded"
            : "Drag & drop an image here or click to select"}
        </p>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          id="upload-input"
          onChange={(e) => {
            setDragActive(false);
            if (e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          className="hidden"
        />
        <label
          htmlFor="upload-input"
          className="block text-center text-sm mt-2 underline cursor-pointer text-blue-400"
        >
          Browse
        </label>
      </div>

      {/* Preview */}
      {image && typeof image === "string" && (
        <img
          src={image}
          alt="preview"
          className="w-20 h-20 object-cover mt-2 rounded"
        />
      )}
      {image && typeof image === "object" && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="w-20 h-20 object-cover mt-2 rounded"
        />
      )}
    </div>
  );
};

export default ProductImageUpload;