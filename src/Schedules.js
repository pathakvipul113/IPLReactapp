import React, { Component } from 'react';
import './style.css'


class Schedules extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data1: []
        }
    }

    handleClick(id) {
        // <a href="/scorecard" onClick={this.onClick.bind(this)}>Scorecard</a>
        window.location.href = "/scorecard/?matchId=" + id
        console.log("id", id)
    }


    componentDidMount() {

        let data1 = fetch('http://mapps.cricbuzz.com/cbzios/series/2810/matches').then((resp) => {
            resp.json().then((resp) => {
                console.log(resp)
                this.setState({
                    data1: resp.matches
                })

            })

        })

    }


    render() {
        if (this.state.data1)
            return (
                <table className="table">

                    <thead>
                        <tr>
                            <th>Match</th>
                            <th>Details</th>
                            <th>Venue</th>
                        </tr>
                    </thead>


                    {this.state.data1 ? this.state.data1.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>{item.header.match_desc}</td>
                                <td onClick={this.handleClick.bind(this, item.match_id)} style={{ cursor: "pointer" }}><p>{item.team1.name} vs {item.team2.name}</p>
                                    <p>{item.header.status}</p>
                                </td>
                                <td>{item.venue.name}, {item.venue.location.split(',')[0]}</td>

                            </tr>
                        )

                    }) : <div>Data is fetching </div>


                    }
                </table>
            )
    }

}

export default Schedules