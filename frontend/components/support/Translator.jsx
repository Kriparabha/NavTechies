import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Volume2,
  Copy,
  RefreshCw,
  BookOpen,
  History,
  Star
} from 'lucide-react';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('as');
  const [translationHistory, setTranslationHistory] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  const mockTranslations = {
    'hello': { as: 'নমস্কাৰ', hi: 'नमस्ते', bn: 'হ্যালো' },
    'thank you': { as: 'ধন্যবাদ', hi: 'धन्यवाद', bn: 'ধন্যবাদ' },
    'help': { as: 'সাহায্য কৰক', hi: 'मदद', bn: 'সাহায্য' },
    'water': { as: 'পানী', hi: 'पानी', bn: 'জল' },
    'food': { as: 'খাদ্য', hi: 'खाना', bn: 'খাবার' },
    'where is the temple': { as: 'মন্দিৰ ক'ত?', hi: 'मंदिर कहाँ है?', bn: 'মন্দির কোথায়?' },
    'how much does this cost': { as: 'এইটোৰ দাম কিমান?', hi: 'इसकी कीमत कितनी है?', bn: 'এটার দাম কত?' },
    'i need a doctor': { as: 'মোৰ ডাক্তৰ লাগে', hi: 'मुझे डॉक्टर चाहिए', bn: 'আমার একজন ডাক্টর প্রয়োজন' },
    'beautiful': { as: 'ধুনীয়া', hi: 'सुंदर', bn: 'সুন্দর' },
    'delicious': { as: 'স্বাদযুক্ত', hi: 'स्वादिष्ट', bn: 'সুস্বাদু' },
  };

  const languages = [
    { code: 'as', name: 'Assamese', flag: '🇮🇳' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const handleTranslate = () => {
    if (!inputText.trim()) return;

    const textLower = inputText.toLowerCase();
    const translation = mockTranslations[textLower]?.[targetLanguage] ||
      `${inputText} (Translation not available)`;

    setTranslatedText(translation);

    // Add to history
    const newHistory = [
      {
        id: Date.now(),
        original: inputText,
        translated: translation,
        language: targetLanguage,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...translationHistory.slice(0, 4), // Keep last 5
    ];
    setTranslationHistory(newHistory);
  };

  const handleSpeak = (text, lang = 'as-IN') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const toggleFavorite = (phrase) => {
    const newFavorites = new Set(favorites);
    const phraseKey = `${phrase.original}-${phrase.language}`;

    if (newFavorites.has(phraseKey)) {
      newFavorites.delete(phraseKey);
    } else {
      newFavorites.add(phraseKey);
    }
    setFavorites(newFavorites);
  };

  const clearHistory = () => {
    setTranslationHistory([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Translator</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Translate English phrases to Assamese, Hindi, or Bengali in real-time
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Translate to</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setTargetLanguage(lang.code)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    targetLanguage === lang.code
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-2xl mb-2">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Enter Text</h3>
              <span className="text-sm text-gray-500">English → {languages.find(l => l.code === targetLanguage)?.name}</span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your text here (e.g., 'Where is Kamakhya Temple?')"
              className="w-full h-40 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none mb-4"
            />

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {inputText.length}/500 characters
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setInputText('')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleTranslate}
                  disabled={!inputText.trim()}
                  className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Translate
                </button>
              </div>
            </div>
          </div>

          {/* Output Area */}
          {translatedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Translation</h3>
                <button
                  onClick={() => handleSpeak(translatedText)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Volume2 size={16} />
                  <span>Hear It</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="text-sm text-gray-500 mb-2">Original</div>
                  <div className="text-lg font-medium text-gray-900">{inputText}</div>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">Translated ({languages.find(l => l.code === targetLanguage)?.name})</div>
                    <button
                      onClick={() => toggleFavorite({
                        original: inputText,
                        translated: translatedText,
                        language: targetLanguage
                      })}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          favorites.has(`${inputText}-${targetLanguage}`)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="text-2xl font-bold text-primary-600 mb-4">{translatedText}</div>
                  <div className="text-sm text-gray-500">Pronunciation help will appear here</div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleCopy(translatedText)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-primary-200 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <Copy size={16} />
                    <span>Copy Translation</span>
                  </button>
                  <button
                    onClick={() => handleSpeak(translatedText)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-secondary-200 text-secondary-600 rounded-lg hover:bg-secondary-50 transition-colors"
                  >
                    <Volume2 size={16} />
                    <span>Play Audio</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Common Phrases */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Common Phrases</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(mockTranslations).slice(0, 8).map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => {
                    setInputText(phrase);
                    // Auto-translate after a short delay
                    setTimeout(() => {
                      const translation = mockTranslations[phrase]?.[targetLanguage] || phrase;
                      setTranslatedText(translation);
                    }, 100);
                  }}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors text-left"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - History & Favorites */}
        <div className="space-y-6">
          {/* History */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <History className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">Recent Translations</h3>
              </div>
              {translationHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>

            {translationHistory.length > 0 ? (
              <div className="space-y-3">
                {translationHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => {
                      setInputText(item.original);
                      setTranslatedText(item.translated);
                      setTargetLanguage(item.language);
                    }}
                  >
                    <div className="text-sm text-gray-900 font-medium truncate">
                      {item.original}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {item.translated}
                    </div>
                    <div className="text-xs text-gray-400 mt-2 flex justify-between">
                      <span>{languages.find(l => l.code === item.language)?.name}</span>
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No translation history yet</p>
              </div>
            )}
          </div>

          {/* Favorites */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-bold text-gray-900">Favorites</h3>
            </div>

            {favorites.size > 0 ? (
              <div className="space-y-3">
                {Array.from(favorites).slice(0, 5).map((favKey) => {
                  const [original, language] = favKey.split('-');
                  const translation = mockTranslations[original]?.[language];

                  return (
                    <div
                      key={favKey}
                      className="p-3 bg-white/50 rounded-lg backdrop-blur-sm"
                    >
                      <div className="text-sm text-gray-900 font-medium truncate">
                        {original}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 truncate">
                        {translation}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {languages.find(l => l.code === language)?.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <Star className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
                <p className="text-gray-600">No favorites yet</p>
                <p className="text-gray-500 text-sm mt-1">
                  Star phrases to save them here
                </p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Translation Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Keep sentences short and simple</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Use the "Hear It" feature to practice pronunciation</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Favorite commonly used phrases for quick access</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>Download translations for offline use</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;