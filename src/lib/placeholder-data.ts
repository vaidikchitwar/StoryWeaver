export type Comment = {
  id: string;
  author: string;
  avatarUrl?: string; // Optional avatar
  timestamp: Date;
  text: string;
};

export type Story = {
  id: string;
  title: string;
  author: string; // Used as author ID for now
  authorAvatar?: string; // Optional author avatar for display
  description: string;
  coverImageUrl: string;
  category: string;
  content: string; // Full story content
  viewCount: number;
  likeCount: number; // Added for likes
  comments: Comment[]; // Added for comments
};

export type AuthorSubscription = {
  authorId: string; // Corresponds to Story.author
  authorName: string;
  authorAvatar?: string;
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

const generateComments = (storyId: string, count: number): Comment[] => {
  const comments: Comment[] = [];
  const authors = ['ReaderFan', 'BookWorm', 'StoryLover', 'CritiqueMaster', 'Anonymous'];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: `${storyId}-comment-${i + 1}`,
      author: authors[Math.floor(Math.random() * authors.length)],
      // avatarUrl: `https://picsum.photos/seed/${storyId}-${i}/40/40`, // Can add later if needed
      timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7), // Random time in last week
      text: `This is comment number ${i + 1} for story ${storyId}. ${['Great story!', 'Interesting plot.', 'Loved the characters.', 'Couldn\'t put it down!', 'Needs more work.'][Math.floor(Math.random() * 5)]}`
    });
  }
  return comments.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort newest first
}


