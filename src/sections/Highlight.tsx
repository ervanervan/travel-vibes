import { Book, Folder, Message } from "iconoir-react";

export default function Highlight() {
  return (
    <section>
      <div className="container mx-auto p-4 md:px-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <div className="text-yellow-500 text-6xl mb-4">
              <Book width={60} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">10,000+</h3>
            <p className="text-gray-600">Articles</p>
          </div>

          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <div className="text-blue-500 text-6xl mb-4">
              <Message width={60} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">5,000+</h3>
            <p className="text-gray-600">Comments</p>
          </div>

          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <div className="text-green-500 text-6xl mb-4">
              <Folder width={60} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">100+</h3>
            <p className="text-gray-600">Categories</p>
          </div>
        </div>
      </div>
    </section>
  );
}
