export default function Newsletter() {
  return (
    <section className="bg-indigo-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Get the latest updates
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Sign up for our newsletter to receive news, promotions, and more.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <form className="sm:flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
