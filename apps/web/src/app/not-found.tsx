export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-white/20 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-8">
        {/* Logo/Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            VIBE
          </span>
          <span className="text-white"> CODING </span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AWARD
          </span>
        </h1>

        {/* 404 Message */}
        <div className="text-xl md:text-2xl text-white/80 mb-8 font-light">
          Page not found
        </div>

        {/* Back to Home */}
        <a 
          href="/" 
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium"
        >
          Back to Home
        </a>
      </div>

      {/* Coming Soon */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white/60 text-sm md:text-base tracking-widest uppercase">
          Coming Soon
        </div>
      </div>
    </div>
  );
} 