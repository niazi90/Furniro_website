import React from 'react';
import './contactForm.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import Banner_components from '../../components/banner_components/Banner_components';
import Acheivemnt from '../../components/achivement/Achivement';

const ContactForm = () => {


    return (
        <>
            <Banner_components heading={"Contact"} para={"contact"} />
            <div className="contact-container">
                <div className="contact-content">
                    <div className="contact-header">
                        <h2>Get In Touch With Us</h2>
                        <p className="contact-description">
                            For More Information About Our Product & Services. Please Feel Free To Drop Us
                            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                        </p>
                    </div>

                    <div className="contact-details">
                        <div className='contact_icon'>
                         <div className='info-section-icon' > < FaLocationDot /></div>
                            <div className='info-section-icon'> < FaPhoneAlt /></div>
                            <div className='info-section-icon'> < GoClockFill /></div></div>

                        <div className="contact-info">
                           
                            <div className="info-section">


                                <h3>Address</h3>

                                <p>236 5th SE Avenue, New York NY10000, United States</p>
                            </div>

                            <div className="info-section">
                                <h3>Phone</h3>
                                <p>Mobile: +(84) 546-6789</p>
                                <p>Hotline: +(84) 456-6789</p>
                            </div>

                            <div className="info-section">
                                <h3>Working Time</h3>
                                <p>Monday-Friday: 9:00 - 22:00</p>
                                <p>Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>

                        <div className="contact-form-container">
                            <form className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Abc"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Abc@def.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject <span className="optional">(This is an optional)</span></label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Optional subject"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Hi! I'd like to ask about"
                                        rows="5"
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-btn">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Acheivemnt />
        </>
    );

};

export default ContactForm;