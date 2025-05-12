import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 mt-6">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <Link href="#">
              <a className="text-neutral-500 hover:text-neutral-700">About</a>
            </Link>
            <Link href="#">
              <a className="text-neutral-500 hover:text-neutral-700">Privacy</a>
            </Link>
            <Link href="#">
              <a className="text-neutral-500 hover:text-neutral-700">Terms</a>
            </Link>
            <Link href="#">
              <a className="text-neutral-500 hover:text-neutral-700">Help</a>
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-center text-sm text-neutral-500">&copy; {new Date().getFullYear()} SynapseNet. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