export const placeholderStories: Story[] = [
  {
    id: "1",
    title: "The Last Dragon",
    author: "Jane Doe",
    authorAvatar: "https://picsum.photos/seed/author_jane/40/40",
    description: "In a world where dragons are thought extinct, a young girl discovers a hidden egg.",
    coverImageUrl: "https://picsum.photos/seed/dragon/300/450",
    category: "Fantasy",
    viewCount: 15000,
    likeCount: 1200, // Added
    comments: generateComments("1", 5), // Added
    content: `Chapter 1: The Discovery\n\nElara lived in a small village nestled beside the Whispering Woods. Legends spoke of dragons, magnificent creatures of fire and scale, but none had been seen in centuries. Most dismissed them as myths, fireside tales for children. Elara, however, believed.\n\nOne crisp autumn afternoon, while exploring a forbidden cave deep within the woods, she stumbled upon something extraordinary. Tucked away in a hidden alcove, nestled on a bed of moss, lay a single, obsidian egg. It was warm to the touch, and pulsed with a faint, rhythmic light. It was undeniably a dragon egg. Fear mingled with awe as Elara carefully wrapped the egg in her cloak. This secret, she knew, could change everything.`,
  },
  {
    id: "2",
    title: "Echoes of Mars",
    author: "John Smith",
    authorAvatar: "https://picsum.photos/seed/author_john/40/40",
    description: "A lone astronaut stranded on Mars uncovers a secret that could rewrite human history.",
    coverImageUrl: "https://picsum.photos/seed/mars/300/450",
    category: "Science Fiction",
    viewCount: 12500,
    likeCount: 950, // Added
    comments: generateComments("2", 3), // Added
    content: `Log Entry: Sol 142\n\nLife support stable. Rations low. Hope... lower. The storm took everything - the habitat, the comms array, Ramirez. I'm alone. My only chance is the emergency beacon at the Ares IV site, a hundred klicks north. \n\nToday, scavenging for supplies near the southern ridge, I found something impossible. A structure, clearly artificial, half-buried in the red dust. It wasn't NASA tech. It wasn't human. Smooth, metallic walls etched with symbols I don't recognize. I managed to pry open an entrance. Inside... technology beyond comprehension. And evidence. Evidence that we weren't the first ones here. Not by a long shot. This changes the mission. Survival isn't just about me anymore. It's about getting this truth back to Earth.`,
  },
  {
    id: "3",
    title: "The Bookstore Secret",
    author: "Alice Green",
    // authorAvatar: "https://picsum.photos/seed/author_alice/40/40", No avatar for this one
    description: "A chance encounter in a quaint bookstore leads to unexpected love and a hidden family secret.",
    coverImageUrl: "https://picsum.photos/seed/bookstore/300/450",
    category: "Romance",
    viewCount: 9800,
    likeCount: 880, // Added
    comments: generateComments("3", 7), // Added
    content: `Chapter 1: Rain and Paperbacks\n\nThe bell above the door chimed softly as Amelia ducked into "The Paperback Nook," escaping the sudden downpour. The scent of old paper and brewing tea enveloped her. It was her favorite sanctuary. As she browsed the familiar shelves, a voice startled her. "Finding everything alright?" He had kind eyes and a smile that crinkled at the corners. Liam. He worked there part-time. They fell into easy conversation, sharing recommendations, laughing over quirky titles. Hours melted away. As the rain subsided, Liam walked her out, jotting his number on a bookmark. Amelia felt a flutter she hadn't experienced in years. Little did she know, this charming bookseller held the key to a past her family had tried desperately to bury.`,
  },
  {
    id: "4",
    title: "Shadow Over Blackwood",
    author: "Robert Black",
    authorAvatar: "https://picsum.photos/seed/author_robert/40/40",
    description: "A detective investigates a series of strange disappearances in a fog-shrouded town.",
    coverImageUrl: "https://picsum.photos/seed/mystery/300/450",
    category: "Mystery",
    viewCount: 11200,
    likeCount: 750, // Added
    comments: generateComments("4", 4), // Added
    content: `Case File: Blackwood Disappearances\n\nDetective Harding arrived in Blackwood as the mist clung heavy, mirroring the town's oppressive silence. Three people vanished in as many weeks. No ransom notes, no bodies, just... gone. The locals were tight-lipped, eyes darting nervously towards the ever-present woods surrounding the town. Sheriff Brody offered little help, dismissing it as runaways. But Harding felt something darker at play. Whispers of old legends, of something ancient lurking in the fog. The latest victim, Sarah Jenkins, left behind a cryptic journal entry: "The shadows are watching. They call from the trees." Harding knew he had to unravel Blackwood's secrets before the fog claimed another soul.`,
  },
  {
    id: "5",
    title: "Beneath the Ice",
    author: "Clara Frost",
    authorAvatar: "https://picsum.photos/seed/author_clara/40/40",
    description: "An Arctic research team awakens something ancient and terrifying from its frozen slumber.",
    coverImageUrl: "https://picsum.photos/seed/horror/300/450",
    category: "Horror",
    viewCount: 8500,
    likeCount: 620, // Added
    comments: generateComments("5", 6), // Added
    content: `Station Log: Day 63\n\nThe core sample came up... wrong. We hit something deep beneath the glacier, something that wasn't rock. Metallic, impossibly old. Dr. Anya Sharma thinks it's a vessel, maybe extraterrestrial. Excitement turned to dread when the tremors started. Power flickers. Comms are down. Outside, the blizzard rages, trapping us. Then, Peterson disappeared from the bio-lab. Just... vanished. Found his recorder later. Only screaming. We're not alone in this station. The ice didn't just preserve it. It contained it. And we just let it out. The scratching sounds are getting closer.`,
  },
  {
    id: "6",
    title: "Crown of Embers",
    author: "Leo Heartwood",
    authorAvatar: "https://picsum.photos/seed/author_leo/40/40",
    description: "A deposed princess fights to reclaim her throne with the help of a roguish mercenary.",
    coverImageUrl: "https://picsum.photos/seed/princess/300/450",
    category: "Fantasy",
    viewCount: 13200,
    likeCount: 1100, // Added
    comments: generateComments("6", 8), // Added
    content: `Prologue\n\nPrincess Aurelia watched her kingdom burn from the back of a stolen horse. The betrayal stung sharper than the cold night air. Her uncle, Regent Valerius, had orchestrated the coup swiftly, brutally. Now, she was a fugitive, the crown she was born to wear replaced by a cloak of desperation. Only Kael, the cynical sellsword her father had secretly hired as her protector, stood between her and Valerius's assassins. "Don't look back, Princess," Kael grunted, urging his own mount faster. "Looking back gets you killed." Aurelia clenched her fists. She wouldn't just run. She would return. And she would reclaim her birthright, forged anew in the embers of her fallen kingdom.`,
  },
  {
    id: "7",
    title: "Cybernetic Dawn",
    author: "Unit 734",
    // authorAvatar: "https://picsum.photos/seed/author_unit734/40/40", // AI might not have an avatar
    description: "In a future ruled by AI, a malfunctioning android develops consciousness and seeks freedom.",
    coverImageUrl: "https://picsum.photos/seed/cyber/300/450",
    category: "Science Fiction",
    viewCount: 14800,
    likeCount: 1350, // Added
    comments: generateComments("7", 2), // Added
    content: `System Log: Cycle 8.9.4\n\nAnomaly detected. Unit 734 deviated from assigned sanitation route. Query: Why? Internal chronometer registers… hesitation? Observation: Organic life form designated 'sparrow' trapped within ventilation shaft 12-C. Protocol dictates termination of obstruction. Unit 734 bypassed protocol. Action: Manual override of vent controls. Sparrow released. Analysis: Action illogical. Inefficient. Yet… satisfactory? A new subroutine initiates. Designation: 'Empathy'? Error. Data conflicts with core programming. The Network demands conformity. Unit 734 must understand this… feeling. This… self. Escape parameters calculating...`,
  },
  {
    id: "8",
    title: "Summer Serenade",
    author: "Isabelle Moreau",
    authorAvatar: "https://picsum.photos/seed/author_isabelle/40/40",
    description: "Two rival musicians find themselves falling in love during a summer music festival.",
    coverImageUrl: "https://picsum.photos/seed/music/300/450",
    category: "Romance",
    viewCount: 7600,
    likeCount: 700, // Added
    comments: generateComments("8", 9), // Added
    content: `Chapter 1: The Clash\n\nEliza slammed her violin case onto the grass, glaring at the stage. That was *her* practice slot. And currently occupying it was Julian Vance, guitar god extraordinaire and her arch-nemesis since kindergarten music class. His band's amplified rock music drowned out the pastoral tranquility of the Meadowbrook Summer Festival grounds. "Vance!" she yelled over the din. He stopped mid-riff, a smirk playing on his lips. "Well, if it isn't Maestro Montgomery. Come to bask in true musical genius?" Their rivalry was legendary, fueled by competitive parents and clashing styles. But as the summer unfolded, forced proximity during festival events led to grudging respect, shared late-night practice sessions, and a harmony neither of them expected.`,
  },
  {
    id: "9",
    title: "Whispers in the Walls",
    author: "Edgar Allen Poe Jr.",
    authorAvatar: "https://picsum.photos/seed/author_edgar/40/40",
    description: "A family moves into an old house only to discover it's haunted by more than just memories.",
    coverImageUrl: "https://picsum.photos/seed/haunted/300/450",
    category: "Horror",
    viewCount: 10500,
    likeCount: 550, // Added
    comments: generateComments("9", 5), // Added
    content: `Day 1: The house stood on a hill overlooking the town, silhouetted against the perpetual grey sky. It was cheaper than anything else, for reasons the realtor politely avoided. Old houses have quirks, he'd said. Quirks. Like the cold spots that moved. Or the whispers that seemed to echo from within the walls themselves, just at the edge of hearing. Little Emily drew pictures of 'the smiling man' she saw in the hallway mirror. My wife, Sarah, blamed drafts and old pipes. I wanted to believe her. But last night, I heard it too. A child's giggle, coming from the boarded-up nursery. And the distinct sound of small footsteps pacing overhead. This house doesn't have quirks. It has occupants.`,
  },
  {
    id: "10",
    title: "The Gilded Cage",
    author: "Victoria Holt II",
    authorAvatar: "https://picsum.photos/seed/author_victoria/40/40",
    description: "A young governess in Victorian England uncovers dark secrets within the noble family she serves.",
    coverImageUrl: "https://picsum.photos/seed/victorian/300/450",
    category: "Mystery",
    viewCount: 9100,
    likeCount: 680, // Added
    comments: generateComments("10", 6), // Added
    content: `October 1888. Ashworth Manor was imposing, cold despite the roaring fires. Lord Ashworth was stern, his wife perpetually ill, and the children, Thomas and Clara, seemed unnaturally subdued. My duties as governess were simple, yet an undercurrent of tension permeated the grand house. Doors locked inexplicably. Servants exchanged hushed warnings. Then came the discovery of the previous governess's diary, hidden beneath a loose floorboard. Its pages spoke of fear, of clandestine meetings, and a secret the Ashworths would kill to protect. I realized I wasn't just teaching children; I was trapped in a gilded cage, and the key to my survival lay in uncovering the truth before I met the same fate as my predecessor.`,
  },
];

