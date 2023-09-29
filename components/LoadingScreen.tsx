interface LoadingScreenProps {
  title: string;
}

export default function LoadingScreen({ title }: LoadingScreenProps) {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-300 text-gray-700 font-semibold text-4xl sm:text-5xl md:text-7xl lg:text-9xl">
      <h1>{title}</h1>
    </div>
  );
}
