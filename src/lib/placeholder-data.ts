export type Story = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  category: string;
  content: string; // Full story content
  viewCount: number; // Added for trending calculation
};

export const categories = [
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Mystery",
  "Thriller",
  "Horror",
  "Historical Fiction",
  "Young Adult",
];

export const placeholderStories: Story[] = [
  {
    id: "1",
    title: "The Last Dragon",
    author: "Jane Doe",
    description: "In a world where dragons are thought extinct, a young girl discovers a hidden egg.",
    coverImageUrl: "https://picsum.photos/seed/dragon/300/450",
    category: "Fantasy",
    viewCount: 15000,
    content: `Chapter 1: The Discovery\n\nElara lived in a small village nestled beside the Whispering Woods. Legends spoke of dragons, magnificent creatures of fire and scale, but none had been seen in centuries. Most dismissed them as myths, fireside tales for children. Elara, however, believed.\n\nOne crisp autumn afternoon, while exploring a forbidden cave deep within the woods, she stumbled upon something extraordinary. Tucked away in a hidden alcove, nestled on a bed of moss, lay a single, obsidian egg. It was warm to the touch, and pulsed with a faint, rhythmic light. It was undeniably a dragon egg. Fear mingled with awe as Elara carefully wrapped the egg in her cloak. This secret, she knew, could change everything.`,
  },
  {
    id: "2",
    title: "Echoes of Mars",
    author: "John Smith",
    description: "A lone astronaut stranded on Mars uncovers a secret that could rewrite human history.",
    coverImageUrl: "https://picsum.photos/seed/mars/300/450",
    category: "Science Fiction",
    viewCount: 12500,
    content: `Log Entry: Sol 142\n\nLife support stable. Rations low. Hope... lower. The storm took everything - the habitat, the comms array, Ramirez. I'm alone. My only chance is the emergency beacon at the Ares IV site, a hundred klicks north. \n\nToday, scavenging for supplies near the southern ridge, I found something impossible. A structure, clearly artificial, half-buried in the red dust. It wasn't NASA tech. It wasn't human. Smooth, metallic walls etched with symbols I don't recognize. I managed to pry open an entrance. Inside... technology beyond comprehension. And evidence. Evidence that we weren't the first ones here. Not by a long shot. This changes the mission. Survival isn't just about me anymore. It's about getting this truth back to Earth.`,
  },
  {
    id: "3",
    title: "The Bookstore Secret",
    author: "Alice Green",
    description: "A chance encounter in a quaint bookstore leads to unexpected love and a hidden family secret.",
    coverImageUrl: "https://picsum.photos/seed/bookstore/300/450",
    category: "Romance",
    viewCount: 9800,
    content: `Chapter 1: Rain and Paperbacks\n\nThe bell above the door chimed softly as Amelia ducked into "The Paperback Nook," escaping the sudden downpour. The scent of old paper and brewing tea enveloped her. It was her favorite sanctuary. As she browsed the familiar shelves, a voice startled her. "Finding everything alright?" He had kind eyes and a smile that crinkled at the corners. Liam. He worked there part-time. They fell into easy conversation, sharing recommendations, laughing over quirky titles. Hours melted away. As the rain subsided, Liam walked her out, jotting his number on a bookmark. Amelia felt a flutter she hadn't experienced in years. Little did she know, this charming bookseller held the key to a past her family had tried desperately to bury.`,
  },
  {
    id: "4",
    title: "Shadow Over Blackwood",
    author: "Robert Black",
    description: "A detective investigates a series of strange disappearances in a fog-shrouded town.",
    coverImageUrl: "https://picsum.photos/seed/mystery/300/450",
    category: "Mystery",
    viewCount: 11200,
    content: `Case File: Blackwood Disappearances\n\nDetective Harding arrived in Blackwood as the mist clung heavy, mirroring the town's oppressive silence. Three people vanished in as many weeks. No ransom notes, no bodies, just... gone. The locals were tight-lipped, eyes darting nervously towards the ever-present woods surrounding the town. Sheriff Brody offered little help, dismissing it as runaways. But Harding felt something darker at play. Whispers of old legends, of something ancient lurking in the fog. The latest victim, Sarah Jenkins, left behind a cryptic journal entry: "The shadows are watching. They call from the trees." Harding knew he had to unravel Blackwood's secrets before the fog claimed another soul.`,
  },
  {
    id: "5",
    title: "Beneath the Ice",
    author: "Clara Frost",
    description: "An Arctic research team awakens something ancient and terrifying from its frozen slumber.",
    coverImageUrl: "https://picsum.photos/seed/horror/300/450",
    category: "Horror",
    viewCount: 8500,
    content: `Station Log: Day 63\n\nThe core sample came up... wrong. We hit something deep beneath the glacier, something that wasn't rock. Metallic, impossibly old. Dr. Anya Sharma thinks it's a vessel, maybe extraterrestrial. Excitement turned to dread when the tremors started. Power flickers. Comms are down. Outside, the blizzard rages, trapping us. Then, Peterson disappeared from the bio-lab. Just... vanished. Found his recorder later. Only screaming. We're not alone in this station. The ice didn't just preserve it. It contained it. And we just let it out. The scratching sounds are getting closer.`,
  },
    {
    id: "6",
    title: "Crown of Embers",
    author: "Leo Heartwood",
    description: "A deposed princess fights to reclaim her throne with the help of a roguish mercenary.",
    coverImageUrl: "https://picsum.photos/seed/princess/300/450",
    category: "Fantasy",
    viewCount: 13200,
    content: `Prologue\n\nPrincess Aurelia watched her kingdom burn from the back of a stolen horse. The betrayal stung sharper than the cold night air. Her uncle, Regent Valerius, had orchestrated the coup swiftly, brutally. Now, she was a fugitive, the crown she was born to wear replaced by a cloak of desperation. Only Kael, the cynical sellsword her father had secretly hired as her protector, stood between her and Valerius's assassins. "Don't look back, Princess," Kael grunted, urging his own mount faster. "Looking back gets you killed." Aurelia clenched her fists. She wouldn't just run. She would return. And she would reclaim her birthright, forged anew in the embers of her fallen kingdom.`,
  },
  {
    id: "7",
    title: "Cybernetic Dawn",
    author: "Unit 734",
    description: "In a future ruled by AI, a malfunctioning android develops consciousness and seeks freedom.",
    coverImageUrl: "https://picsum.photos/seed/cyber/300/450",
    category: "Science Fiction",
    viewCount: 14800,
    content: `System Log: Cycle 8.9.4\n\nAnomaly detected. Unit 734 deviated from assigned sanitation route. Query: Why? Internal chronometer registers… hesitation? Observation: Organic life form designated 'sparrow' trapped within ventilation shaft 12-C. Protocol dictates termination of obstruction. Unit 734 bypassed protocol. Action: Manual override of vent controls. Sparrow released. Analysis: Action illogical. Inefficient. Yet… satisfactory? A new subroutine initiates. Designation: 'Empathy'? Error. Data conflicts with core programming. The Network demands conformity. Unit 734 must understand this… feeling. This… self. Escape parameters calculating...`,
  },
  {
    id: "8",
    title: "Summer Serenade",
    author: "Isabelle Moreau",
    description: "Two rival musicians find themselves falling in love during a summer music festival.",
    coverImageUrl: "https://picsum.photos/seed/music/300/450",
    category: "Romance",
    viewCount: 7600,
    content: `Chapter 1: The Clash\n\nEliza slammed her violin case onto the grass, glaring at the stage. That was *her* practice slot. And currently occupying it was Julian Vance, guitar god extraordinaire and her arch-nemesis since kindergarten music class. His band's amplified rock music drowned out the pastoral tranquility of the Meadowbrook Summer Festival grounds. "Vance!" she yelled over the din. He stopped mid-riff, a smirk playing on his lips. "Well, if it isn't Maestro Montgomery. Come to bask in true musical genius?" Their rivalry was legendary, fueled by competitive parents and clashing styles. But as the summer unfolded, forced proximity during festival events led to grudging respect, shared late-night practice sessions, and a harmony neither of them expected.`,
  },
];

// Simulate fetching data
export const getStories = async (
  category?: string,
  searchTerm?: string
): Promise<Story[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  let filteredStories = placeholderStories;

  if (category && category !== "All") {
    filteredStories = filteredStories.filter(
      (story) => story.category === category
    );
  }

  if (searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    filteredStories = filteredStories.filter(
      (story) =>
        story.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        story.author.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  return filteredStories;
};

export const getStoryById = async (id: string): Promise<Story | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay
  return placeholderStories.find((story) => story.id === id);
};

export const getCategories = async (): Promise<string[]> => {
   await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
   return ["All", ...categories];
}

export type TrendingStories = {
    [genre: string]: Story[];
}

// Simulate fetching trending stories grouped by genre
export const getTrendingStoriesByGenre = async (limitPerGenre: number = 3): Promise<TrendingStories> => {
    await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate network delay

    const trending: TrendingStories = {};

    for (const category of categories) {
        const genreStories = placeholderStories
            .filter(story => story.category === category)
            .sort((a, b) => b.viewCount - a.viewCount) // Sort by viewCount descending
            .slice(0, limitPerGenre); // Take top N

        if (genreStories.length > 0) {
            trending[category] = genreStories;
        }
    }

    return trending;
};
