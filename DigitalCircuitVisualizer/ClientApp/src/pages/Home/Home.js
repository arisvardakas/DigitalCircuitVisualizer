import React from 'react';
import Particles from 'react-particles-js';
import Layout from '../../components/Layout/Layout';
import './Home.css';

let Home = () => {
    let paramConfig = {
        particles: {
            number: {
                value: 160,
                density: {
                    enable: false
                }
            },
            color: {
                value: '#fff'
            },
            opacity: {
                value: 0.1
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    speed: 4,
                    size_min: 0.3
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                random: true,
                speed: 1,
                direction: 'top',
                out_mode: 'out'
            }
        }
    };
    return (
        <Layout>
            <div className='mi-home-area mi-padding-section'>
                <Particles className='mi-home-particle' params={paramConfig} />
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-10 col-12'>
                            <div className='mi-home-content'>
                                <h1>
                                    <span className='color-theme'>Digital Circuit Visualizer</span>
                                </h1>
                                <p>A web application for digital circuit visualizations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;