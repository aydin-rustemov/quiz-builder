import Link from 'next/link';
import { FaPlus, FaList } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/quizzes" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
              QuizBuilder
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/quizzes" className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <FaList />
                All Quizzes
              </Link>
              <Link href="/quizzes/create" className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <FaPlus />
                Create Quiz
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
             <Link href="/create" className="text-blue-600 p-2 rounded-md hover:bg-gray-100">
                <FaPlus size={20} />
             </Link>
          </div>

        </div>
      </nav>
    </header>
  );
};
