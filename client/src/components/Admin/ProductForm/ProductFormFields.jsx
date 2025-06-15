/**
 * Visual-only input fields for product form.
 * Receives full form state as object and updates via setForm.
 */
const ProductFormFields = ({ form, setForm }) => {
  // Text/number input handler
  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Checkbox handler
  const handleCheckbox = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.checked }));

  return (
    <>
      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={handleChange("title")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700"
        required
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price (€)"
        value={form.price}
        onChange={handleChange("price")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 no-spinner"
        required
      />

      {/* Stock quantity */}
      <input
        type="number"
        placeholder="Stock quantity"
        value={form.stockQuantity}
        onChange={handleChange("stockQuantity")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 no-spinner"
      />

      {/* Category selector */}
      <select
        value={form.category}
        onChange={handleChange("category")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700"
      >
        <option value="equipment">Equipment</option>
        <option value="clothing">Clothing</option>
        <option value="set">Set</option>
      </select>

      {/* Subcategory (only for equipment) */}
      {form.category === "equipment" && (
        <input
          type="text"
          placeholder="Subcategory"
          value={form.subcategory}
          onChange={handleChange("subcategory")}
          className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700"
        />
      )}

      {/* Description (DE) */}
      <h3 className="text-lg font-semibold mt-6">Beschreibung (Deutsch)</h3>
      <input
        type="text"
        placeholder="Intro-Titel"
        value={form.introTitleDe}
        onChange={handleChange("introTitleDe")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />
      <textarea
        placeholder="Intro-Text"
        value={form.introTextDe}
        onChange={handleChange("introTextDe")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />
      <textarea
        placeholder="Features (one per line)"
        value={form.featuresDe}
        onChange={handleChange("featuresDe")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />
      <textarea
        placeholder="Highlights (one per line)"
        value={form.highlightsDe}
        onChange={handleChange("highlightsDe")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />
      <textarea
        placeholder="Closing text"
        value={form.closingTextDe}
        onChange={handleChange("closingTextDe")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />

      {/* Description (EN) */}
      <h3 className="text-lg font-semibold mt-6">Description (English)</h3>
      <input
        type="text"
        placeholder="Intro Title"
        value={form.introTitleEn}
        onChange={handleChange("introTitleEn")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />
      <textarea
        placeholder="Intro Text"
        value={form.introTextEn}
        onChange={handleChange("introTextEn")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />
      <textarea
        placeholder="Features (one per line)"
        value={form.featuresEn}
        onChange={handleChange("featuresEn")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />
      <textarea
        placeholder="Highlights (one per line)"
        value={form.highlightsEn}
        onChange={handleChange("highlightsEn")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />
      <textarea
        placeholder="Closing Text"
        value={form.closingTextEn}
        onChange={handleChange("closingTextEn")}
        className="w-full bg-neutral-800 px-4 py-2 rounded border border-neutral-700 mt-2"
      />

      {/* isActive checkbox */}
      <label className="flex items-center gap-3 text-sm text-gray-300 mt-4">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={handleCheckbox("isActive")}
          className="w-4 h-4"
        />
        isActive
      </label>
    </>
  );
};

export default ProductFormFields;