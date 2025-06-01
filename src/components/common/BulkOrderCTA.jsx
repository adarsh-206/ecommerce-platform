export default function BulkOrderCTA() {
  return (
    <section className="bg-[#d4a98e] py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-[#7c533e]">
          Looking for Bulk Orders?
        </h2>
        <p className="mt-5 text-lg text-[#8b6340] font-medium max-w-xl mx-auto">
          We offer special pricing and service for large volume orders. Reach
          out to us directly!
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="mailto:care@gmail.com"
            className="inline-block px-10 py-4 rounded-lg font-semibold text-[#d4a98e] bg-[#7c533e] hover:bg-[#6b432f] transition-colors duration-300"
          >
            Mail us at care@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
