import React from 'react';
import './WorldStats.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import GaugeChart from 'react-gauge-chart';
import TabButton from './TabButton';
import { BarChart3, UserCircle2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const plasticWasteData = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [
        {
            label: 'Global Plastic Waste (in Million Tonnes)',
            data: [203, 210, 214, 222, 228],
            borderColor: '#1a237e',
            tension: 0.4,
            fill: true,
        }
    ]
};

const Statistics = () => {
    return (
        <main className="financial-dashboard-container">
            <div className="tab-nav">
                <TabButton to="/stats" icon={UserCircle2} label="User Stats" />
                <TabButton to="/worldstats" icon={BarChart3} label="World Stats" />
            </div>

            <section className="stats-container">
                <div className="card stat-card">
                    <div className="stats-grid">
                        {/* Plastic Waste Card */}
                        <div key={0} className="stat-card-item">
                            <div className="stat-icon"><img src='./plastic-bg.png' width='40px' height='auto' /></div>
                            <h3>Plastic Wastes</h3>
                            <p className="stat-value">~220 mil tonnes</p>
                            <p className={`stat-change up`}>10.32% ↑</p>
                        </div>

                        {/* Residual Waste Card */}
                        <div key={1} className="stat-card-item">
                            <div className="stat-icon"><img src='./biodegradeable-bg.png' width='40px' height='auto' /></div>
                            <h3>Residual Waste</h3>
                            <p className="stat-value">~2.1 bil tonnes</p>
                            <p className={`stat-change down`}>4.32% ↓</p>
                        </div>

                        {/* Gauge Chart */}
                        <div key={2} className="stat-card-item">
                            <h3>Residual Waste</h3>
                            <GaugeChart id="residual-waste-gauge" nrOfLevels={20} percent={73 / 100} />
                            <p>Current Residual Waste: 73%</p>
                        </div>
                    </div>
                    <div className="card line-chart-card">
                        <h2 className="card-header">Plastic Waste Over Time</h2>
                        <div className="line-chart-container">
                            <Line data={plasticWasteData} />
                        </div>
                    </div>
                    {/* Top Countries for Major Waste Disposal */}
                    <div className="card yearly-overview-card">
                        <h2 className="card-header">Top 3 Countries for Major Waste Disposal</h2>
                        <div className="yearly-stats">
                            <div className="yearly-stat">
                                <span>🇨🇳 China</span>
                                <span>~395 mil tonnes</span>
                            </div>
                            <div className="yearly-stat">
                                <span>🇺🇸 United States of America </span>
                                <span>~292 mil tonnes</span>
                            </div>
                            <div className="yearly-stat">
                                <span>🇮🇳 India </span>
                                <span>~277 mil tonnes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Statistics;



