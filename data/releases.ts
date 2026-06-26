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

  preview?: {
    file: string;
    start: number;
    duration: number;
  },
) => {
  const releaseDate = new Date(`${date}T07:00:00`);
  const now = new Date();

  const isReleased = releaseDate <= now;

  return {
    id,
    title,
    date,

    cover: isReleased ? cover : "",
    links: isReleased ? links : {},
    preview: isReleased ? preview : undefined,

    upcoming: !isReleased,
  };
};

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
    {
      file: "/audios/metamorphosis.flac",
      start: 85.7,
      duration: 30,
    },
  ),

  createRelease(
    "veyzuu",
    "VEYZUU",
    "2025-04-11",
    "/covers/2.png",
    {
      bandlink: "https://band.link/veyzuu",
    },
    {
      file: "/audios/veyzuu.mp3",
      start: 105.6,
      duration: 30,
    },
  ),

  createRelease(
    "wokizoo",
    "WOKIZOO",
    "2025-04-30",
    "/covers/3.png",
    {
      bandlink: "https://band.link/wokizoo",
    },
    {
      file: "/audios/wokizoo.mp3",
      start: 57.5,
      duration: 30,
    },
  ),

  createRelease(
    "last-echo",
    "LAST ECHO",
    "2025-05-05",
    "/covers/4.png",
    {
      bandlink: "https://band.link/lastecho",
    },
    {
      file: "/audios/lastecho.mp3",
      start: 70.6,
      duration: 30,
    },
  ),

  createRelease(
    "cooked",
    "COOKED",
    "2025-05-15",
    "/covers/5.png",
    {
      bandlink: "https://band.link/cooked",
    },
    {
      file: "/audios/cooked.mp3",
      start: 58.8,
      duration: 30,
    },
  ),

  createRelease(
    "crunch",
    "CRUNCH",
    "2025-06-01",
    "/covers/6.png",
    {
      bandlink: "https://band.link/crunchcrunch",
    },
    {
      file: "/audios/crunch.mp3",
      start: 46.7,
      duration: 30,
    },
  ),

  createRelease(
    "absence",
    "ABSENCE",
    "2025-06-06",
    "/covers/7.png",
    {
      bandlink: "https://band.link/absense",
    },
    {
      file: "/audios/absence.mp3",
      start: 94.3,
      duration: 30,
    },
  ),

  createRelease(
    "glide",
    "GLIDE",
    "2025-07-08",
    "/covers/8.jpg",
    {
      bandlink: "https://band.link/gl1de",
    },
    {
      file: "/audios/glide.mp3",
      start: 50.6,
      duration: 30,
    },
  ),

  createRelease(
    "solar",
    "SOLAR",
    "2025-08-01",
    "/covers/9.png",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/solar",
        },
      ],
      bandlink: "https://band.link/solarr",
    },
    {
      file: "/audios/solar.mp3",
      start: 43.4,
      duration: 30,
    },
  ),

  createRelease(
    "eclipse",
    "ECLIPSE",
    "2025-10-04",
    "/covers/10.png",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/eclipse",
        },
      ],
      bandlink: "https://band.link/eclipsephonk",
    },
    {
      file: "/audios/eclipse.mp3",
      start: 72.3,
      duration: 30,
    },
  ),

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
    {
      file: "/audios/eclipse-slowed.wav",
      start: 90.3,
      duration: 30,
    },
  ),

  createRelease(
    "supremacy",
    "SUPREMACY",
    "2025-12-07",
    "/covers/12.png",
    {
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
    },
    {
      file: "/audios/supremacy.wav",
      start: 59,
      duration: 30,
    },
  ),

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
    {
      file: "/audios/perasvoando.wav",
      start: 57.4,
      duration: 30,
    },
  ),

  createRelease(
    "moondust",
    "moondust",
    "2025-12-19",
    "/covers/14.png",
    {
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
    },
    {
      file: "/audios/moondust.wav",
      start: 74.3,
      duration: 30,
    },
  ),

  createRelease(
    "saint",
    "SAINT",
    "2025-12-30",
    "/covers/15.png",
    {
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
    },
    {
      file: "/audios/saint.wav",
      start: 78.2,
      duration: 30,
    },
  ),

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
    {
      file: "/audios/wh.wav",
      start: 59.3,
      duration: 30,
    },
  ),

  createRelease(
    "peso-morto",
    "PESO MORTO",
    "2026-02-13",
    "/covers/17.jpg",
    {
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
    },
    {
      file: "/audios/pm.wav",
      start: 55,
      duration: 30,
    },
  ),

  createRelease(
    "sugarjump",
    "SUGARJUMP!",
    "2026-03-13",
    "/covers/18.jpg",
    {
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
    },
    {
      file: "/audios/sugarjump.wav",
      start: 46,
      duration: 30,
    },
  ),

  createRelease(
    "young-winds",
    "YOUNG WINDS",
    "2026-05-01",
    "/covers/19.jpg",
    {
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
    },
    {
      file: "/audios/yw.wav",
      start: 69.3,
      duration: 30,
    },
  ),
  createRelease(
    "saint-slowed",
    "SAINT (Slowed)",
    "2026-06-12",
    "/covers/20.jpg",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/saintslowed",
        },
      ],
      bandlink: "https://band.link/saintslowed",
      youtube: [
        {
          url: "https://www.youtube.com/watch?v=AkAjfva_pgM&pp=ygUGa2FteXR0",
        },
      ],
    },
    {
      file: "/audios/saint-slowed.wav",
      start: 98.4,
      duration: 30,
    },
  ),
  createRelease(
    "limerence",
    "LIMERENCE",
    "2026-06-26",
    "/covers/21.jpg",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/limerence",
        },
      ],

      bandlink: "https://band.link/limerence",

      youtube: [
        {
          url: "https://www.youtube.com/watch?v=Fow6eJdOdh0",
        },
      ],
    },
    {
      file: "/audios/limerence.wav",
      start: 81.3,
      duration: 30,
    },
  ),
  createRelease(
    "banka-parilka",
    "БАНЬКА ПАРИЛКА (HARDTEKK)",
    "2026-07-10",
    "/covers/22.jpg",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/bankaparilka",
        },
        {
          url: "https://soundcloud.com/kamytt/bankaparilkaslowed",
          label: "SLOWED",
        },
      ],
      bandlink: "https://band.link/bankaparilka",
      youtube: [
        {
          url: "https://www.youtube.com/...",
        },
        {
          url: "https://www.youtube.com/...",
          label: "SLOWED",
        },
      ],
    },
    {
      file: "/audios/bankaparilka.wav",
      start: 44.8,
      duration: 30,
    },
  ),
  createRelease(
    "clowntekk",
    "CLOWNTEKK",
    "2026-07-17",
    "/covers/23.jpg",
    {
      soundcloud: [
        {
          url: "https://soundcloud.com/kamytt/clowntekk",
        },
        {
          url: "https://soundcloud.com/kamytt/clowntekk-slowed",
          label: "SLOWED",
        },
      ],
      bandlink: "https://band.link/clowntekk",
      youtube: [
        {
          url: "https://www.youtube.com/...",
        },
        {
          url: "https://www.youtube.com/...",
          label: "SLOWED",
        },
      ],
    },
    {
      file: "/audios/clowntekk.wav",
      start: 24,
      duration: 30,
    },
  ),
];

export type Release = ReturnType<typeof createRelease>;
