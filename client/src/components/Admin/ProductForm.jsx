import React, { useEffect, useRef, useState } from "react";
import {
  createProduct,
  fetchOneProduct,
  updateProduct,
} from "../../http/productAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toCents } from "../../utils/helpers";

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("equipment");
  const [subcategory, setSubcategory] = useState("");
  const [introTitleDe, setIntroTitleDe] = useState("");
  const [introTextDe, setIntroTextDe] = useState("");
  const [featuresDe, setFeaturesDe] = useState("");
  const [highlightsDe, setHighlightsDe] = useState("");
  const [closingTextDe, setClosingTextDe] = useState("");
  const [introTitleEn, setIntroTitleEn] = useState("");
  const [introTextEn, setIntroTextEn] = useState("");
  const [featuresEn, setFeaturesEn] = useState("");
  const [highlightsEn, setHighlightsEn] = useState("");
  const [closingTextEn, setClosingTextEn] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const dragCounter = useRef(0);

  useEffect(() => {
    if (isEdit) {
      fetchOneProduct(id).then((product) => {
        setTitle(product.title);
        setPrice(product.price_cents / 100);
        setCategory(product.category);
        setSubcategory(product.subcategory || "");
        setIntroTitleDe(product.description.de.introTitle || "");
        setFeaturesDe((product.description.de.features || []).join('\n'));
setHighlightsDe((product.description.de.highlights || []).join('\n'));

        setClosingTextDe(product.description.de.closingText || "");
        setIntroTitleEn(product.description.en.introTitle || "");
setFeaturesEn((product.description.en.features || []).join('\n'));
setHighlightsEn((product.description.en.highlights || []).join('\n'));
        setClosingTextEn(product.description.en.closingText || "");
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price ) {
      setMessage("All required fields must be filled.");
      return;
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
      setMessage("Price must be a valid number (e.g., 29.99)");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      const price_cents = toCents(price);
      formData.append("price_cents", price_cents);
      formData.append("category", category);
      formData.append(
        "subcategory",
        category === "equipment" ? subcategory : ""
      );
      const description = {
        de: {
          introTitle: introTitleDe,
          introText: introTextDe,
          features: featuresDe.split('\n').filter(f => f.trim() !== ''),
          highlights: highlightsDe.split('\n').filter(f => f.trim() !== ''),
          closingText: closingTextDe
        },
        en: {
          introTitle: introTitleEn,
          introText: introTextEn,
          features: featuresEn.split('\n').filter(f => f.trim() !== ''),
          highlights: highlightsEn.split('\n').filter(f => f.trim() !== ''),
          closingText: closingTextEn
        }
      };
      formData.append("description", JSON.stringify(description));
      if (image) {
        formData.append("image", image);
      }
      if (isEdit) {
        await updateProduct(id, formData);
        setMessage("Product was successfully updated.");
        navigate("/admin/products");
      } else {
        if (!image) {
          setMessage("Image file is required");
          return;
        }
        await createProduct(formData);
        setMessage("Product was successfully added.");
        // Clear form on submit
        setTitle("");
        setPrice("");
        setSubcategory("");
        setIntroTitleDe("");
        setIntroTextDe("");
        setFeaturesDe("");
        setHighlightsDe("");
        setClosingTextDe("");
        setIntroTitleEn("");
        setIntroTextEn("");
        setFeaturesEn("");
        setHighlightsEn("");
        setClosingTextEn("");
        setImage(null);
      }
    } catch (error) {
      setMessage("Error while adding product");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-2 text-white rounded shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Add new product</h2>
      {message && <p className="mt-4 text-md text-red-400">{message}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700"
        required
      />

      <input
        type="number"
        placeholder="Price (€)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700"
      >
        <option value="equipment">Equipment</option>
        <option value="clothing">Clothing</option>
        <option value="set">Set</option>
      </select>

      {category === "equipment" && (
        <input
          type="text"
          placeholder="Subcategory"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700"
        />
      )}

    {/* Description (DE) */}
    <h3 className="text-lg font-semibold mt-6">Beschreibung (Deutsch)</h3>
    <input
      type="text"
      placeholder="Intro-Titel (z.B. 'Trainiere zuhause wie nie zuvor')"
      value={introTitleDe}
      onChange={(e) => setIntroTitleDe(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <textarea
      placeholder="Intro-Text"
      value={introTextDe}
      onChange={(e) => setIntroTextDe(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <textarea
      placeholder="Features (jede Zeile ist ein Punkt)"
      value={featuresDe}
      onChange={(e) => setFeaturesDe(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <textarea
      placeholder="Highlights (jede Zeile ist ein Punkt)"
      value={highlightsDe}
      onChange={(e) => setHighlightsDe(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <textarea
      placeholder="Abschlusstext (optional)"
      value={closingTextDe}
      onChange={(e) => setClosingTextDe(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />

    {/* Description (EN) */}
    <h3 className="text-lg font-semibold mt-6">Description (English)</h3>
    <input
      type="text"
      placeholder="Intro Title (e.g. 'Train at home like never before')"
      value={introTitleEn}
      onChange={(e) => setIntroTitleEn(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <textarea
      placeholder="Intro Text"
      value={introTextEn}
      onChange={(e) => setIntroTextEn(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <textarea
      placeholder="Features (one per line)"
      value={featuresEn}
      onChange={(e) => setHighlightsEn(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <textarea
      placeholder="Highlights (one per line)"
      value={highlightsEn}
      onChange={(e) => setHighlightsEn(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <textarea
      placeholder="Closing Text (optional)"
      value={closingTextEn}
      onChange={(e) => setClosingTextEn(e.target.value)}
      className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
    />
    <h3 className="text-lg font-semibold mt-6">Image</h3>
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
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImage(e.dataTransfer.files[0]);
          }
        }}
        className={`w-full p-6 border-2 border-dashed rounded transition
    ${
      dragActive
        ? "border-blue-500 bg-neutral-700"
        : "border-neutral-700 bg-neutral-800"
    }
  `}
      >
        <p className="text-sm text-gray-400 text-center">
          {image
            ? `Selected file: ${image.name}`
            : "Drag & drop an image here or click to select"}
        </p>

        <input
          type="file"
          onChange={(e) => {
            setDragActive(false);
            setImage(e.target.files[0]);
          }}
          accept="image/*"
          className="hidden"
          id="upload-input"
        />
        <label
          htmlFor="upload-input"
          className="block text-center text-sm mt-2 underline cursor-pointer text-blue-400"
        >
          Browse
        </label>
      </div>
      {image && (
        <p className="text-sm mt-1 text-gray-400">Selected: {image.name}</p>
      )}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          className="w-20 h-20 object-cover mt-2 rounded"
        />
      )}

      <button
        type="submit"
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 font-semibold"
      >
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ProductForm;
