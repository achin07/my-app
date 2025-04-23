import React from 'react';
import './Userstats.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import TabButton from './TabButton';
import { BarChart3, UserCircle2 } from 'lucide-react'; 
import { Award, Activity } from 'lucide-react';

const badges = [
    { title: "First Recycle ", date: "2025-04-01" },
    { title: "7-Day Streak ", date: "2025-04-07" },
    { title: "Plastic Hero ", date: "2025-04-15" }
];

const recentActivity = [
    "Sorted 5 plastic bottles",
    "Earned 'Plastic Hero' badge",
    "Sorted 3 organic waste items",
    "Recycled for 14 consecutive days"
];

const environmentalImpact = {
    plasticSaved: "20 kg",
    waterSaved: "15 L"
};

const funTip = "Recycling plastic bottles saves up to 70% of energy compared to making new plastic!";
const getStoredStreakData = () => {
    const stored = JSON.parse(localStorage.getItem('recyclingStreak') || '[]');
    return stored.map(date => ({
        date,
        count: 1
    }));
};

const streakData = getStoredStreakData();
const UserStats = () => {
    return (
        <main className="user-stats-container">
            <div className="tab-nav">
                <TabButton to="/stats" icon={UserCircle2} label="User Stats" />
                <TabButton to="/worldstats" icon={BarChart3} label="World Stats" />
            </div>
            
                <section className="stats-container">
                <div className="center-wrapper">
                    {/* Top Row */}
                    <div className="top-row">
                        {/* Heatmap */}
                        <div className="card heatmap-card">
                            <h3>Recycling Streak</h3>
                            <CalendarHeatmap
                                startDate={new Date('2025-04-01')}
                                endDate={new Date('2025-06-30')}
                                values={streakData}
                                classForValue={(value) => {
                                    if (!value) return 'empty';
                                    return value.count > 0 ? 'filled' : 'empty';
                                }}
                                showWeekdayLabels={true}
                                tooltipDataAttrs={(value) => {
                                    if (!value || !value.date) return null;
                                    return {
                                        'data-tip': `Recycled on ${new Date(value.date).toDateString()}`
                                    };
                                }}
                            />
                        </div>

                        {/* Recent Activity */}
                        <div className="card activity-card">
                            <h3>Recent Activity</h3>
                            <div className="activity-feed">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="activity-item">
                                        <Activity className="activity-icon" />
                                        <span>{activity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="bottom-row">
                        {/* Badges */}
                        <div className="card badges-card">
                            <h3>Badges Earned</h3>
                            <div className="badges-container">
                                {badges.map((badge, index) => (
                                    <div key={index} className="badge">
                                        <Award className="badge-icon" />
                                        <div>
                                            <span>{badge.title}</span>
                                            <span className="badge-date">Earned on: {badge.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tip from Recyclo */}
                        <div className="card tip-card recyclo-tip-card">
                            <h3>Tip from Recyclo</h3>
                            <div className="tip-content">
                                <img src="./recyclo-panda.png" alt="Recyclo the Panda" width='100px' height='auto' />
                                <p>{funTip}</p>
                            </div>
                        </div>

                        {/* Environmental Impact */}
                        <div className="card impact-card">
                            <h3>Environmental Impact</h3>
                            <p>🌍 Plastic Saved: {environmentalImpact.plasticSaved}</p>
                            <p>💧 Water Saved: {environmentalImpact.waterSaved}</p>
                        </div>
                    </div>
                    </div>
                </section>
        </main>
    );
};

export default UserStats;
