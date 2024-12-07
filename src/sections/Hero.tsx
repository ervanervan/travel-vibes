export default function Hero() {
  return (
    <section>
      <div className="relative">
        <div className="bg-hero-pattern bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/70 via-transparent to-white/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-transparent to-white/10"></div>
          <div className="container mx-auto px-4 md:px-6 py-20 relative z-10">
            <div className="flex flex-col text-center md:text-start justify-center h-[70dvh] mt-20">
              <div className="w-full md:w-[40rem]">
                <h1 className="text-5xl md:text-7xl font-lora font-bold text-white">
                  Your Travel Inspiration Starts Here
                </h1>
                <p className="mt-4 w-full md:w-[34rem] text-white/90">
                  Find the best travel destinations based on curated articles,
                  authentic comments, and personalized categories. Let Travel
                  Vibes inspire your journey.
                </p>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8">
                  <button className="flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white/90 bg-gray-950 hover:bg-gray-950/9 transition-all duration-300 ease-in-out">
                    Explore Destinations
                  </button>
                  <button className="flex justify-center py-3 px-6 border border-gray-950 rounded-md shadow-sm text-sm font-medium text-gray-950 bg-white/90 hover:bg-white/100 transition-all duration-300 ease-in-out">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
