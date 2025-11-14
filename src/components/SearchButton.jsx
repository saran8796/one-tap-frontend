import { useState, useRef, useEffect } from 'react';

const SearchButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleBlur = (e) => {
    // Check if the blur is happening due to clicking outside
    if (!searchQuery && containerRef.current && !containerRef.current.contains(e.relatedTarget)) {
      setIsExpanded(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleSearchClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  // Determine if we should show the expanded state
  const shouldShowExpanded = isExpanded || isHovered;

  return (
    <div 
      className="relative" 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        // Only collapse if not manually expanded and no search query
        if (!isExpanded && !searchQuery) {
          setIsHovered(false);
        }
      }}
    >
      <div className={`
        hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border
        transition-all duration-300 ease-out overflow-hidden
        ${shouldShowExpanded 
          ? 'w-80 border-blue-400 shadow-lg' 
          : 'w-44 border-gray-300 hover:border-blue-400 cursor-pointer shadow-sm hover:shadow-md'
        }
      `}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`flex-shrink-0 transition-all duration-300 ${
            shouldShowExpanded ? 'h-5 w-5 text-blue-600' : 'h-4 w-4 text-blue-600'
          }`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" 
          />
        </svg>

        <div className={`flex-1 transition-all duration-300 ${
          shouldShowExpanded ? 'opacity-100' : 'opacity-0 w-0'
        }`}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for Xerox shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={handleBlur}
            onClick={handleSearchClick}
            className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-sm font-medium cursor-text"
          />
        </div>

        {!shouldShowExpanded ? (
          <span 
            onClick={handleSearchClick}
            className="text-gray-500 text-sm font-semibold whitespace-nowrap transition-all duration-300"
          >
            Find Xerox Shop..
          </span>
        ) : (
          <div className="flex items-center gap-1 transition-all duration-300">
            {searchQuery && (
              <input
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0 p-1 rounded-full hover:bg-gray-100"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </input>
            )}
          </div>
        )}
      </div>

      {/* Background overlay when expanded (only for manual expansion) */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-40 md:hidden"
          onClick={() => {
            setIsExpanded(false);
            setIsHovered(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchButton;