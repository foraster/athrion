import { toCents } from "../../../utils/helpers";

/**
 * Builds a product preview object and passes it to setSelectedProduct.
 */
const PreviewButton = ({ form, image, setSelectedProduct }) => {
  const handlePreview = () => {
    const product = {
      ...form,
      price_cents: toCents(form.price),
      image:
        image && typeof image === "object"
          ? URL.createObjectURL(image)
          : image || null,
      description: {
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
      },
    };

    setSelectedProduct(product);
  };

  return (
    <button
      type="button"
      onClick={handlePreview}
      className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded font-semibold"
    >
      Preview
    </button>
  );
};

export default PreviewButton;