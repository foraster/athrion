import { useEffect, useRef, useState } from "react";
import {
  createProduct,
  fetchOneProduct,
  updateProduct,
} from "../../http/productAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toCents } from "../../utils/helpers";
import ProductDetailsModal from "../Modals/ProductDetailsModal";
import ProductFormFields from "./ProductForm/ProductFormFields";
import { ADMIN_ROUTE, PRODUCTS_ROUTE } from "../../utils/consts";
import ProductImageUpload from "./ProductForm/ProductImageUpload";
import PreviewButton from "./ProductForm/PreviewButton";

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    stockQuantity: 0,
    category: "equipment",
    subcategory: "",
    introTitleDe: "",
    introTextDe: "",
    featuresDe: "",
    highlightsDe: "",
    closingTextDe: "",
    introTitleEn: "",
    introTextEn: "",
    featuresEn: "",
    highlightsEn: "",
    closingTextEn: "",
    isActive: false,
  });

  // Fetch product data if editing
  useEffect(() => {
    if (!isEdit) return;
    fetchOneProduct(id).then((product) => {
      setForm({
        title: product.title,
        price: product.price_cents / 100,
        category: product.category,
        subcategory: product.subcategory || "",
        stockQuantity: product.stock_quantity || 0,
        isActive: product.isActive || false,
        introTitleDe: product.description.de.introTitle || "",
        introTextDe: product.description.de.introText || "",
        featuresDe: (product.description.de.features || []).join("\n"),
        highlightsDe: (product.description.de.highlights || []).join("\n"),
        closingTextDe: product.description.de.closingText || "",
        introTitleEn: product.description.en.introTitle || "",
        introTextEn: product.description.en.introText || "",
        featuresEn: (product.description.en.features || []).join("\n"),
        highlightsEn: (product.description.en.highlights || []).join("\n"),
        closingTextEn: product.description.en.closingText || "",
      });
      setImage(process.env.REACT_APP_API_URL + product.image);
    });
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      setMessage("All required fields must be filled.");
      return;
    }

    // Validate price format
    if (!/^\d+(\.\d{1,2})?$/.test(form.price)) {
      setMessage("Price must be a valid number (e.g., 29.99)");
      return;
    }

    try {
      // Prepare form data for submission
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price_cents", toCents(form.price));
      formData.append("category", form.category);
      formData.append(
        "subcategory",
        form.category === "equipment" ? form.subcategory : ""
      );
      formData.append("stock_quantity", form.stockQuantity);
      formData.append("isActive", form.isActive);

      formData.append(
        "description",
        JSON.stringify({
          de: {
            introTitle: form.introTitleDe,
            introText: form.introTextDe,
            features: form.featuresDe.split("\n").filter((f) => f.trim()),
            highlights: form.highlightsDe.split("\n").filter((f) => f.trim()),
            closingText: form.closingTextDe,
          },
          en: {
            introTitle: form.introTitleEn,
            introText: form.introTextEn,
            features: form.featuresEn.split("\n").filter((f) => f.trim()),
            highlights: form.highlightsEn.split("\n").filter((f) => f.trim()),
            closingText: form.closingTextEn,
          },
        })
      );

      // If editing, append existing image or new image
      if (isEdit) {
        if (image && typeof image !== "string") {
          formData.append("newImage", image);
        }
        // Update product
        await updateProduct(id, formData);
        setMessage("Product was successfully updated.");
      } else {
        if (!image) {
          setMessage("Image file is required.");
          return;
        }
        formData.append("image", image);
        await createProduct(formData);
        setMessage("Product was successfully added.");
        // Reset form after adding new product
        setForm({
          title: "",
          price: "",
          stockQuantity: 0,
          category: "equipment",
          subcategory: "",
          introTitleDe: "",
          introTextDe: "",
          featuresDe: "",
          highlightsDe: "",
          closingTextDe: "",
          introTitleEn: "",
          introTextEn: "",
          featuresEn: "",
          highlightsEn: "",
          closingTextEn: "",
          isActive: false,
        });
        setImage(null);
      }
      // Navigate back to product list after successful save
      navigate(ADMIN_ROUTE + PRODUCTS_ROUTE);
    } catch (error) {
      console.error(error);
      setMessage("Error while saving product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-2 text-white rounded shadow-lg space-y-4"
    >
      {/* Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit product" : "Add new product"}
        </h2>
        <button
          type="button"
          onClick={() => navigate(ADMIN_ROUTE + PRODUCTS_ROUTE)}
          className="text-sm px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded border border-neutral-700 text-white"
        >
          ← Back to list
        </button>
      </div>
      {/* Display message if any */}
      {message && <p className="mt-4 text-md text-red-400">{message}</p>}

      <ProductFormFields form={form} setForm={setForm} />
      <ProductImageUpload image={image} setImage={setImage} />
      <PreviewButton
        form={form}
        image={image}
        setSelectedProduct={setSelectedProduct}
      />

      {/* Submit button */}
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
