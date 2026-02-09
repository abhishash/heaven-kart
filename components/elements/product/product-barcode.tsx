export default function ProductBarcode({ product }: {
    product: {
        barcode: string;
        name: string;
    }
}) {
    return (

        <div className="flex items-start " key={product?.name}>
            <div className="w-1/2 overflow-hidden break-words capitalize">
                <h3 className="text-slate-900 text-sm">Product Barcode</h3>
            </div>

            <div className="w-1/2 break-words">
                <img
                    src={product.barcode}
                    alt={product.name}
                    className="w-48"
                />
            </div>
        </div>

    );
}