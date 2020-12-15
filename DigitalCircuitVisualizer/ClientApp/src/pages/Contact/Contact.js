import React from 'react';
import * as Icon from 'react-feather';
import Layout from '../../components/Layout/Layout';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Contact.css';

let Contact = () => (
    <Layout>
        <div className="mi-contact-area mi-section mi-padding-top mi-padding-bottom">
            <div className="container">
                <SectionTitle title="Contact" />
                <div className="row mb-1">
                    <div className="col-lg-6">
                        <div className="mi-contact-info">
                            <div className="mi-contact-infoblock">
                                <span className="mi-contact-infoblock-icon">
                                    <Icon.Mail />
                                </span>
                                <div className="mi-contact-infoblock-content">
                                    <h6>Email</h6>
                                    <p>
                                        <a href="mailto:avardak@hotmail.com">avardak@hotmail.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mi-contact-info">
                            <div className="mi-contact-infoblock">
                                <span className="mi-contact-infoblock-icon">
                                    <Icon.GitHub />
                                </span>
                                <div className="mi-contact-infoblock-content">
                                    <h6>GitHub</h6>
                                    <p>
                                        <a href="https://arisvardakas.github.io/" rel="noopener noreferrer" target="_blank">@arisvardakas</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-lg-6">
                        <div className="mi-contact-info">
                            <div className="mi-contact-infoblock">
                                <span className="mi-contact-infoblock-icon">
                                    <Icon.Facebook />
                                </span>
                                <div className="mi-contact-infoblock-content">
                                    <h6>Facebook</h6>
                                    <p>
                                        <a href="https://www.facebook.com/aris.vardakas/" rel="noopener noreferrer" target="_blank">@aris.vardakas</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mi-contact-info">
                            <div className="mi-contact-infoblock">
                                <span className="mi-contact-infoblock-icon">
                                    <Icon.Instagram />
                                </span>
                                <div className="mi-contact-infoblock-content">
                                    <h6>Instagram</h6>
                                    <p>
                                        <a href="https://www.instagram.com/aris_vardakas/" rel="noopener noreferrer" target="_blank">@aris_vardakas</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-lg-6">
                        <div className="mi-contact-info">
                            <div className="mi-contact-infoblock">
                                <span className="mi-contact-infoblock-icon">
                                    <Icon.Linkedin />
                                </span>
                                <div className="mi-contact-infoblock-content">
                                    <h6>LinkedIn</h6>
                                    <p>
                                        <a href="https://www.linkedin.com/in/aristeidis-vardakas/" rel="noopener noreferrer" target="_blank">@aristeidis-vardakas</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mi-contact-info">
                            <div className="mi-contact-infoblock">
                                <span className="mi-contact-infoblock-icon">
                                    <Icon.Twitter />
                                </span>
                                <div className="mi-contact-infoblock-content">
                                    <h6>Twitter</h6>
                                    <p>
                                        <a href="https://twitter.com/aris_vardakas/" rel="noopener noreferrer" target="_blank">@aris_vardakas</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);

export default Contact;