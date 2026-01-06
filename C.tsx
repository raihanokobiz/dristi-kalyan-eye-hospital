<div className="w-full p-2 md:p-4 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100 flex flex-col max-h-80">
    <div key={product._id} className="group flex flex-col items-center text-center">
        <div className="relative aspect-square  w-full mb-6 border border-[#eee] bg-white flex items-center justify-center overflow-hidden transition-colors hover:border-[#e67e22]/30">
            <Image
                src={product.thumbnailImage ? (product.thumbnailImage.startsWith('http') ? product.thumbnailImage : apiBaseUrl + product.thumbnailImage) : "/placeholder.svg"}
                alt={product.name}
                width={250}
                height={250}
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
            />
        </div>
        <div className="space-y-2">
            <h3 className="text-[#666] font-medium leading-tight">{product.name}</h3>
            <div className="flex items-center justify-center gap-2 font-semibold">
                <span className="text-[#666]">৳{product.price}</span>
                {hasDiscount && product.mrpPrice > product.price && (
                    <span className="text-[#999] line-through text-sm font-normal">৳{product.mrpPrice}</span>
                )}
            </div>
        </div>
    </div>
    <div className="flex flex-col">
        <div >
            <div className="block mt-3 w-full">
                <button
                    onClick={handleQuickAddClick}
                    disabled={isStockOut}
                    className={`w-full px-3 py-1.5 rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 font-semibold text-xs shadow-md transform cursor-pointer ${isStockOut
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-primary text-white hover:from-[#E55A00] hover:to-[#CC4F00] hover:shadow-lg hover:-translate-y-0.5"
                        }`}
                >
                    {isStockOut ? (
                        <>
                            <X size={16} strokeWidth={2.5} />
                            Out of stock
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={16} strokeWidth={2.5} />
                            Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
</div>