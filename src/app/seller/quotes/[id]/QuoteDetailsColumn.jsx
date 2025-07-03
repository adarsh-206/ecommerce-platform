import {
  Package,
  User,
  Mail,
  FileText,
  Ruler,
  ImageIcon,
  Info,
} from "lucide-react";

const QuoteDetailsColumn = ({ quote }) => {
  const renderDetail = (Icon, label, value) => (
    <div className="flex items-start">
      <Icon className="w-5 h-5 text-orange-500 mr-4 mt-1 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
        Request Details
      </h2>
      <div className="space-y-6">
        {renderDetail(Package, "Product Type", quote.productType)}
        {renderDetail(Info, "Quantity", quote.quantity)}
        {renderDetail(Ruler, "Sizes Requested", quote.sizes.join(", "))}
        {quote.notes && renderDetail(FileText, "Notes", `"${quote.notes}"`)}
        <div>
          <div className="flex items-center mb-3">
            <ImageIcon className="w-5 h-5 text-orange-500 mr-4" />
            <p className="text-sm font-semibold text-gray-500">
              Design References
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quote.image.map((img, idx) => (
              <a
                href={img}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="focus:outline-none"
              >
                <img
                  src={img}
                  alt={`Design Reference ${idx + 1}`}
                  className="w-full h-28 object-cover rounded-xl border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 transform hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="!mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Customer Info
          </h3>
          {renderDetail(User, "Full Name", quote.user.fullName)}
          {renderDetail(Mail, "Email", quote.user.email)}
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailsColumn;
