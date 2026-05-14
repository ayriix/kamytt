const createRelease = (
  id: string,
  title: string,
  date: string,
  cover: string,
  links: {
    bandlink?: string;

    soundcloud?: {
      url: string;
      label?: string;
    }[];

    youtube?: {
      url: string;
      label?: string;
    }[];
  },

  upcoming = false,
) => ({
  id,
  title,
  date,
  cover,
  links,
  upcoming,
});

export const releases = [
  createRelease(
    "metamorphosis-4",
    "METAMORPHOSIS 4",
    "2025-03-15",
    "/covers/1.png",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/metamorphosis-4",
        },
      ],
      bandlink: "https://band.link/metamorphose4",
    },
  ),

  createRelease("veyzuu", "VEYZUU", "2025-04-11", "/covers/2.png", {
    bandlink: "https://band.link/veyzuu",
  }),

  createRelease("wokizoo", "WOKIZOO", "2025-04-30", "/covers/3.png", {
    bandlink: "https://band.link/wokizoo",
  }),

  createRelease("last-echo", "LAST ECHO", "2025-05-05", "/covers/4.png", {
    bandlink: "https://band.link/lastecho",
  }),

  createRelease("cooked", "COOKED", "2025-05-15", "/covers/5.png", {
    bandlink: "https://band.link/cooked",
  }),

  createRelease("crunch", "CRUNCH", "2025-06-01", "/covers/6.png", {
    bandlink: "https://band.link/crunchcrunch",
  }),

  createRelease("absence", "ABSENCE", "2025-06-06", "/covers/7.png", {
    bandlink: "https://band.link/absense",
  }),

  createRelease("glide", "GLIDE", "2025-07-08", "/covers/8.jpg", {
    bandlink: "https://band.link/gl1de",
  }),

  createRelease("solar", "SOLAR", "2025-08-01", "/covers/9.png", {
    soundcloud: [
      {
        url: "https://soundcloud.com/kamytt/solar",
      },
    ],
    bandlink: "https://band.link/solarr",
  }),

  createRelease("eclipse", "ECLIPSE", "2025-10-04", "/covers/10.png", {
    soundcloud: [
      {
        url: "https://soundcloud.com/kamytt/eclipse",
      },
    ],
    bandlink: "https://band.link/eclipsephonk",
  }),

  createRelease(
    "eclipse-slowed",
    "ECLIPSE (slowed)",
    "2025-11-07",
    "/covers/11.jpg",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/eclipse-slowed",
        },
      ],
      bandlink: "https://band.link/eclipseslowed",
    },
  ),

  createRelease("supremacy", "SUPREMACY", "2025-12-07", "/covers/12.png", {
    soundcloud: [
      {
        url: "https://soundcloud.com/kamytt/supremacy",
      },
      {
        url: "https://soundcloud.com/kamytt/supremacy-slowed",
        label: "SLOWED",
      },
    ],
    bandlink: "https://band.link/supremacy",
  }),

  createRelease(
    "peras-voando",
    "PERAS VOANDO",
    "2025-12-12",
    "/covers/13.png",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/peras-voando",
        },
        {
          url: "https://soundcloud.com/kamytt/peras-voando-slowed",
          label: "SLOWED",
        },
        {
          url: "https://soundcloud.com/kamytt/peras-voando-sped-up",
          label: "SPED UP",
        },
      ],

      bandlink: "https://band.link/perasvoando",

      youtube: [
        {
          url: "https://www.youtube.com/watch?v=eZ1aZxp0QnQ",
        },
        {
          url: "https://www.youtube.com/watch?v=oI9bQ89qYU4&pp=ygUGa2FteXR0",
          label: "SLOWED",
        },
        {
          url: "https://www.youtube.com/watch?v=FLN80TWNny0&pp=ygUGa2FteXR0",
          label: "SPED UP",
        },
      ],
    },
  ),

  createRelease("moondust", "moondust", "2025-12-19", "/covers/14.png", {
    soundcloud: [
      {
        url: "https://soundcloud.com/kamytt/moondust",
      },
    ],
    bandlink: "https://band.link/angelcoree",
    youtube: [
      {
        url: "https://www.youtube.com/watch?v=IyL1KIeYd5I",
      },
    ],
  }),

  createRelease("saint", "SAINT", "2025-12-30", "/covers/15.png", {
    soundcloud: [
      {
        url: "https://soundcloud.com/kamytt/saint",
      },
    ],
    bandlink: "https://band.link/02z6P",
    youtube: [
      {
        url: "https://www.youtube.com/watch?v=m8m-1imC3tc",
      },
    ],
  }),

  createRelease(
    "weakened-hoodtrap",
    "WEAKENED (hoodtrap)",
    "2026-01-09",
    "/covers/16.png",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/weakened",
        },
      ],
      bandlink: "https://band.link/jzkS0",
      youtube: [
        {
          url: "https://www.youtube.com/watch?v=9GUCmntNsZs",
        },
      ],
    },
  ),

  createRelease("peso-morto", "PESO MORTO", "2026-02-13", "/covers/17.jpg", {
    soundcloud: [
      {
        url: "https://soundcloud.com/kamytt/peso-morto",
      },
      {
        url: "https://soundcloud.com/kamytt/peso-morto-slowed",
        label: "SLOWED",
      },
    ],
    bandlink: "https://band.link/pesomorto",
    youtube: [
      {
        url: "https://www.youtube.com/watch?v=EQ9zwxmUTno",
      },
      {
        url: "https://www.youtube.com/watch?v=ERFc5Al2zGY",
        label: "SLOWED",
      },
    ],
  }),

  createRelease("sugarjump", "SUGARJUMP!", "2026-03-13", "/covers/18.jpg", {
    soundcloud: [
      {
        url: "https://soundcloud.com/kamytt/sugarjump",
      },
      {
        url: "https://soundcloud.com/kamytt/sugarjump-slowed",
        label: "SLOWED",
      },
    ],
    bandlink: "https://band.link/sugarjump",
    youtube: [
      {
        url: "https://www.youtube.com/watch?v=NhugV5rLVjg",
      },
      {
        url: "https://www.youtube.com/watch?v=Zc4hu07ef38",
        label: "SLOWED",
      },
    ],
  }),

  createRelease("young-winds", "YOUNG WINDS", "2026-05-01", "/covers/19.jpg", {
    soundcloud: [
      {
        url: "https://soundcloud.com/kamytt/youngwinds",
      },
    ],
    bandlink: "https://band.link/youngwinds",
    youtube: [
      {
        url: "https://www.youtube.com/watch?v=wfPx60yQKr0",
      },
    ],
  }),
  createRelease("upcoming", "UPCOMING RELEASE", "2026-**-**", "", {}, true),
];
