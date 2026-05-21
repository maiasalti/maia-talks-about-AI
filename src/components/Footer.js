import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2026 Maia Talks About AI. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link 
              href="/privacy-policy" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <a 
              href="mailto:maia.salti@gmail.com" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}