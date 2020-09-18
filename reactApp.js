function Team(props) {
    let percentage

    if (props.stats.shots) {
        const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
        percentage = (
            <div>
                <strong>Shot-Percentage :
                    {shotPercentage}</strong>
            </div>
        )
    }

    return (
        <div className="Team">
            <h2>{props.name}</h2>

            <div className="img-src">
                <img src={props.logo}
                    alt={props.name} />
            </div>

            <div>
                <strong>Shots:</strong>
                {props.stats.shots}
            </div>

            <div>
                <strong>Score:</strong>
                {props.stats.score}
            </div>

            {percentage}
            <button onClick={props.shotHandler}>Shoot!</button>
        </div>
    )
}

function ScoreBoard(props) {
    return (
        <div className="ScoreBoard">
            <div className="teamStats">
                <h3>VISITORS</h3>
                <h3>{props.visitingTeamStats.score}</h3>
            </div>

            <h3>SCOREBOARD</h3>

            <div className="teamStats">
                <h3>HOME</h3>
                <h3>{props.homeTeamStats.score}</h3>
            </div>
        </div>
    )
}

class Game extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }
        this.shotSound = new Audio('./assets/audio/sum_gameover')
        this.scoreSound = new Audio('./assets/audio/woodbat.wav')
    }
    
    shoot = (team) => {
        const teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score
        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 100)
        }

        this.setState((state, props) => ({
            [teamStatsKey]: {
                shots: state[teamStatsKey].shots + 1,
                score
            }
        }))
    }

    resetGame = () => {
        this.setState((state, props) => ({
            resetCount: state.resetCount + 1,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }))
    }

    render() {
        return (
            <div className="Game">
                <ScoreBoard
                    visitingTeamStats={this.state.visitingTeamStats}
                    homeTeamStats={this.state.homeTeamStats}
                />

                <h1>Welcome to {this.props.venue}</h1>
                <div className="stats">

                    <Team
                        name={this.props.visitingTeam.name}
                        logo={this.props.visitingTeam.logoSrc}
                        stats={this.state.visitingTeamStats}
                        shotHandler={() => this.shoot('visiting')}
                    />
                   
                    <div className="versus">
                        <h1>VS</h1>
                        <iframe src="https://i.giphy.com/media/kBf6l8fkDWiWfDhdNu/giphy.webp" width="400" height="250" frameBorder="0" class="giphy-embed" allowFullScreen>
                        </iframe><p><a href="https://i.giphy.com/media/kBf6l8fkDWiWfDhdNu/giphy.webp"></a></p>
                        <div>
                            <strong>Resets:</strong> {this.state.resetCount}
                            <button onClick={this.resetGame}>Reset Game</button>
                        </div>
                    </div>

                    <Team
                        name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')}
                    />
                </div>
            </div>
        )
    }
}

function App(props) {
    const Home = {
        name: 'Home',
        logoSrc: 'https://i.pinimg.com/originals/eb/e9/2b/ebe92b3befdd9ae5a64e4a146ade6f79.jpg'

    }

    const Visiting = {
        name: 'Visitor',
        logoSrc: 'https://www.searchpng.com/wp-content/uploads/2019/05/Cricket-Australia-PNG-Image-1.jpg'

    }



    return (
        <div className="App">
            <Game
                venue="the sports game "
                homeTeam={Home}
                visitingTeam={Visiting}
            />

        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)