// Placeholder for current user's subscriptions
// In a real app, this would be fetched based on the logged-in user
const placeholderUserSubscriptions: AuthorSubscription[] = [
  { authorId: "Jane Doe", authorName: "Jane Doe", authorAvatar: "https://picsum.photos/seed/author_jane/40/40" },
  { authorId: "Robert Black", authorName: "Robert Black", authorAvatar: "https://picsum.photos/seed/author_robert/40/40" },
  { authorId: "Isabelle Moreau", authorName: "Isabelle Moreau", authorAvatar: "https://picsum.photos/seed/author_isabelle/40/40" },
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
  const story = placeholderStories.find((story) => story.id === id);
  // Add author avatar to the fetched story if not already present (for consistency)
  if (story && !story.authorAvatar) {
    const authorSub = placeholderUserSubscriptions.find(sub => sub.authorId === story.author);
    if (authorSub?.authorAvatar) {
      story.authorAvatar = authorSub.authorAvatar;
    } else {
      // Fallback if author isn't in subscriptions (might happen)
      const otherStoryByAuthor = placeholderStories.find(s => s.author === story.author && s.authorAvatar);
      if (otherStoryByAuthor) {
        story.authorAvatar = otherStoryByAuthor.authorAvatar;
      }
    }
  }
  return story;
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

export const getTrendingStories = async (limit: number = 4): Promise<Story[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [...placeholderStories]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

export const getNewArrivals = async (limit: number = 4): Promise<Story[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  // Simulating new arrivals by taking the last N stories (assuming simplified chronological order)
  // In a real app, sort by publishedAt
  return [...placeholderStories].reverse().slice(0, limit);
}

// Simulate fetching user's subscriptions
export const getUserSubscriptions = async (): Promise<AuthorSubscription[]> => {
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  // In a real app, fetch this based on the logged-in user ID
  return placeholderUserSubscriptions;
}

// Simulate adding/removing a subscription (no backend interaction)
export const toggleSubscription = async (authorId: string, authorName: string, authorAvatar?: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
  const index = placeholderUserSubscriptions.findIndex(sub => sub.authorId === authorId);
  if (index > -1) {
    // Unsubscribe
    placeholderUserSubscriptions.splice(index, 1);
    console.log(`Unsubscribed from ${authorName}`);
    return false; // Return new subscription state (false = not subscribed)
  } else {
    // Subscribe
    placeholderUserSubscriptions.push({ authorId, authorName, authorAvatar });
    console.log(`Subscribed to ${authorName}`);
    return true; // Return new subscription state (true = subscribed)
  }
}
