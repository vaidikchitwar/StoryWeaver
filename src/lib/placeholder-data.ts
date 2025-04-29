export type Story = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  category: string;
  content: string; // Full story content
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
    content: `Chapter 1: The Discovery\n\nElara lived in a small village nestled beside the Whispering Woods. Legends spoke of dragons, magnificent creatures of fire and scale, but none had been seen in centuries. Most dismissed them as myths, fireside tales for children. Elara, however, believed.\n\nOne crisp autumn afternoon, while exploring a forbidden cave deep within the woods, she stumbled upon something extraordinary. Tucked away in a hidden alcove, nestled on a bed of moss, lay a single, obsidian egg. It was warm to the touch, and pulsed with a faint, rhythmic light. It was undeniably a dragon egg. Fear mingled with awe as Elara carefully wrapped the egg in her cloak. This secret, she knew, could change everything.`,
  },
  {
    id: "2",
    title: "Echoes of Mars",
    author: "John Smith",
    description: "A lone astronaut stranded on Mars uncovers a secret that could rewrite human history.",
    coverImageUrl: "https://picsum.photos/seed/mars/300/450",
    category: "Science Fiction",
    content: `Log Entry: Sol 142\n\nLife support stable. Rations low. Hope... lower. The storm took everything - the habitat, the comms array, Ramirez. I'm alone. My only chance is the emergency beacon at the Ares IV site, a hundred klicks north. \n\nToday, scavenging for supplies near the southern ridge, I found something impossible. A structure, clearly artificial, half-buried in the red dust. It wasn't NASA tech. It wasn't human. Smooth, metallic walls etched with symbols I don't recognize. I managed to pry open an entrance. Inside... technology beyond comprehension. And evidence. Evidence that we weren't the first ones here. Not by a long shot. This changes the mission. Survival isn't just about me anymore. It's about getting this truth back to Earth.`,
  },
  {
    id: "3",
    title: "The Bookstore Secret",
    author: "Alice Green",
    description: "A chance encounter in a quaint bookstore leads to unexpected love and a hidden family secret.",
    coverImageUrl: "https://picsum.photos/seed/bookstore/300/450",
    category: "Romance",
    content: `Chapter 1: Rain and Paperbacks\n\nThe bell above the door chimed softly as Amelia ducked into "The Paperback Nook," escaping the sudden downpour. The scent of old paper and brewing tea enveloped her. It was her favorite sanctuary. As she browsed the familiar shelves, a voice startled her. "Finding everything alright?" He had kind eyes and a smile that crinkled at the corners. Liam. He worked there part-time. They fell into easy conversation, sharing recommendations, laughing over quirky titles. Hours melted away. As the rain subsided, Liam walked her out, jotting his number on a bookmark. Amelia felt a flutter she hadn't experienced in years. Little did she know, this charming bookseller held the key to a past her family had tried desperately to bury.`,
  },
  {
    id: "4",
    title: "Shadow Over Blackwood",
    author: "Robert Black",
    description: "A detective investigates a series of strange disappearances in a fog-shrouded town.",
    coverImageUrl: "https://picsum.photos/seed/mystery/300/450",
    category: "Mystery",
    content: `Case File: Blackwood Disappearances\n\nDetective Harding arrived in Blackwood as the mist clung heavy, mirroring the town's oppressive silence. Three people vanished in as many weeks. No ransom notes, no bodies, just... gone. The locals were tight-lipped, eyes darting nervously towards the ever-present woods surrounding the town. Sheriff Brody offered little help, dismissing it as runaways. But Harding felt something darker at play. Whispers of old legends, of something ancient lurking in the fog. The latest victim, Sarah Jenkins, left behind a cryptic journal entry: "The shadows are watching. They call from the trees." Harding knew he had to unravel Blackwood's secrets before the fog claimed another soul.`,
  },
  {
    id: "5",
    title: "Beneath the Ice",
    author: "Clara Frost",
    description: "An Arctic research team awakens something ancient and terrifying from its frozen slumber.",
    coverImageUrl: "https://picsum.photos/seed/horror/300/450",
    category: "Horror",
    content: `Station Log: Day 63\n\nThe core sample came up... wrong. We hit something deep beneath the glacier, something that wasn't rock. Metallic, impossibly old. Dr. Anya Sharma thinks it's a vessel, maybe extraterrestrial. Excitement turned to dread when the tremors started. Power flickers. Comms are down. Outside, the blizzard rages, trapping us. Then, Peterson disappeared from the bio-lab. Just... vanished. Found his recorder later. Only screaming. We're not alone in this station. The ice didn't just preserve it. It contained it. And we just let it out. The scratching sounds are getting closer.`,
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
