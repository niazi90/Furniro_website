import React from 'react';
import './Filter_components.css';
// import filter from '/filter.svg';

const Filter_component = ({ filter_svg, filter_text, filter_heading, menu_svg,
     menu_text, destop_svg, text, destop_text, Showing_text ,page_first_number,page_last_number,righttext,rightnumber,short_by,default_text}) => {
    return (
        <div className="filter-wrapper">
            <div className="filter-header">

                <div className="filter-left">
                    <div className="filter-icon-box">
                        <img src={filter_svg} alt={filter_text} />
                    </div>
                    <span className="filter-file-name">{filter_heading}</span>
                    <div className="filter-icon-box">
                        <img src={menu_svg} alt={menu_text} />
                    </div>
 <span className="filter-file-name">{text}</span>

                    <div className="filter-icon-box">
                        <img src={destop_svg} alt={destop_text} />
                    </div>

                    <div className="filter-divider"></div>

                    <div className="filter-info">
                        <span className="filter-showing">{Showing_text}</span>

                        {/* <div className="filter-pagination"> */}
                            {/* <button className="filter-arrow prev">
                                <img src={aero_svg} alt={aero_svg_text} />
                            </button> */}

                            <span className="filter-range">{ page_first_number}</span>

                            {/* <button className="filter-arrow next">
                                 <img src={aero_next_svg} alt={aero_next_svg_text} />
                            </button> */}
                        {/* </div> */}

                        <span className="filter-total">{page_last_number}</span>
                    </div>
                </div>

                <div className="filter-right">
                    <div className="filter-controls">
                        {righttext && rightnumber && short_by && default_text && (
 <>
                        <span className="filter-label">{righttext}</span>

                        <div className="filter-select">
                            <span className="filter-value">{rightnumber}</span>
                        </div>

                        <span className="filter-label">{short_by}</span>

                        <div className="filter-select">
                            <span className="filter-value">{default_text}</span>
                        </div>
   </>                     
     )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Filter_component;
