export const SkeletonLoader = () => (
  <div className="relative z-10 min-h-screen bg-transparent flex flex-col text-white overflow-hidden">
    {/* Navigation */}
    <header className="flex justify-center pt-10 sm:pt-12">
      <nav className="flex items-center gap-10 sm:gap-16">
        <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
      </nav>
    </header>

    {/* Main Hero Content */}
    <main
      className="
        flex-1
        flex flex-col lg:flex-row
        items-center
        justify-center
        px-6 sm:px-12 lg:px-24
        py-12 lg:py-0
        gap-12 lg:gap-0
      "
    >
      {/* Left */}
      <div
        className="
          lg:flex-1
          flex flex-col
          justify-center
          items-center lg:items-start
          w-full
        "
      >
        <div className="w-full max-w-lg flex justify-center lg:justify-start">
          <div
            className="
              h-12 sm:h-14 lg:h-16
              w-60 sm:w-96 lg:w-104
              bg-white/10
              rounded
              animate-pulse
              mb-8
            "
          />
        </div>

        <div
          className="
            h-3
            w-64 sm:w-64
            bg-white/10
            rounded
            animate-pulse
            mb-10 lg:mb-12
          "
        />

        <div
          className="
            h-12
            w-44
            border border-white/10
            rounded
            animate-pulse
          "
        />
      </div>

      {/* Right */}
      <div
        className="
          w-full
          lg:w-80 xl:w-92
          flex flex-col
          justify-center
          items-center lg:items-start
        "
      >
        <div
          className="
    h-3
    w-40
    bg-white/10
    rounded
    animate-pulse
    mb-2 lg:mb-8

    mx-auto lg:mx-0
    lg:self-start
  "
        />

        <div className="space-y-3 lg:space-y-6 w-full max-w-sm mx-auto lg:mx-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                w-full
                p-4 pl-2
                rounded-lg
              "
            >
              <div className="space-y-3">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />

                  <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />

                  <div className="flex items-center gap-3">
                    {[1, 2].map((j) => (
                      <div
                        key={j}
                        className="
                          h-5 w-5
                          rounded-full
                          bg-white/10
                          animate-pulse
                        "
                      />
                    ))}

                    <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>

    {/* Arrow */}
    <div className="hidden lg:flex justify-center pb-12">
      <div
        className="
          w-12 h-12
          rounded-full
          border border-white/10
          animate-pulse
        "
      />
    </div>
  </div>
);
