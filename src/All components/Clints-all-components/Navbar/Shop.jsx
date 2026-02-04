import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { FaChevronDown, FaSort, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import benner from "../../../assets/Images/shop benner.jpg";
import TrandingPost from "./TrandingPost";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

const Shop = () => {
    const [cardData, setCardData] = useState([]);
    const [defaultCollection, setDefaultCollection] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filters state
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [sortOption, setSortOption] = useState("All");
    const [brandSearch, setBrandSearch] = useState("");
    const [priceRange, setPriceRange] = useState(5000);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProductType, setSelectedProductType] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedAvailability, setSelectedAvailability] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [selectedDiscount, setSelectedDiscount] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);

    const productSectionRef = useRef(null);
    const defaultBrandLogo = "https://i.ibb.co.com/JjYJsZmK/haire.png";

    // Fetch data
    useEffect(() => {
        setLoading(true);
        axios("/All post data/post.json")
            .then((res) => {
                const cleanData = res.data.map((item) => ({
                    ...item,
                    price: Number(item.price) || 0,
                    rating: Number(item.rating) || 0,
                    stock: Number(item.stock) || 0,
                    discount: Number(item.discount) || 0,
                }));
                setCardData(cleanData);

                const defaultItems = cleanData
                    .filter((item) => item.collection === "collection")
                    .slice(0, 35);
                setDefaultCollection(defaultItems);
                setFilteredData(defaultItems);
            })
            .catch((err) => console.error("Failed to fetch data", err))
            .finally(() => setLoading(false));
    }, []);

    const brands = useMemo(
        () => [...new Set(cardData.map((item) => item.brand).filter(Boolean))],
        [cardData]
    );
    const categories = useMemo(
        () => [...new Set(cardData.map((item) => item.category).filter(Boolean))],
        [cardData]
    );

    const sizeOptions = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
    const colorOptions = ["red", "blue", "green", "black", "white"];
    const productTypes = ["Electronics", "Kitchen", "Fashion", "Home"];
    const ratings = [5, 4, 3, 2, 1];
    const availabilityOptions = ["In Stock", "Out of Stock"];
    const materialOptions = ["Plastic", "Metal", "Wood", "Glass"];
    const discountOptions = ["10%", "20%", "30%", "50%"];

    // Filtering logic
    useEffect(() => {
        const noFiltersApplied =
            !selectedBrand &&
            !selectedSize &&
            sortOption === "All" &&
            !selectedColor &&
            !selectedCategory &&
            !selectedProductType &&
            !selectedRating &&
            !selectedAvailability &&
            !selectedMaterial &&
            !selectedDiscount &&
            priceRange === 5000;

        if (noFiltersApplied) {
            setFilteredData(defaultCollection);
            return;
        }

        let data = [...cardData];

        if (selectedBrand) data = data.filter((item) => item.brand === selectedBrand);
        if (selectedSize) {
            data = data.filter((item) =>
                item.size
                    ? Array.isArray(item.size)
                        ? item.size.includes(selectedSize)
                        : item.size === selectedSize
                    : false
            );
        }
        if (sortOption !== "All") {
            const option = sortOption.toLowerCase();
            data = data.filter(
                (item) =>
                    (item.specialCategory &&
                        item.specialCategory.toLowerCase() === option) ||
                    (item.productCategory &&
                        item.productCategory.toLowerCase() === option) ||
                    (item.category && item.category.toLowerCase() === option) ||
                    (item.status && item.status.toLowerCase() === option)
            );
        }
        data = data.filter((item) => item.price <= priceRange);
        if (selectedColor) {
            data = data.filter(
                (item) =>
                    item.color && item.color.toLowerCase() === selectedColor.toLowerCase()
            );
        }
        if (selectedCategory) {
            data = data.filter(
                (item) =>
                    item.category &&
                    item.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }
        if (selectedProductType) {
            data = data.filter(
                (item) =>
                    item.productCategory &&
                    item.productCategory.toLowerCase() ===
                    selectedProductType.toLowerCase()
            );
        }
        if (selectedRating) {
            data = data.filter((item) => item.rating >= Number(selectedRating));
        }
        if (selectedAvailability) {
            if (selectedAvailability === "In Stock")
                data = data.filter((item) => item.stock > 0);
            else data = data.filter((item) => item.stock === 0);
        }
        if (selectedMaterial) {
            data = data.filter(
                (item) =>
                    item.material &&
                    item.material.toLowerCase() === selectedMaterial.toLowerCase()
            );
        }
        if (selectedDiscount) {
            const discountValue = parseInt(selectedDiscount);
            data = data.filter((item) => (item.discount || 0) >= discountValue);
        }

        setFilteredData(data);
    }, [
        selectedBrand,
        selectedSize,
        sortOption,
        priceRange,
        selectedColor,
        selectedCategory,
        selectedProductType,
        selectedRating,
        selectedAvailability,
        selectedMaterial,
        selectedDiscount,
        cardData,
        defaultCollection,
    ]);

    const clearFilters = () => {
        setSelectedBrand("");
        setSelectedSize("");
        setSortOption("All");
        setBrandSearch("");
        setPriceRange(5000);
        setSelectedColor("");
        setSelectedCategory("");
        setSelectedProductType("");
        setSelectedRating("");
        setSelectedAvailability("");
        setSelectedMaterial("");
        setSelectedDiscount("");
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen flex flex-col text-black">
            {/* Banner */}
            <div className="relative w-full h-[230px] sm:h-[400px] md:h-[500px] bg-gray-200 flex items-center justify-center mb-4">
                <img
                    src={benner}
                    alt="Banner"
                    className="absolute inset-0 w-full h-[230px] md:h-full object-cover"
                />
               <div className="relative mt-18 md:mt-0 z-10 text-center px-4">
  <h1
    className="
      text-3xl sm:text-6xl md:text-7xl font-black
      bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-500
      bg-clip-text text-transparent
      drop-shadow-[0_8px_30px_rgba(45,212,191,0.55)]
      tracking-wide
      animate-pulse
      hover:scale-105
      transition-all
      duration-300
    "
  >
    Simplecity
  </h1>

  <p
    className="
      mt-1 text-lg sm:text-xl md:text-2xl font-medium
     bg-gradient-to-r from-red-500 via-white to-yellow-500
      bg-clip-text text-transparent
      drop-shadow-[0_8px_30px_rgba(45,212,191,0.55)]
      tracking-wide
      animate-pulse
      hover:scale-105
      transition-all
      duration-300
    "
  >
    is the best
  </p>
</div>
            </div>

            {/* Mobile Filter Toggle */}
            {/* Mobile Toggle Button */}
            <div className="max-w-7xl mx-auto px-4 pb-2 md:py-4 md:hidden flex justify-between items-center w-full">
  {/* Shop Now Button */}
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-lg shadow-lg">
    <h1 className="text-l sm:text-2xl font-bold text-white tracking-wide">
      Shop Now
    </h1>
  </div>

  {/* Filters Toggle Button */}
  <div>
    <button
      onClick={() => setFiltersOpen(!filtersOpen)}
      className="
        text-gray-700
        bg-purple-100
        p-2
        rounded
        shadow
        focus:outline-none
        hover:bg-purple-200
        transition-colors
        duration-200
      "
      aria-label="Toggle filters"
    >
      {filtersOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
    </button>
  </div>
</div>

            {/* Overlay for Mobile when Filters are Open */}
            {filtersOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setFiltersOpen(false)} // Clicking outside closes filters
                ></div>
            )}

            {/* Your Filter Sidebar */}
            <div
                className={`fixed top-0 right-0  w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${filtersOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button Inside Sidebar */}
                <div className="flex justify-end p-2 md:p-4 border-b">
                    <button
                        onClick={() => setFiltersOpen(false)}
                        className="text-gray-700 hover:text-red-500"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>
                {/* Sidebar Content */}
                <div className="p-4">
                    {/* Your filter content here */}
                    <p className="text-gray-700">Filter Options...</p>
                </div>
            </div>


            {/* Main Content */}
            <div
                ref={productSectionRef}
                className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-4 pb-12 flex-1"
            >
                {/* Sidebar Filters */}
                <aside
                    className={`col-span-12 md:col-span-3 bg-white p-4 rounded-xl shadow-lg transition-transform duration-300
            ${filtersOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 fixed md:static top-0 left-0 h-full md:h-auto z-50 md:z-auto overflow-y-auto
            w-68 md:w-auto`}
                >
                    {/* Brand Filter */}
                    <div className="mb-6">
                       <h2 className="mb-4 text-xl md:text-xl font-extrabold tracking-wider
whitespace-nowrap inline-block
bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600
bg-clip-text text-transparent
drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]
drop-shadow-[0_0_16px_rgba(168,85,247,0.9)]">
  BongoNex Customize
</h2>
                        <input
                            type="text"
                            placeholder="Search brand..."
                            value={brandSearch}
                            onChange={(e) => setBrandSearch(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />
                        <ul className="space-y-1 max-h-[250px] overflow-y-auto">
                            {brands
                                .filter((brand) =>
                                    (brand || "")
                                        .toLowerCase()
                                        .includes(brandSearch.toLowerCase())
                                )
                                .map((brand) => (
                                    <li
                                        key={brand}
                                        onClick={() =>
                                            setSelectedBrand(selectedBrand === brand ? "" : brand)
                                        }
                                        className={`flex items-center gap-2 cursor-pointer p-1 rounded transition ${selectedBrand === brand
                                            ? "bg-purple-100"
                                            : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <img
                                            src={defaultBrandLogo}
                                            alt="logo"
                                            className="w-5 h-5 object-cover rounded"
                                        />
                                        {brand}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Size Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Size</h2>
                        <div className="flex flex-wrap gap-2">
                            {sizeOptions.map((size) => (
                                <span
                                    key={size}
                                    onClick={() =>
                                        setSelectedSize(selectedSize === size ? "" : size)
                                    }
                                    className={`px-3 py-1 border rounded cursor-pointer transition ${selectedSize === size
                                        ? "bg-purple-100"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Price Range</h2>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full"
                        />
                        <p className="text-gray-600">Up to TK {priceRange}</p>
                    </div>

                    {/* Color Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Color</h2>
                        <div className="flex gap-2 flex-wrap">
                            {colorOptions.map((color) => (
                                <div
                                    key={color}
                                    onClick={() =>
                                        setSelectedColor(selectedColor === color ? "" : color)
                                    }
                                    className="w-6 h-6 rounded-full border cursor-pointer"
                                    style={{
                                        backgroundColor: color,
                                        boxShadow:
                                            selectedColor === color ? "0 0 8px #000" : "",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Category</h2>
                        <ul className="space-y-1 max-h-[200px] overflow-y-auto">
                            {categories.map((cat) => (
                                <li
                                    key={cat}
                                    onClick={() =>
                                        setSelectedCategory(selectedCategory === cat ? "" : cat)
                                    }
                                    className={`cursor-pointer p-1 rounded transition ${selectedCategory === cat
                                        ? "bg-purple-100"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product Type */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Product Type</h2>
                        {productTypes.map((type) => (
                            <div key={type} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selectedProductType === type}
                                    onChange={() =>
                                        setSelectedProductType(
                                            selectedProductType === type ? "" : type
                                        )
                                    }
                                />
                                <label>{type}</label>
                            </div>
                        ))}
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Rating</h2>
                        {ratings.map((r) => (
                            <div
                                key={r}
                                className="cursor-pointer select-none"
                                onClick={() =>
                                    setSelectedRating(selectedRating === r ? "" : r)
                                }
                            >
                                {"⭐".repeat(r)}
                            </div>
                        ))}
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Availability</h2>
                        {availabilityOptions.map((status) => (
                            <div key={status} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selectedAvailability === status}
                                    onChange={() =>
                                        setSelectedAvailability(
                                            selectedAvailability === status ? "" : status
                                        )
                                    }
                                />
                                <label>{status}</label>
                            </div>
                        ))}
                    </div>

                    {/* Material */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Material</h2>
                        {materialOptions.map((mat) => (
                            <div key={mat} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selectedMaterial === mat}
                                    onChange={() =>
                                        setSelectedMaterial(
                                            selectedMaterial === mat ? "" : mat
                                        )
                                    }
                                />
                                <label>{mat}</label>
                            </div>
                        ))}
                    </div>

                    {/* Discount */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Discount</h2>
                        {discountOptions.map((d) => (
                            <div key={d} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selectedDiscount === d}
                                    onChange={() =>
                                        setSelectedDiscount(selectedDiscount === d ? "" : d)
                                    }
                                />
                                <label>{d} or more</label>
                            </div>
                        ))}
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={clearFilters}
                        className="w-full py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Clear All Filters
                    </button>
                </aside>

                {/* Products */}
                <main className="col-span-12 md:col-span-9">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="hidden md:flex bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-lg shadow-lg">
                            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                                Shop Now
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl shadow-lg border border-gray-200">
                            <p className="flex items-center gap-2 text-gray-800 font-semibold md:text-lg">
                                <FaSort className="text-purple-500 text-base md:text-xl" /> Sort by
                            </p>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="rounded-lg px-4 py-2 text-gray-800 font-medium border border-gray-300 bg-white shadow-sm"
                            >
                                <option>All</option>
                                <option>Special</option>
                                <option>Top Sell</option>
                                <option>Featured</option>
                                <option>New Arrival</option>
                                <option>Rice Cooker</option>
                                <option>Pressure Cooker</option>
                                <option>Blender</option>
                                <option>Sale</option>
                                <option>Sold</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
                            <span className="ml-4 text-purple-600 font-semibold">
                                Loading...
                            </span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {filteredData.length === 0 && (
                                <p className="col-span-full text-center text-gray-500">
                                    No products found.
                                </p>
                            )}
                            {/* card section */}
                            {filteredData.map((item) => (
                                <Tilt
                                    glareEnable={true}
                                    glareMaxOpacity={0.2}
                                    glareColor="#ffffff"
                                    glarePosition="top"
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    className="relative group rounded-t-xl rounded-b-md border border-transparent bg-gradient-to-br from-white via-gray-50 to-gray-100 
        shadow-lg hover:shadow-2xl transform transition-all duration-500 overflow-hidden"
                                >
                                    {/* Shine Animation */}
                                    <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent 
        transform skew-x-12 animate-shine"></span>

                                    {/* Border Gradient Animation */}
                                    <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400 transition-all duration-500"></span>
                                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></span>

                                    {/* Image */}
                                    <div className="relative mx-1 md:mx-0 overflow-hidden rounded-t-xl">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-60 md:w-72 h-28  md:h-72 mx-auto object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Heart Icon */}
                                        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md cursor-pointer hover:bg-pink-500 hover:text-white transition-colors duration-300">
                                            <FaHeart />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 space-y-1">
                                        <div className="flex justify-between items-center  ">
                                            <p className="text-xs text-gray-400">{item.model}</p>
                                            <p
  className="px-2 py-1 rounded-md text-white text-sm font-semibold bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500 shadow-md"
>
  {item.status}
</p>

                                        </div>
                                        <h3 className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                                           {item.name} <span className="text-gray-400">*</span>
                                        </h3>
                                        <p className="text-blue-600 font-serif text-sm md:text-base mt-2">
                                           <span className="text-gray-600">Price:</span> {item.price.toFixed(2)} <span className="text-red-500">TK</span> 
                                        </p>
                                        <div className="flex justify-between items-center gap-2 "  >
                                            <p className="text-xs text-gray-500">{item.brand}</p>
                                            <Link to={`/details/${item.id}`}>
                                                <button
                                                    className="relative px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300"
                                                >
                                                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                                                    <span className="relative z-10">Shop</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Tilt>




                                // ses
                            ))}
                        </div>
                    )}




                    {/* Extra Sections */}

                    <TrandingPost></TrandingPost>

                </main>
            </div>

        </div>
    );
};

export default Shop;
