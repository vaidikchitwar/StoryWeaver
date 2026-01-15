import { getStoryById } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { StoryViewer } from '@/components/story-viewer';


interface StoryPageProps {
  params: {
    id: string;
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getStoryById(params.id);

  if (!story) {
    notFound();
  }

  return <StoryViewer story={story} />;
}


// Ensure globals.css has readable font styles
// Apply prose-darkest for darkest theme compatibility
