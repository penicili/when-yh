import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
export default function NotFound() {
  // Set page title
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  useEffect(() => {
    setTitle("Page Not Found");
  }, [setTitle]);
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-6 py-16">
      <div className="w-full rounded-3xl border border-primary/15 bg-white/90 p-10 text-center shadow-xl shadow-primary/10 backdrop-blur">
        <h1 className="text-6xl font-extrabold tracking-tight text-primary">
          404
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-accent px-5 py-3 font-semibold text-primary transition-colors hover:bg-accent-warm hover:text-white"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
