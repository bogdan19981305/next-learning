import Link from "next/link";

const ErrorPage = ({ searchParams }: { searchParams: { message: string } }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg text-center max-w-2xl text-red-500 mb-4">
        {searchParams?.message || "You must be logged in to access this page"}
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
