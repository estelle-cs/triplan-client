import './welcome.css';
import { Steps } from 'antd';

function Welcome() {
    const contentStyle = {}
    return (
        <section >
            <section className="top-section">
                <div className="nav-bar">
                    <span className="title-s logo">Triplan</span>
                    <button className="green-button body-m accent" onClick={() => window.location.href = '/login'} style={{ cursor: 'pointer' }}>Se connecter</button>
                </div>
                <div className="div-title">
                    <h1 className="h1-ondark title-l">Planifiez votre prochain voyage <span className="highlight-text">comme un pro</span> !</h1>
                    <button className="orange-button body-l accent" onClick={() => window.location.href = '/register'} style={{ cursor: 'pointer' }}>Je m'inscris</button>
                </div>
            </section>
            <section className="second-section">
                <h2 className="h2-ondark title-s text-centered">Découvrez les destinations les plus populaires</h2>
                <div className="div-destinations">
                    <div className="destination paris">
                        <div className="destination-desc">
                            <span className="body-m">Paris</span>
                        </div>
                    </div>
                    <div className="destination london">
                        <div className="destination-desc">
                            <span className="body-m">Londres</span>
                        </div>
                    </div>
                    <div className="destination rome">
                        <div className="destination-desc">
                            <span className="body-m">Rome</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="third-section">
                <h2 className="h2-onlight title-s">Préparez votre voyage étapes par étapes</h2>
                <Steps
                    current={0}
                    items={[
                    {
                        title: 'La destination',
                        description: 'Choisissez parmi plusieurs destinations',
                    },
                    {
                        title: 'Les dates',
                        description: 'Déterminez les dates de votre voyage',
                    },
                    {
                        title: "L'hébergement",
                        description: 'Réservez le logement idéal',
                    },
                    {
                        title: "Le transport",
                        description: 'Réservez votre moyen de transport',
                    },
                    {
                        title: "Les activités",
                        description: 'Enregistrez toutes les activités souhaitées',
                    },
                    ]}
                />
                <div className="div-display-flex">
                    <button className="green-button body-m accent" onClick={() => window.location.href = '/login'} style={{ cursor: 'pointer' }}>Préparer mon voyage</button>
                </div>
            </section>
        </section>
    );
}

export default Welcome;
