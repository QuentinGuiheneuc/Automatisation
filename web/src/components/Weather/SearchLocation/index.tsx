interface SearchLocationProps {
    onClose: () => void;
  }
  
  const SearchLocation: React.FC<SearchLocationProps> = ({ onClose }) => {
    return (
      <div className="text-gray-150">
        <div className="text-right">
          <button className="text-2xl" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
  
        <div className="flex justify-between my-5 space-x-4">
          <input
            type="text"
            className="border border-gray-150 bg-transparent p-3 flex-grow"
            placeholder="Ville"
          />
          <button className="bg-[#3C47E9] py-3 px-5 hover:bg-[#3C47E9]/70">
            Rechercher
          </button>
        </div>
  
        <div className="mt-20">
          <button className="hover:border border-gray-250 px-4 py-6 w-full flex justify-between">
            <p>Bordeaux</p>
          </button>
        </div>
      </div>
    );
  };
  
  export default SearchLocation;