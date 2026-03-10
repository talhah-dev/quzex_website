import HomePage from "./(pages)/home/page";

type HomeProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <HomePage searchParams={searchParams} />
    </>
  );
}
