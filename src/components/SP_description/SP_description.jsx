import { useState } from "react";
import "./SP_description.css";
import threesofa from '/Cloudthree.png';
import threesofas from '/Cloudthrees.png';
const SP_description = () => {
    const [activeTab, setActiveTab] = useState("sddescription");
    return (
        <div className="sdcontainer">
            {/* Tab Navigation */}
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
                    Reviews [5]
                </button>
            </div>
            {/* Tab Content */}
            <div className="sdcontentContainer">
                {activeTab === "sddescription" && (
                    <div className="sdcontent">
                        <p className="sdparagraph">
                            Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn
                            portable active stereo speaker takes the unmistakable look and
                            sound of Marshall, unplugs the chords, and takes the show on the
                            road.
                        </p>
                        <p className="sdparagraph">
                            Weighing in under 7 pounds, the Kilburn is a lightweight piece of
                            vintage styled engineering. Setting the bar as one of the loudest
                            speakers in its class.
                        </p>

                        <div className="sdimagesGrid">
                            <div className="sdimageCard">
                                <div className="sdsofaSection"><img src={threesofa} alt="sofa_three_seater" /></div>
                                {/* <div className="sdsofaBase"></div> */}
                            </div>
                            <div className="sdimageCard">            
                                    <div className="sdsofaImage">
                                          <div className="sdsofaSection"><img src={threesofas} alt="sofa_three_seaterrr" /></div>
 
                                            {/* <div className="sdsofaBase"></div> */}
                                        </div>                               
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "sdadditional" && (
                    <div className="sdcontent">
                        <p className="sdparagraph">
                            Additional product information will be displayed here.
                        </p>
                    </div>
                )}
                {activeTab === "sdreviews" && (
                    <div className="sdcontent">
                        <p className="sdparagraph">
                            Customer reviews will be displayed here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SP_description;