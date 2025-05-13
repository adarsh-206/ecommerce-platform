export default function BulkOrderCTA() {
  return (
    <section className="bg-indigo-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Looking for Bulk Orders?
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            We offer special pricing and service for large volume orders. Reach
            out to us directly!
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="mailto:care@gmail.com"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Mail us at care@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
