import { useState, useEffect } from "react";
import "./SP_description.css";
import threesofa from '/Cloudthree.png';
import threesofas from '/Cloudthrees.png';
import { productsAPI } from '../../services/api';
// import { getImageUrl } from '../../utils/imageUrl';

const SP_description = ({ productId }) => {
    const [activeTab, setActiveTab] = useState("sddescription");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await productsAPI.getById(productId);
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="sdcontainer" style={{ textAlign: 'center', padding: '40px 0' }}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="sdcontainer">
            {/* Tab Navigation — same hai */}
            <div className="sdtabContainer">
                <button
                    onClick={() => setActiveTab("sddescription")}
                    className={`sdtab ${activeTab === "sddescription" ? "sdactiveTab" : "sdinactiveTab"}`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab("sdadditional")}
                    className={`sdtab ${activeTab === "sdadditional" ? "sdactiveTab" : "sdinactiveTab"}`}
                >
                    Additional Information
                </button>
                <button
                    onClick={() => setActiveTab("sdreviews")}
                    className={`sdtab ${activeTab === "sdreviews" ? "sdactiveTab" : "sdinactiveTab"}`}
                >
                    Reviews [{product?.reviews || 5}]
                </button>
            </div>

            {/* Tab Content */}
            <div className="sdcontentContainer">
                {activeTab === "sddescription" && (
                    <div className="sdcontent">
                        <p className="sdparagraph">
                            {product?.description || product?.fullDescription ||
                            "Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road."}
                        </p>

                        {product?.additionalDescription && (
                            <p className="sdparagraph">
                                {product.additionalDescription}
                            </p>
                        )}

                        {!product?.additionalDescription && (
                            <p className="sdparagraph">
                                Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class.
                            </p>
                        )}

                        {/* ===== ONLY IMAGES CHANGED — baaki sab same ===== */}
                        <div className="sdimagesGrid">
                            <div className="sdimageCard">
                                <div className="sdsofaSection">
                                    <img
                                        src={product?.image ? getImageUrl(product.image) : threesofa}
                                        alt={`${product?.title} view 1`}
                                    />
                                </div>
                            </div>
                            <div className="sdimageCard">
                                <div className="sdsofaImage">
                                    <div className="sdsofaSection">
                                        <img
                                            src={product?.image ? getImageUrl(product.image) : threesofas}
                                            alt={`${product?.title} view 2`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ===== END ===== */}
                    </div>
                )}

                {activeTab === "sdadditional" && (
                    <div className="sdcontent">
                        <p className="sdparagraph">
                            <strong>Dimensions:</strong> {product?.dimensions || 'Not specified'}
                        </p>
                        <p className="sdparagraph">
                            <strong>Material:</strong> {product?.material || 'Premium quality materials'}
                        </p>
                        <p className="sdparagraph">
                            <strong>Weight:</strong> {product?.weight || 'Not specified'}
                        </p>
                        <p className="sdparagraph">
                            <strong>Color Options:</strong> {product?.colorOptions || 'Multiple colors available'}
                        </p>
                        <p className="sdparagraph">
                            <strong>Warranty:</strong> {product?.warranty || '1 year manufacturer warranty'}
                        </p>
                    </div>
                )}

                {activeTab === "sdreviews" && (
                    <div className="sdcontent">
                        {product?.customerReviews && product.customerReviews.length > 0 ? (
                            product.customerReviews.map((review, index) => (
                                <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                                    <p className="sdparagraph">
                                        <strong>{review.customerName}</strong> - {review.rating}/5 stars
                                    </p>
                                    <p className="sdparagraph">{review.comment}</p>
                                    <p className="sdparagraph" style={{ fontSize: '12px', color: '#666' }}>
                                        {review.date}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <>
                                <p className="sdparagraph">
                                    <strong>Rating:</strong> {product?.rating || 4.5}/5 stars
                                </p>
                                <p className="sdparagraph">
                                    {product?.reviews || 5} customers have reviewed this product.
                                    {product?.rating >= 4 ? ' Highly recommended!' : ' Good quality product.'}
                                </p>
                                <p className="sdparagraph" style={{ fontStyle: 'italic', color: '#666' }}>
                                    Detailed customer reviews will be displayed here once available.
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SP_description;
