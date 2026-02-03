import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  Copy,
  BookOpen,
  Heart,
  Star,
  Search,
  Filter,
  Download
} from 'lucide-react';

const Phrasebook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Phrases', count: 40 },
    { id: 'greetings', name: 'Greetings', count: 8 },
    { id: 'directions', name: 'Directions', count: 12 },
    { id: 'emergency', name: 'Emergency', count: 6 },
    { id: 'shopping', name: 'Shopping', count: 10 },
    { id: 'food', name: 'Food & Dining', count: 4 },
  ];

  const phrases = [
    // Greetings
    { id: 1, english: 'Hello', assamese: 'নমস্কাৰ', phonetic: 'Nomoskar', category: 'greetings' },
    { id: 2, english: 'Thank you', assamese: 'ধন্যবাদ', phonetic: 'Dhonnobad', category: 'greetings' },
    { id: 3, english: 'Welcome', assamese: 'স্বাগতম', phonetic: 'Swagotom', category: 'greetings' },
    { id: 4, english: 'How are you?', assamese: 'আপুনি কেনে আছে?', phonetic: 'Aponi kene ase?', category: 'greetings' },

    // Directions
    { id: 5, english: 'Where is...?', assamese: 'ক'ত আছে...?', phonetic: 'Kot ase...?', category: 'directions' },
    { id: 6, english: 'Go straight', assamese: 'সঠিকে যাওক', phonetic: 'Sothike jaok', category: 'directions' },
    { id: 7, english: 'Turn left', assamese: 'বাওঁফালে ঘূৰক', phonetic: 'Baom fale ghurok', category: 'directions' },
    { id: 8, english: 'Turn right', assamese: 'সোঁফালে ঘূৰক', phonetic: 'Xom fale ghurok', category: 'directions' },

    // Emergency
    { id: 9, english: 'Help!', assamese: 'সাহায্য কৰক!', phonetic: 'Xahayyo korok!', category: 'emergency' },
    { id: 10, english: 'Call police', assamese: 'পুলিচক মাতক', phonetic: 'Policek matok', category: 'emergency' },
    { id: 11, english: 'I need a doctor', assamese: 'মোৰ ডাক্তৰ লাগে', phonetic: 'Mur doktor lage', category: 'emergency' },

    // Shopping
    { id: 12, english: 'How much?', assamese: 'কিমান দাম?', phonetic: 'Kiman dam?', category: 'shopping' },
    { id: 13, english: 'Too expensive', assamese: 'বহুত দামী', phonetic: 'Bohut dami', category: 'shopping' },
    { id: 14, english: 'Can you reduce?', assamese: 'কমাব পাৰিবনে?', phonetic: 'Komab paribone?', category: 'shopping' },

    // Food
    { id: 15, english: 'Delicious', assamese: 'স্বাদযুক্ত', phonetic: 'Swadyukt', category: 'food' },
    { id: 16, english: 'Water please', assamese: 'পানী দিয়ক', phonetic: 'Pani diok', category: 'food' },
  ];

  const filteredPhrases = phrases.filter(phrase => {
    const matchesSearch = searchTerm === '' ||
      phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.assamese.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || phrase.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'as-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Assamese Phrasebook</h2>
          <p className="text-gray-600">Essential phrases for your Guwahati experience</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium">
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search phrases (e.g., 'hello', 'thank you')"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
          <div className="text-2xl font-bold gradient-text">{phrases.length}</div>
          <div className="text-gray-600">Total Phrases</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-600">{favorites.size}</div>
          <div className="text-gray-600">Favorites</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-600">{filteredPhrases.length}</div>
          <div className="text-gray-600">Filtered</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-600">5</div>
          <div className="text-gray-600">Categories</div>
        </div>
      </div>

      {/* Phrases Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${searchTerm}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPhrases.map((phrase) => (
            <motion.div
              key={phrase.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {phrase.category}
                  </span>
                  <button
                    onClick={() => toggleFavorite(phrase.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(phrase.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    />
                  </button>
                </div>

                {/* English */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">English</div>
                  <div className="text-xl font-bold text-gray-900">{phrase.english}</div>
                </div>

                {/* Assamese */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Assamese</div>
                  <div className="text-2xl font-bold text-primary-600">{phrase.assamese}</div>
                </div>

                {/* Phonetic */}
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Pronunciation</div>
                  <div className="text-gray-700 font-medium">{phrase.phonetic}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => speakText(phrase.assamese)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    <Volume2 size={16} />
                    <span>Hear It</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(phrase.assamese)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-secondary-50 text-secondary-600 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <Copy size={16} />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredPhrases.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No phrases found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-accent-50 to-yellow-50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Tips for Using the Phrasebook</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Volume2 className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Practice Pronunciation</h4>
                <p className="text-gray-600 text-sm">Use the "Hear It" button to learn correct pronunciation.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Save Favorites</h4>
                <p className="text-gray-600 text-sm">Star your most-used phrases for quick access.</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Copy className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Copy & Share</h4>
                <p className="text-gray-600 text-sm">Copy phrases to share with fellow travelers.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Download className="w-5 h-5 text-accent-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Download Offline</h4>
                <p className="text-gray-600 text-sm">Get the PDF for offline access during your travels.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phrasebook;